/**
 * Configuration for the blog section
 */

export interface BlogConfig {
  /**
   * Enable dedicated blog page with pagination and filtering
   */
  enabled: boolean;
  
  /**
   * Number of posts to load per page for pagination
   */
  postsPerPage: number;
  
  /**
   * Default sort field
   */
  defaultSort: 'date' | 'title';
  
  /**
   * Default sort direction
   */
  defaultSortDirection: 'asc' | 'desc';
  
  /**
   * Enable tag filtering
   */
  enableTags: boolean;
  
  /**
   * Minimum tag frequency to display (tags with fewer occurrences will be hidden)
   */
  minTagFrequency: number;
  
  /**
   * Enable search functionality
   */
  enableSearch: boolean;
  
  /**
   * Title for the blog page
   */
  title: string;
  
  /**
   * Description for the blog page
   */
  description: string;
  
  /**
   * Include posts from these specific sections (leave empty for all)
   */
  includeSections: string[];
  
  /**
   * Exclude posts from these specific sections
   */
  excludeSections: string[];
}

const blogConfig: BlogConfig = {
  enabled: true,
  postsPerPage: 9,
  defaultSort: 'date',
  defaultSortDirection: 'desc',
  enableTags: true,
  minTagFrequency: 5,
  enableSearch: true,
  title: 'Blog',
  description: 'Thoughts, ideas, and explorations across many domains.',
  includeSections: [],
  excludeSections: []
};

export default blogConfig; 