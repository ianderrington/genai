import { Post } from '@/lib/content';
import { filterPostsByTags } from './tags';

export interface PostFilters {
  page?: number;
  limit?: number;
  searchQuery?: string;
  tags?: string[];
}

export interface PaginatedPosts {
  posts: Post[];
  pagination: {
    page: number;
    limit: number;
    totalPosts: number;
    totalPages: number;
    hasMore: boolean;
  };
}

function getSearchScore(post: Post, queryTerms: string[]): number {
  let score = 0;
  const title = post.metadata.title.toLowerCase();
  const description = (post.metadata.description || '').toLowerCase();
  const tags = post.metadata.tags?.map(t => t.toLowerCase()) || [];

  for (const term of queryTerms) {
    // Title matches are most important
    if (title.includes(term)) score += 10;
    // Description and tag matches are next
    if (description.includes(term)) score += 5;
    if (tags.some(tag => tag.includes(term))) score += 5;
    // Content matches are least important
    if (post.content.toLowerCase().includes(term)) score += 1;
  }

  // Boost score for exact matches
  if (queryTerms.length > 1) {
    const fullQuery = queryTerms.join(' ');
    if (title.includes(fullQuery)) score += 15;
    if (description.includes(fullQuery)) score += 10;
    if (post.content.toLowerCase().includes(fullQuery)) score += 5;
  }

  return score;
}

export function filterAndPaginatePosts(posts: Post[], filters: PostFilters): PaginatedPosts {
  let filteredPosts = [...posts];
  const {
    page = 1,
    limit = 10,
    searchQuery,
    tags
  } = filters;

  // Filter by search query if provided
  if (searchQuery) {
    const queryTerms = searchQuery.toLowerCase().split(/\s+/);
    filteredPosts = filteredPosts.filter(post => {
      const searchableContent = [
        post.metadata.title,
        post.metadata.description,
        post.content,
        post.excerpt,
        ...(post.metadata.tags || []),
        post.slug.replace(/-/g, ' ')
      ].map(item => (item || '').toLowerCase());

      // All terms must match somewhere in the content
      return queryTerms.every(term => 
        searchableContent.some(content => content.includes(term))
      );
    });

    // Sort results by relevance
    filteredPosts = filteredPosts.sort((a, b) => {
      const scoreA = getSearchScore(a, queryTerms);
      const scoreB = getSearchScore(b, queryTerms);
      return scoreB - scoreA;
    });
  }

  // Filter by tags if provided
  if (tags && tags.length > 0) {
    filteredPosts = filterPostsByTags(filteredPosts, tags);
  }

  // Calculate pagination
  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / limit);
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedPosts = filteredPosts.slice(start, end);

  return {
    posts: paginatedPosts,
    pagination: {
      page,
      limit,
      totalPosts,
      totalPages,
      hasMore: page < totalPages
    }
  };
} 