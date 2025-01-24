import os
import re
import sys
import csv
import time
import asyncio
from datetime import datetime, timedelta
from pathlib import Path
from typing import Dict, List, Set, Tuple, Optional
from concurrent.futures import ThreadPoolExecutor
from dataclasses import dataclass
import markdown
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse, urlunparse
import logging
import threading
from playwright.sync_api import sync_playwright

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def normalize_github_url(url: str) -> str:
    """Normalize GitHub URLs to handle common patterns."""
    parsed = urlparse(url)
    
    # Only process GitHub URLs
    if not parsed.netloc.endswith('github.com'):
        return url
        
    path_parts = parsed.path.strip('/').split('/')
    
    # Handle GitHub asset URLs (they're fine as is)
    if 'assets' in path_parts:
        return url
        
    # Handle repository file/directory paths
    if len(path_parts) >= 3:  # username/repo/path
        repo_path = '/'.join(path_parts[:2])
        file_path = '/'.join(path_parts[2:])
        
        # If it doesn't have blob/tree/raw, assume it's a file and add blob/main
        if not any(x in path_parts for x in ['blob', 'tree', 'raw']):
            new_path = f"/{repo_path}/blob/main/{file_path}"
            return urlunparse(parsed._replace(path=new_path))
            
    return url

@dataclass
class LinkCheckResult:
    file_path: str
    line_number: int
    link: str
    is_valid: bool
    error_message: str = ""
    checked_at: str = ""

class LinkCache:
    def __init__(self, cache_file: str, max_age_days: int = 30, no_cache_update: bool = False):
        self.cache_file = cache_file
        self.max_age_days = max_age_days
        self.no_cache_update = no_cache_update
        self.cache: Dict[str, Tuple[bool, str, str]] = {}  # url -> (is_valid, error_msg, timestamp)
        self.lock = threading.Lock()
        self._load_cache()

    def _load_cache(self):
        """Load the cache from file if it exists."""
        if not os.path.exists(self.cache_file):
            # Create the file with headers if it doesn't exist and we're allowed to update
            if not self.no_cache_update:
                with open(self.cache_file, 'w', newline='') as f:
                    writer = csv.writer(f)
                    writer.writerow(['url', 'is_valid', 'error_message', 'checked_at'])
            return

        with open(self.cache_file, 'r', newline='') as f:
            reader = csv.reader(f)
            next(reader)  # Skip header
            for row in reader:
                if len(row) == 4:
                    url, is_valid, error_msg, timestamp = row
                    self.cache[url] = (is_valid == 'True', error_msg, timestamp)

    def _append_to_cache_file(self, url: str, is_valid: bool, error_msg: str, timestamp: str):
        """Append a single entry to the cache file."""
        if self.no_cache_update:
            return
            
        with self.lock:
            with open(self.cache_file, 'a', newline='') as f:
                writer = csv.writer(f)
                writer.writerow([url, is_valid, error_msg, timestamp])

    def save(self):
        """Save the entire cache to file. Only used for cleanup/maintenance."""
        if self.no_cache_update:
            return
            
        with self.lock:
            with open(self.cache_file, 'w', newline='') as f:
                writer = csv.writer(f)
                writer.writerow(['url', 'is_valid', 'error_message', 'checked_at'])
                for url, (is_valid, error_msg, timestamp) in self.cache.items():
                    writer.writerow([url, is_valid, error_msg, timestamp])

    def get(self, url: str) -> Optional[Tuple[bool, str]]:
        """Get a cached result if it exists and is not too old."""
        if url in self.cache:
            is_valid, error_msg, timestamp = self.cache[url]
            checked_at = datetime.fromisoformat(timestamp)
            if datetime.now() - checked_at < timedelta(days=self.max_age_days):
                return is_valid, error_msg
        return None

    def set(self, url: str, is_valid: bool, error_msg: str):
        """Add or update a cache entry."""
        timestamp = datetime.now().isoformat()
        self.cache[url] = (is_valid, error_msg, timestamp)
        self._append_to_cache_file(url, is_valid, error_msg, timestamp)

