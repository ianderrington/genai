/**
 * Tool-specific fuzzy matching
 *
 * Scores user queries against tool metadata (examples, descriptions, method names)
 * to find the best matching tool.
 */

import type { ToolMetadata } from '@supernal/interface/browser';
import { FuzzyMatcher, type FuzzyMatchResult } from './FuzzyMatcher';

/**
 * Score how well a query matches a specific tool
 *
 * Scoring hierarchy:
 * 1. Tool examples (highest weight) - exact phrases users say
 * 2. Tool description (medium weight) - semantic meaning
 * 3. Method name (low weight) - technical identifier
 */
export function scoreToolMatch(query: string, tool: ToolMetadata): number {
  const lowerQuery = query.toLowerCase().trim();
  let score = 0;

  // 1. Score against tool examples (highest priority)
  if (tool.examples && Array.isArray(tool.examples)) {
    for (const example of tool.examples) {
      // Clean example (remove parameter placeholders like {text})
      const exampleLower = example
        .replace(/\{[^}]+\}/g, '') // Remove {param}
        .replace(/\s+/g, ' ') // Normalize whitespace
        .trim()
        .toLowerCase();

      if (exampleLower === lowerQuery) {
        score += 20; // Exact match
      } else if (exampleLower.startsWith(lowerQuery + ' ')) {
        score += 15; // Query is prefix
      } else if (
        lowerQuery
          .split(/\s+/)
          .every((qw) => exampleLower.split(/\s+/).includes(qw))
      ) {
        score += 12; // All query words match
      } else if (
        lowerQuery.length >= 4 &&
        exampleLower.split(/\s+/).some((ew) => ew === lowerQuery)
      ) {
        score += 8; // Significant word match (4+ chars)
      } else if (lowerQuery.length >= 5 && exampleLower.includes(lowerQuery)) {
        score += 3; // Partial match (5+ chars)
      }
    }
  }

  // 2. Score against description (lower priority)
  if (tool.description && lowerQuery.length >= 4) {
    const descLower = tool.description.toLowerCase();
    if (descLower.includes(lowerQuery)) {
      score += 2;
    }
  }

  // 3. Score against method name (lowest priority)
  if (tool.methodName) {
    const methodLower = tool.methodName.toLowerCase();
    const queryNoSpaces = lowerQuery.replace(/\s+/g, '');

    if (methodLower === queryNoSpaces) {
      score += 5; // Exact match
    } else if (methodLower.includes(queryNoSpaces) && queryNoSpaces.length >= 4) {
      score += 2; // Contains (4+ chars)
    }
  }

  return score;
}

/**
 * Find the best matching tool for a user query
 *
 * @param query - User's natural language query
 * @param tools - Array of available tools to match against
 * @returns Match result with tool, score, and confidence
 */
export function findBestToolMatch(
  query: string,
  tools: ToolMetadata[]
): FuzzyMatchResult<ToolMetadata> {
  let bestTool: ToolMetadata | undefined;
  let bestScore = 0;

  for (const tool of tools) {
    const score = scoreToolMatch(query, tool);
    if (score > bestScore) {
      bestScore = score;
      bestTool = tool;
    }
  }

  return {
    item: bestTool || null,
    score: bestScore,
    confidence: bestScore > 0 ? Math.min(bestScore / 10, 1) : 0,
  };
}

/**
 * Find all matching tools sorted by score
 *
 * @param query - User's query
 * @param tools - Available tools
 * @param minScore - Minimum score to include (default: 1)
 * @returns Array of tools sorted by relevance
 */
export function findAllToolMatches(
  query: string,
  tools: ToolMetadata[],
  minScore: number = 1
): Array<{ tool: ToolMetadata; score: number; confidence: number }> {
  const results = tools
    .map((tool) => ({
      tool,
      score: scoreToolMatch(query, tool),
      confidence: Math.min(scoreToolMatch(query, tool) / 10, 1),
    }))
    .filter(({ score }) => score >= minScore)
    .sort((a, b) => b.score - a.score);

  return results;
}

/**
 * Extract arguments from a query based on tool's example pattern
 *
 * Example:
 *   Tool example: "search for {query}"
 *   User query: "search for react hooks"
 *   Returns: { query: "react hooks" }
 */
export function extractArguments(
  query: string,
  tool: ToolMetadata
): Record<string, string> {
  if (!tool.examples || tool.examples.length === 0) {
    return {};
  }

  const example = tool.examples[0];
  const placeholderMatch = example.match(/\{([^}]+)\}/);

  if (!placeholderMatch) {
    return {};
  }

  const paramName = placeholderMatch[1];
  const prefix = example.substring(0, placeholderMatch.index);
  const cleanPrefix = prefix.replace(/\s+/g, ' ').trim();

  const queryLower = query.toLowerCase().trim();
  const prefixLower = cleanPrefix.toLowerCase();

  if (queryLower.startsWith(prefixLower)) {
    const value = query.substring(prefix.length).trim();
    return { [paramName]: value };
  }

  return {};
}
