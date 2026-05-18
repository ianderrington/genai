'use client';

import { ToolRegistry, type ToolMetadata } from '@supernal/interface/browser';
import { findBestToolMatch, extractArguments } from './fuzzyMatchTools';
import { ToolManager } from './ToolManager';
import { useRouter } from 'next/navigation';
import { FuzzyMatcher } from './FuzzyMatcher';

interface PostMetadata {
  slug: string;
  title: string;
  description?: string;
  date: string;
  author?: string;
  image?: string;
}

/**
 * Blog AI Interface - Simple command execution for blog
 *
 * Finds and executes commands using fuzzy matching against registered tools.
 * Simpler version of enterprise AIInterface - no container logic needed.
 */
export class BlogAIInterface {
  private router: ReturnType<typeof useRouter> | null = null;
  private posts: PostMetadata[] = [];
  private postsLoaded = false;

  /**
   * Set the Next.js router for navigation commands
   */
  setRouter(router: ReturnType<typeof useRouter>) {
    this.router = router;
    // Load posts when router is set
    this.loadPosts();
  }

  /**
   * Load posts from API for dynamic navigation
   */
  private async loadPosts() {
    if (this.postsLoaded) return;

    try {
      const response = await fetch('/api/posts');
      if (response.ok) {
        this.posts = await response.json();
        this.postsLoaded = true;
      }
    } catch (error) {
      console.error('Failed to load posts for navigation:', error);
    }
  }

  /**
   * Find and execute a command from user query
   *
   * @param query - User's natural language query
   * @returns Execution result
   */
  async executeCommand(query: string): Promise<{
    success: boolean;
    message: string;
    tool?: ToolMetadata;
  }> {
    // Get all registered tools
    const allTools = Array.from(ToolRegistry.getAllTools().values());

    if (allTools.length === 0) {
      return {
        success: false,
        message: 'No tools available. Are providers initialized?',
      };
    }

    // Handle navigation queries specially
    if (this.isNavigationQuery(query)) {
      return await this.handleNavigation(query);
    }

    // Find best matching tool using fuzzy matching
    const match = findBestToolMatch(query, allTools);

    if (!match.item || match.confidence < 0.3) {
      // No good match found
      const availableCommands = allTools
        .flatMap((t) => t.examples?.slice(0, 1) || [])
        .filter((ex) => ex)
        .slice(0, 5);

      return {
        success: false,
        message: `I couldn't understand "${query}". Try:\n${availableCommands.map((c) => `• "${c}"`).join('\n')}`,
      };
    }

    // Execute the matched tool
    try {
      const tool = match.item;
      const args = extractArguments(query, tool);

      // Report execution start
      ToolManager.reportExecution({
        toolName: tool.name || tool.methodName || 'unknown',
        success: false,
        message: `Executing ${tool.methodName}...`,
      });

      // Simulate tool execution (in real version, would call actual tool method)
      // For now, just report what we would do
      const toolName = tool.name || `${tool.componentName}.${tool.methodName}`;
      const argsStr = Object.keys(args).length > 0 ? ` with ${JSON.stringify(args)}` : '';

      ToolManager.reportExecution({
        toolName,
        success: true,
        message: `Would execute: ${toolName}${argsStr}`,
        data: { query, tool, args },
      });

      return {
        success: true,
        message: `Matched tool: ${toolName}${argsStr}`,
        tool,
      };
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);

      ToolManager.reportExecution({
        toolName: match.item.methodName || 'unknown',
        success: false,
        message: `Error: ${errorMsg}`,
        error: error instanceof Error ? error : undefined,
      });

      return {
        success: false,
        message: `Error executing command: ${errorMsg}`,
      };
    }
  }

  /**
   * Check if query is asking for navigation
   */
  private isNavigationQuery(query: string): boolean {
    const navKeywords = ['navigate', 'go to', 'open', 'show me', 'take me to'];
    const lowerQuery = query.toLowerCase();
    return navKeywords.some((keyword) => lowerQuery.includes(keyword));
  }

  /**
   * Handle navigation queries
   */
  private async handleNavigation(query: string): Promise<{
    success: boolean;
    message: string;
  }> {
    if (!this.router) {
      return {
        success: false,
        message: 'Navigation not available (router not set)',
      };
    }

    // Ensure posts are loaded
    await this.loadPosts();

    const lowerQuery = query.toLowerCase();

    // Map common queries to routes
    const routeMap: Record<string, string> = {
      'home': '/',
      'blog': '/blog',
      'search': '/search',
    };

    // First, try static routes
    for (const [keyword, route] of Object.entries(routeMap)) {
      if (lowerQuery.includes(keyword)) {
        try {
          this.router.push(route);
          return {
            success: true,
            message: `Navigating to ${keyword}...`,
          };
        } catch (error) {
          return {
            success: false,
            message: `Error navigating to ${keyword}: ${error}`,
          };
        }
      }
    }

    // Then, try fuzzy matching against posts
    if (this.posts.length > 0) {
      const match = FuzzyMatcher.findWithConfidence(
        this.posts,
        query,
        (post) => [post.title, post.description || '', post.slug]
      );

      if (match.item && match.confidence > 0.3) {
        // Normalize slug - remove leading slash if present, then add it back
        const normalizedSlug = match.item.slug.startsWith('/')
          ? match.item.slug
          : `/${match.item.slug}`;

        try {
          this.router.push(normalizedSlug);
          return {
            success: true,
            message: `Navigating to "${match.item.title}"...`,
          };
        } catch (error) {
          return {
            success: false,
            message: `Error navigating to post: ${error}`,
          };
        }
      }
    }

    return {
      success: false,
      message: `Don't know how to navigate for: "${query}". Try "go to blog" or mention a specific post title.`,
    };
  }

  /**
   * Get available commands as user-friendly list
   */
  getAvailableCommands(): string[] {
    const allTools = Array.from(ToolRegistry.getAllTools().values());
    return allTools
      .flatMap((t) => t.examples || [])
      .filter((ex) => ex)
      .slice(0, 10);
  }
}

// Singleton instance
let aiInterface: BlogAIInterface | null = null;

export function getBlogAIInterface(): BlogAIInterface {
  if (!aiInterface) {
    aiInterface = new BlogAIInterface();
  }
  return aiInterface;
}
