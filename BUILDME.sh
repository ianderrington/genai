#!/bin/bash

# Exit on error (can be overridden with bypass)
set -e

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FAMILY_NAME="$(basename "${SCRIPT_DIR}")"
FAMILY_ROOT="${SCRIPT_DIR}"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Directory for all build outputs and logs
BUILD_OUTPUT_DIR=".build_output"
BUILD_LOGS_DIR="${BUILD_OUTPUT_DIR}/logs"
BUILD_ARTIFACTS_DIR="${BUILD_OUTPUT_DIR}/artifacts"

# Configuration - can be overridden by family-specific config
FAMILY_CONFIG_FILE="${FAMILY_ROOT}/family.config.json"
PACKAGE_MANAGER="npm"
DEFAULT_BUILD_COMMAND="npm run build"
DEFAULT_DEV_COMMAND="npm run dev"

# Load family-specific configuration if it exists
load_family_config() {
  if [ -f "${FAMILY_CONFIG_FILE}" ]; then
    echo "🔧 Loading family configuration from ${FAMILY_CONFIG_FILE}"
    # Parse JSON config (requires jq, fallback to defaults if not available)
    if command -v jq &> /dev/null; then
      PACKAGE_MANAGER=$(jq -r '.packageManager // "npm"' "${FAMILY_CONFIG_FILE}")
      DEFAULT_BUILD_COMMAND=$(jq -r '.buildCommand // "npm run build"' "${FAMILY_CONFIG_FILE}")
      DEFAULT_DEV_COMMAND=$(jq -r '.devCommand // "npm run dev"' "${FAMILY_CONFIG_FILE}")
    fi
  fi
}

# Function to show usage
show_usage() {
  echo "Usage: ./BUILDME.sh [options]"
  echo ""
  echo "Family: ${FAMILY_NAME}"
  echo "Root: ${FAMILY_ROOT}"
  echo ""
  echo "Options:"
  echo "  clean           Clean all build artifacts before building"
  echo "  bypass-errors   Continue building even if TypeScript errors are present"
  echo "  list            List all buildable packages and apps"
  echo "  dev             Run development mode instead of build"
  echo "  help            Show this help message"
  echo ""
  echo "Examples:"
  echo "  ./BUILDME.sh                   # Regular build"
  echo "  ./BUILDME.sh clean             # Clean build"
  echo "  ./BUILDME.sh bypass-errors     # Build with TypeScript error bypassing"
  echo "  ./BUILDME.sh list              # List all buildable components"
  echo "  ./BUILDME.sh dev               # Run in development mode"
}

# Helper function to cleanup stray build files
cleanup_stray_files() {
  echo "🧹 Cleaning up stray build files in ${FAMILY_NAME}..."
  
  # Remove any build output files in package directories
  find "${FAMILY_ROOT}" -name 'build_log.txt' -type f -delete 2>/dev/null || true
  find "${FAMILY_ROOT}" -name 'build_output.txt' -type f -delete 2>/dev/null || true
  find "${FAMILY_ROOT}" -name 'type-dedup-*.txt' -type f -delete 2>/dev/null || true
  find "${FAMILY_ROOT}" -name '*-analysis' -type d -exec rm -rf {} + 2>/dev/null || true
  
  # Clean up temporary files
  rm -f "${FAMILY_ROOT}"/type-dedup-*.txt 2>/dev/null || true
  
  echo "🧹 Stray files cleanup completed for ${FAMILY_NAME}"
}

# Function to clean build artifacts
clean_build() {
  echo "🧹 Cleaning build artifacts for ${FAMILY_NAME}..."
  
  # Clean using package manager
  if command -v pnpm &> /dev/null; then
    pnpm clean || true
  elif command -v npm &> /dev/null; then
    npm run clean || true
  fi
  
  # Remove node_modules and dist directories
  echo "🧹 Removing node_modules and dist directories..."
  find "${FAMILY_ROOT}" -name "node_modules" -type d -exec rm -rf {} + 2>/dev/null || true
  find "${FAMILY_ROOT}" -name "dist" -type d -exec rm -rf {} + 2>/dev/null || true
  
  # Clean build output directory
  echo "🧹 Cleaning build output directory..."
  rm -rf "${FAMILY_ROOT}/${BUILD_OUTPUT_DIR}"
  
  # Cleanup any stray build files
  cleanup_stray_files
}