class MarkdownLinkChecker:
    def __init__(self, root_dir: str, cache_file: str = "link_cache.csv", max_workers: int = 10, 
                 timeout: int = 10, force_check: bool = False, no_cache_update: bool = False,
                 recheck_failed: bool = False, cleanup_cache: bool = True):
        self.root_dir = Path(root_dir)
        self.max_workers = max_workers
        self.timeout = timeout
        self.cache = LinkCache(cache_file, no_cache_update=no_cache_update)
        self.force_check = force_check
        self.recheck_failed = recheck_failed
        self.cleanup_cache = cleanup_cache
        self.found_urls = set()  # Track all URLs found in markdown files
        logger.info(f"Initialized checker for directory: {self.root_dir}")

    def find_markdown_files(self) -> List[Path]:
        """Find all markdown files in the root directory."""
        files = list(self.root_dir.rglob("*.md"))
        logger.info(f"Found {len(files)} markdown files")
        return files

    def extract_links_from_file(self, file_path: Path) -> List[Tuple[str, int]]:
        """Extract all links from a markdown file with their line numbers."""
        links = []
        logger.debug(f"Processing file: {file_path}")
        with open(file_path, 'r', encoding='utf-8') as f:
            for line_num, line in enumerate(f, 1):
                # Match markdown links [text](url)
                matches = re.finditer(r'\[([^\]]+)\]\(([^)]+)\)', line)
                for match in matches:
                    link = match.group(2)
                    # Only include HTTP(S) links
                    if link.startswith(('http://', 'https://')):
                        self.found_urls.add(link)  # Track the URL
                        links.append((link, line_num))
        logger.debug(f"Found {len(links)} HTTP(S) links in {file_path}")
        return links

    def check_url_with_browser(self, url: str, browser) -> Tuple[bool, str]:
        """Check URL using a real browser."""
        try:
            page = browser.new_page()
            try:
                # Set a shorter timeout for the navigation
                response = page.goto(url, timeout=self.timeout * 1000, wait_until="domcontentloaded")
                
                if response is None:
                    return False, "Failed to load page"
                
                # Consider 403/404 from GitHub assets as valid (they often work in browser)
                is_github_asset = '/assets/' in url and 'github.com' in url
                status_code = response.status
                
                is_valid = (
                    status_code < 400 or
                    (is_github_asset and status_code in (403, 404)) or
                    (status_code == 403 and any(domain in url for domain in ['docker.com', 'openai.com']))
                )
                
                error_msg = f"HTTP {status_code}" if not is_valid else ""
                return is_valid, error_msg
                
            finally:
                page.close()
                
        except Exception as e:
            error_msg = str(e)
            # Clean up the error message
            if "Target closed" in error_msg:
                error_msg = "Page load timed out"
            elif "ERR_NAME_NOT_RESOLVED" in error_msg:
                error_msg = "Domain not found"
            return False, error_msg

    def check_file_with_browser(self, file_path: Path, browser) -> List[LinkCheckResult]:
        """Check all links in a single file using the provided browser instance."""
        logger.info(f"Checking links in: {file_path}")
        results = []
        links = self.extract_links_from_file(file_path)
        
        for link, line_number in links:
            if not self.force_check:
                cached = self.cache.get(link)
                if cached is not None:
                    is_valid, error_msg = cached
                    # If recheck_failed is True, only recheck if the URL previously failed
                    if not (self.recheck_failed and not is_valid):
                        results.append(LinkCheckResult(
                            file_path=str(file_path.relative_to(self.root_dir)),
                            line_number=line_number,
                            link=link,
                            is_valid=is_valid,
                            error_message=error_msg,
                            checked_at="cached"
                        ))
                        continue

            # Normalize GitHub URLs
            normalized_url = normalize_github_url(link)
            is_valid, error_msg = self.check_url_with_browser(normalized_url, browser)
            self.cache.set(link, is_valid, error_msg)
            
            results.append(LinkCheckResult(
                file_path=str(file_path.relative_to(self.root_dir)),
                line_number=line_number,
                link=link,
                is_valid=is_valid,
                error_message=error_msg,
                checked_at="checked"
            ))
            logger.debug(f"Link check result - File: {file_path}, Link: {link}, Valid: {is_valid}")
        
        return results

    def process_file_batch(self, files: List[Path]) -> List[LinkCheckResult]:
        """Process a batch of files with a single browser instance."""
        results = []
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            try:
                for file_path in files:
                    try:
                        file_results = self.check_file_with_browser(file_path, browser)
                        results.extend(file_results)
                    except Exception as e:
                        logger.error(f"Error processing {file_path}: {str(e)}")
            finally:
                browser.close()
        return results

    def check_all_files(self) -> List[LinkCheckResult]:
        """Check all markdown files by distributing them across workers."""
        markdown_files = self.find_markdown_files()
        all_results = []
        
        # Split files into batches for each worker
        batch_size = max(1, len(markdown_files) // self.max_workers)
        file_batches = [markdown_files[i:i + batch_size] for i in range(0, len(markdown_files), batch_size)]
        
        logger.info(f"Starting link checking with {len(file_batches)} batches...")
        with ThreadPoolExecutor(max_workers=self.max_workers) as executor:
            future_to_batch = {executor.submit(self.process_file_batch, batch): batch 
                             for batch in file_batches}
            
            for future in future_to_batch:
                try:
                    results = future.result()
                    all_results.extend(results)
                except Exception as e:
                    batch = future_to_batch[future]
                    logger.error(f"Error processing batch: {str(e)}")
        
        logger.info("Completed checking all files")
        
        # Clean up unused cache entries
        self.cleanup_unused_cache_entries()
        
        return all_results

    def cleanup_unused_cache_entries(self):
        """Remove cache entries for URLs that no longer exist in any markdown files."""
        if not self.cleanup_cache or self.cache.no_cache_update:
            return

        # Get all URLs currently in cache
        cached_urls = set(self.cache.cache.keys())
        # Find URLs that are in cache but not in any markdown files
        unused_urls = cached_urls - self.found_urls
        
        if unused_urls:
            logger.info(f"Found {len(unused_urls)} cached URLs that are no longer used")
            # Remove unused URLs from cache
            for url in unused_urls:
                del self.cache.cache[url]
            # Save the cleaned cache
            self.cache.save()

def generate_report(results: List[LinkCheckResult], format: str = 'text') -> str:
    """Generate a report of link checking results."""
    logger.info("Generating report...")
    if format == 'json':
        import json
        return json.dumps([vars(r) for r in results], indent=2)
    
    # Text format
    report = []
    invalid_count = sum(1 for r in results if not r.is_valid)
    total_count = len(results)
    cached_count = sum(1 for r in results if r.checked_at == "cached")
    unique_count = len({r.link for r in results})
    
    report.append(f"Link Checker Report")
    report.append(f"==================")
    report.append(f"Total links checked: {total_count}")
    report.append(f"Unique links checked: {unique_count}")
    report.append(f"Invalid links found: {invalid_count}")
    report.append(f"Cached results used: {cached_count}")
    report.append("")
    
    if invalid_count > 0:
        report.append("Invalid Links:")
        report.append("-------------")
        for result in sorted(results, key=lambda x: (not x.is_valid, x.file_path)):
            if not result.is_valid:
                report.append(f"File: {result.file_path}")
                report.append(f"Line: {result.line_number}")
                report.append(f"Link: {result.link}")
                report.append(f"Error: {result.error_message}")
                report.append(f"Status: {result.checked_at}")
                report.append("")
    
    return "\n".join(report)

def main():
    import argparse
    parser = argparse.ArgumentParser(description='Check markdown files for broken links.')
    parser.add_argument('root_dir', help='Root directory to search for markdown files')
    parser.add_argument('--workers', type=int, default=4, help='Number of worker threads (default: 4)')
    parser.add_argument('--timeout', type=int, default=30, help='Timeout for HTTP requests in seconds')
    parser.add_argument('--format', choices=['text', 'json'], default='text', help='Output format')
    parser.add_argument('--output', help='Output file (default: stdout)')
    parser.add_argument('--debug', action='store_true', help='Enable debug logging')
    parser.add_argument('--cache-file', default='link_cache.csv', help='Cache file location')
    parser.add_argument('--force-check', action='store_true', help='Force check all links ignoring cache')
    parser.add_argument('--recheck-failed', action='store_true', help='Force check only previously failed links')
    parser.add_argument('--max-cache-age', type=int, default=30, help='Maximum age of cached results in days')
    parser.add_argument('--no-cache-update', action='store_true', help='Do not update the cache file (useful for CI)')
    parser.add_argument('--no-cleanup', action='store_true', help='Do not remove unused entries from cache')
    
    args = parser.parse_args()
    
    if args.debug:
        logger.setLevel(logging.DEBUG)

    if args.force_check and args.recheck_failed:
        logger.error("Cannot use both --force-check and --recheck-failed")
        sys.exit(1)

    logger.info("Starting link checker...")
    checker = MarkdownLinkChecker(
        args.root_dir,
        args.cache_file,
        args.workers,
        args.timeout,
        args.force_check,
        args.no_cache_update,
        args.recheck_failed,
        not args.no_cleanup
    )
    results = checker.check_all_files()
    report = generate_report(results, args.format)
    
    if args.output:
        with open(args.output, 'w') as f:
            f.write(report)
        logger.info(f"Report written to {args.output}")
    else:
        print(report)
    
    # Exit with error code if there are invalid links
    sys.exit(1 if any(not r.is_valid for r in results) else 0)

if __name__ == '__main__':
    main() 