# Initialize arrays to track build statuses
declare -a BUILD_SUCCESS=()
declare -a BUILD_FAILURE=()

# Setup build output directories
setup_build_dirs() {
  mkdir -p "${FAMILY_ROOT}/${BUILD_LOGS_DIR}/packages"
  mkdir -p "${FAMILY_ROOT}/${BUILD_LOGS_DIR}/apps"
  mkdir -p "${FAMILY_ROOT}/${BUILD_ARTIFACTS_DIR}/packages"
  mkdir -p "${FAMILY_ROOT}/${BUILD_ARTIFACTS_DIR}/apps"
  
  # Add a .gitignore file if it doesn't exist
  if [ ! -f "${FAMILY_ROOT}/${BUILD_OUTPUT_DIR}/.gitignore" ]; then
    echo "# Ignore all build outputs" > "${FAMILY_ROOT}/${BUILD_OUTPUT_DIR}/.gitignore"
    echo "*" >> "${FAMILY_ROOT}/${BUILD_OUTPUT_DIR}/.gitignore"
    echo "!.gitignore" >> "${FAMILY_ROOT}/${BUILD_OUTPUT_DIR}/.gitignore"
  fi
}

# Function to discover packages in the family
discover_packages() {
  local packages=()
  
  # First, try to read from family.config.json if it exists
  if [ -f "${FAMILY_ROOT}/family.config.json" ]; then
    # Use jq to extract packages in order from the JSON file
    if command -v jq >/dev/null 2>&1; then
      while IFS= read -r package_entry; do
        local package_name=$(echo "$package_entry" | jq -r '.name')
        local package_path=$(echo "$package_entry" | jq -r '.path')
        local package_dir="${FAMILY_ROOT}/${package_path}"
        
        # Verify the directory exists and has a package.json
        if [ -d "$package_dir" ] && [ -f "$package_dir/package.json" ]; then
          packages+=("$package_name:$package_dir")
        fi
      done < <(jq -c '.packages[]' "${FAMILY_ROOT}/family.config.json")
      
      # If we found packages from config, return them
      if [ ${#packages[@]} -gt 0 ]; then
        echo "${packages[@]}"
        return
      fi
    fi
  fi
  
  # Fallback to filesystem discovery if no config or no packages found
  # Look for packages in packages/ directory
  if [ -d "${FAMILY_ROOT}/packages" ]; then
    for package_dir in "${FAMILY_ROOT}"/packages/*; do
      if [ -d "$package_dir" ] && [ -f "$package_dir/package.json" ]; then
        local package_name=$(basename "$package_dir")
        packages+=("$package_name:$package_dir")
      fi
    done
  fi
  
  # Look for scoped packages in packages/@family-name/
  if [ -d "${FAMILY_ROOT}/packages/@${FAMILY_NAME}" ]; then
    for package_dir in "${FAMILY_ROOT}"/packages/@${FAMILY_NAME}/*; do
      if [ -d "$package_dir" ] && [ -f "$package_dir/package.json" ]; then
        local package_name="@${FAMILY_NAME}/$(basename "$package_dir")"
        packages+=("$package_name:$package_dir")
      fi
    done
  fi
  
  echo "${packages[@]}"
}

# Function to discover apps in the family
discover_apps() {
  local apps=()
  
  # First, try to read from family.config.json if it exists
  if [ -f "${FAMILY_ROOT}/family.config.json" ]; then
    # Use jq to extract apps in order from the JSON file
    if command -v jq >/dev/null 2>&1; then
      while IFS= read -r app_entry; do
        local app_name=$(echo "$app_entry" | jq -r '.name')
        local app_path=$(echo "$app_entry" | jq -r '.path')
        local app_dir="${FAMILY_ROOT}/${app_path}"
        
        # Verify the directory exists and has a package.json
        if [ -d "$app_dir" ] && [ -f "$app_dir/package.json" ]; then
          apps+=("$app_name:$app_dir")
        fi
      done < <(jq -c '.apps[]' "${FAMILY_ROOT}/family.config.json")
      
      # If we found apps from config, return them
      if [ ${#apps[@]} -gt 0 ]; then
        echo "${apps[@]}"
        return
      fi
    fi
  fi
  
  # Fallback to filesystem discovery if no config or no apps found
  # Look for apps in apps/ directory
  if [ -d "${FAMILY_ROOT}/apps" ]; then
    for app_dir in "${FAMILY_ROOT}"/apps/*; do
      if [ -d "$app_dir" ] && [ -f "$app_dir/package.json" ]; then
        local app_name=$(basename "$app_dir")
        apps+=("$app_name:$app_dir")
      fi
    done
  fi
  
  echo "${apps[@]}"
}

# Function to build a package with logging
build_package() {
  local package_name=$1
  local package_dir=$2
  local build_command=${3:-$DEFAULT_BUILD_COMMAND}
  local package_safe_name=${package_name//\//_}
  local log_file="${FAMILY_ROOT}/${BUILD_LOGS_DIR}/packages/${package_safe_name}_build.log"
  local output_file="${FAMILY_ROOT}/${BUILD_ARTIFACTS_DIR}/packages/${package_safe_name}_output.txt"
  
  echo -e "${BLUE}🏗️ Building package ${package_name}...${NC}"
  
  # Use a subshell to preserve the current directory
  (
    cd "$package_dir"
    echo -e ">> ${build_command} (logs: ${YELLOW}${log_file}${NC})"
    
    if eval "$build_command" > "$log_file" 2>&1; then
      # Copy/save any relevant output files
      if [ -d "dist" ]; then
        mkdir -p "${FAMILY_ROOT}/${BUILD_ARTIFACTS_DIR}/packages/${package_safe_name}"
        ls -la dist > "$output_file" 2>&1
      fi
      
      echo -e "${GREEN}✅ ${package_name} build succeeded${NC}"
      BUILD_SUCCESS+=("${package_name}")
      return 0
    else
      echo -e "${RED}❌ ${package_name} build failed${NC}"
      echo -e "${YELLOW}==== Build errors (${log_file}) ====${NC}"
      cat "$log_file" | grep -A 5 -B 2 "error" || cat "$log_file" | tail -n 20
      echo -e "${YELLOW}==== End of errors (see full log: ${log_file}) ====${NC}"
      BUILD_FAILURE+=("${package_name}")
      return 1
    fi
  )
  return $?
}

# Function to build an application
build_app() {
  local app_name=$1
  local app_dir=$2
  local build_command=${3:-$DEFAULT_BUILD_COMMAND}
  local log_file="${FAMILY_ROOT}/${BUILD_LOGS_DIR}/apps/build_${app_name}.log"
  local output_file="${FAMILY_ROOT}/${BUILD_ARTIFACTS_DIR}/apps/${app_name}_output.txt"
  
  echo -e "${BLUE}🏗️ Building app ${app_name}...${NC}"
  
  # Use a subshell to preserve the current directory
  (
    cd "$app_dir"
    echo -e ">> ${build_command} (logs: ${YELLOW}${log_file}${NC})"
    
    if eval "$build_command" > "$log_file" 2>&1; then
      # Save application output info if available
      for dist_path in "dist" "build" ".next"; do
        if [ -d "$dist_path" ]; then
          mkdir -p "${FAMILY_ROOT}/${BUILD_ARTIFACTS_DIR}/apps/${app_name}"
          ls -la "$dist_path" > "$output_file" 2>&1
          break
        fi
      done
      
      echo -e "${GREEN}✅ ${app_name} app build succeeded${NC}"
      BUILD_SUCCESS+=("${app_name} app")
      return 0
    else
      echo -e "${RED}❌ ${app_name} app build failed${NC}"
      echo -e "${YELLOW}==== Build errors (${log_file}) ====${NC}"
      cat "$log_file" | grep -A 5 -B 2 "error" || cat "$log_file" | tail -n 20
      echo -e "${YELLOW}==== End of errors (see full log: ${log_file}) ====${NC}"
      BUILD_FAILURE+=("${app_name} app")
      return 1
    fi
  )
  return $?
}

# Function to run a package/app in development mode
run_dev() {
  local name=$1
  local dir=$2
  local dev_command=${3:-$DEFAULT_DEV_COMMAND}
  
  echo -e "${BLUE}🚀 Running ${name} in development mode...${NC}"
  
  (
    cd "$dir"
    echo -e ">> ${dev_command}"
    eval "$dev_command"
  )
}

# Function to list all buildable components
list_components() {
  echo -e "${BLUE}===== ${FAMILY_NAME} Components =====${NC}"
  echo ""
  
  # List packages
  local packages=($(discover_packages))
  if [ ${#packages[@]} -gt 0 ]; then
    echo -e "${GREEN}📦 Packages:${NC}"
    for package_info in "${packages[@]}"; do
      local package_name=${package_info%:*}
      local package_dir=${package_info#*:}
      echo -e "  - ${package_name} (${package_dir})"
    done
    echo ""
  fi
  
  # List apps
  local apps=($(discover_apps))
  if [ ${#apps[@]} -gt 0 ]; then
    echo -e "${GREEN}📱 Apps:${NC}"
    for app_info in "${apps[@]}"; do
      local app_name=${app_info%:*}
      local app_dir=${app_info#*:}
      echo -e "  - ${app_name} (${app_dir})"
    done
    echo ""
  fi
}

# Function for normal build
normal_build() {
  # Reset build status arrays
  BUILD_SUCCESS=()
  BUILD_FAILURE=()
  
  # Setup build output directories
  setup_build_dirs
  
  # Build packages first
  echo -e "${BLUE}🏗️ Building packages for ${FAMILY_NAME}...${NC}"
  local packages=($(discover_packages))
  for package_info in "${packages[@]}"; do
    local package_name=${package_info%:*}
    local package_dir=${package_info#*:}
    build_package "$package_name" "$package_dir" || return 1
  done
  
  # Build apps
  echo -e "${BLUE}🏗️ Building apps for ${FAMILY_NAME}...${NC}"
  local apps=($(discover_apps))
  for app_info in "${apps[@]}"; do
    local app_name=${app_info%:*}
    local app_dir=${app_info#*:}
    build_app "$app_name" "$app_dir" || return 1
  done
}

# Function for TypeScript error-bypassing build
bypass_build() {
  # Reset build status arrays
  BUILD_SUCCESS=()
  BUILD_FAILURE=()
  
  # Setup build output directories
  setup_build_dirs
  
  # Build packages first (with bypass)
  echo -e "${BLUE}🏗️ Building packages for ${FAMILY_NAME} (bypass mode)...${NC}"
  local packages=($(discover_packages))
  for package_info in "${packages[@]}"; do
    local package_name=${package_info%:*}
    local package_dir=${package_info#*:}
    build_package "$package_name" "$package_dir" || true
  done
  
  # Build apps (with bypass)
  echo -e "${BLUE}🏗️ Building apps for ${FAMILY_NAME} (bypass mode)...${NC}"
  local apps=($(discover_apps))
  for app_info in "${apps[@]}"; do
    local app_name=${app_info%:*}
    local app_dir=${app_info#*:}
    build_app "$app_name" "$app_dir" || true
  done
}

# Function to run development mode
dev_mode() {
  echo -e "${BLUE}🚀 Starting development mode for ${FAMILY_NAME}...${NC}"
  
  # For development mode, we'll typically want to run apps, not build packages
  local apps=($(discover_apps))
  if [ ${#apps[@]} -eq 0 ]; then
    echo -e "${YELLOW}⚠️ No apps found to run in development mode${NC}"
    return 1
  fi
  
  # If only one app, run it directly
  if [ ${#apps[@]} -eq 1 ]; then
    local app_info=${apps[0]}
    local app_name=${app_info%:*}
    local app_dir=${app_info#*:}
    run_dev "$app_name" "$app_dir"
  else
    # Multiple apps - let user choose or run all in parallel
    echo -e "${YELLOW}Multiple apps found. Running the first one:${NC}"
    local app_info=${apps[0]}
    local app_name=${app_info%:*}
    local app_dir=${app_info#*:}
    run_dev "$app_name" "$app_dir"
  fi
}

# Function to display build summary
display_build_summary() {
  echo ""
  echo -e "${BLUE}===== ${FAMILY_NAME} BUILD SUMMARY =====${NC}"
  echo ""
  
  if [ ${#BUILD_SUCCESS[@]} -gt 0 ]; then
    echo -e "${GREEN}✅ Successfully built:${NC}"
    for item in "${BUILD_SUCCESS[@]}"; do
      echo -e "  - ${item}"
    done
    echo ""
  fi
  
  if [ ${#BUILD_FAILURE[@]} -gt 0 ]; then
    echo -e "${RED}❌ Failed to build:${NC}"
    for item in "${BUILD_FAILURE[@]}"; do
      echo -e "  - ${item}"
    done
    echo ""
    echo -e "${YELLOW}Examine log files in the '${FAMILY_ROOT}/${BUILD_LOGS_DIR}/' directory for detailed error information.${NC}"
  fi
  
  echo -e "${BLUE}====== END SUMMARY ======${NC}"
}

# Parse arguments
CLEAN=false
BYPASS=false
LIST=false
DEV=false

for arg in "$@"
do
  case $arg in
    clean)
      CLEAN=true
      ;;
    bypass-errors)
      BYPASS=true
      ;;
    list)
      LIST=true
      ;;
    dev)
      DEV=true
      ;;
    help|--help|-h)
      show_usage
      exit 0
      ;;
    *)
      echo "Unknown option: $arg"
      show_usage
      exit 1
      ;;
  esac
done

# Load family configuration
load_family_config

echo -e "${BLUE}===== Starting ${FAMILY_NAME} Family Build =====${NC}"

# Handle list command
if [ "$LIST" = true ]; then
  list_components
  exit 0
fi

# Handle development mode
if [ "$DEV" = true ]; then
  dev_mode
  exit 0
fi

# Always clean up stray build files
echo "🚀 Step 1: Starting stray files cleanup..."
cleanup_stray_files
echo "✅ Step 1: Stray files cleanup completed"

# Clean if requested
echo "🚀 Step 2: Checking if clean build requested..."
if [ "$CLEAN" = true ]; then
  echo "🧹 Clean build requested, starting clean process..."
  clean_build
  echo "✅ Clean build completed"
else
  echo "ℹ️  No clean requested, skipping clean step"
fi

# Install dependencies if needed
echo "🚀 Step 3: Checking dependencies..."
if [ ! -d "${FAMILY_ROOT}/node_modules" ]; then
  echo "🔧 Installing dependencies..."
  cd "${FAMILY_ROOT}"
  if command -v pnpm &> /dev/null; then
    pnpm install
  else
    npm install
  fi
  echo "✅ Dependencies installed"
else
  echo "📦 node_modules exists, skipping install step"
  if [ "$CLEAN" = true ]; then
    echo "🔧 Clean build requested, reinstalling dependencies..."
    cd "${FAMILY_ROOT}"
    if command -v pnpm &> /dev/null; then
      pnpm install
    else
      npm install
    fi
    echo "✅ Dependencies reinstalled"
  else
    echo "   (use './BUILDME.sh clean' to force reinstall)"
  fi
fi

# Run build based on options
if [ "$BYPASS" = true ]; then
  echo -e "${YELLOW}⚠️ Building with TypeScript error bypassing...${NC}"
  bypass_build
  display_build_summary
  echo -e "${YELLOW}⚠️ Warning: This build contains placeholder files to satisfy imports.${NC}"
  echo -e "${YELLOW}   It is not suitable for production use.${NC}"
  echo -e "${GREEN}✅ Build completed with TypeScript error bypassing!${NC}"
else
  echo -e "${BLUE}🏗️ Running normal build process...${NC}"
  if normal_build; then
    display_build_summary
    echo -e "${GREEN}✅ Build completed successfully!${NC}"
  else
    display_build_summary
    echo -e "${RED}❌ Build failed! Consider using 'bypass-errors' option for development.${NC}"
    exit 1
  fi
fi

# One final cleanup of any stray files that might have been created during the build
cleanup_stray_files

echo -e "${BLUE}All build logs and artifacts are stored in the '${FAMILY_ROOT}/${BUILD_OUTPUT_DIR}/' directory:${NC}"
echo -e "  ${YELLOW}ls -la ${FAMILY_ROOT}/${BUILD_OUTPUT_DIR}/${NC}"
echo ""
echo -e "${GREEN}✅ ${FAMILY_NAME} family build completed!${NC}" 