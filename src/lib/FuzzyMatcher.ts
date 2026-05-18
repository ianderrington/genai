/**
 * FuzzyMatcher - Smart query matching utility
 *
 * Provides fuzzy string matching with scoring algorithm.
 * Used to match user queries against available tools/commands.
 */

export interface FuzzyMatchResult<T> {
  item: T | null;
  score: number;
  confidence: number; // 0-1 normalized score
}

export class FuzzyMatcher {
  /**
   * Find the single best match from a list of items
   *
   * @param items - Array of items to search
   * @param query - User's search query
   * @param getSearchableText - Function to extract searchable strings from each item
   * @returns Best matching item or null
   */
  static findBest<T>(
    items: T[],
    query: string,
    getSearchableText: (item: T) => string[]
  ): T | null {
    const lowerQuery = query.toLowerCase().trim();

    if (!lowerQuery) return null;

    // 1. Try exact match first
    let match = items.find((item) => {
      const texts = getSearchableText(item);
      return texts.some((text) => text.toLowerCase() === lowerQuery);
    });
    if (match) return match;

    // 2. Try "starts with" match
    match = items.find((item) => {
      const texts = getSearchableText(item);
      return texts.some((text) => text.toLowerCase().startsWith(lowerQuery));
    });
    if (match) return match;

    // 3. Try "contains" match
    match = items.find((item) => {
      const texts = getSearchableText(item);
      return texts.some((text) => text.toLowerCase().includes(lowerQuery));
    });
    if (match) return match;

    // 4. Try word-based match
    const queryWords = lowerQuery.split(/\s+/);
    match = items.find((item) => {
      const texts = getSearchableText(item);
      return texts.some((text) => {
        const lowerText = text.toLowerCase();
        return queryWords.every((word) => lowerText.includes(word));
      });
    });

    return match || null;
  }

  /**
   * Find all matches sorted by relevance score
   *
   * @param items - Array of items to search
   * @param query - User's search query
   * @param getSearchableText - Function to extract searchable strings from each item
   * @returns Array of items sorted by score (highest first)
   */
  static findAll<T>(
    items: T[],
    query: string,
    getSearchableText: (item: T) => string[]
  ): T[] {
    const lowerQuery = query.toLowerCase().trim();

    if (!lowerQuery) return [];

    const scored = items.map((item) => {
      const texts = getSearchableText(item);
      let score = 0;

      for (const text of texts) {
        const lowerText = text.toLowerCase();

        // Scoring hierarchy
        if (lowerText === lowerQuery) score += 100; // Exact match
        if (lowerText.startsWith(lowerQuery)) score += 50; // Starts with
        if (lowerText.includes(lowerQuery)) score += 25; // Contains

        // Word-based scoring
        const queryWords = lowerQuery.split(/\s+/);
        const matchedWords = queryWords.filter((word) =>
          lowerText.includes(word)
        );
        score += matchedWords.length * 10; // 10 points per matched word
      }

      return { item, score };
    });

    return scored
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .map(({ item }) => item);
  }

  /**
   * Find best match with confidence score
   *
   * @param items - Array of items to search
   * @param query - User's search query
   * @param getSearchableText - Function to extract searchable strings
   * @param maxScore - Maximum possible score (for normalization)
   * @returns Match result with confidence (0-1)
   */
  static findWithConfidence<T>(
    items: T[],
    query: string,
    getSearchableText: (item: T) => string[],
    maxScore: number = 100
  ): FuzzyMatchResult<T> {
    const lowerQuery = query.toLowerCase().trim();

    if (!lowerQuery || items.length === 0) {
      return { item: null, score: 0, confidence: 0 };
    }

    let bestItem: T | null = null;
    let bestScore = 0;

    for (const item of items) {
      const texts = getSearchableText(item);
      let score = 0;

      for (const text of texts) {
        const lowerText = text.toLowerCase();

        if (lowerText === lowerQuery) score += 100;
        else if (lowerText.startsWith(lowerQuery)) score += 50;
        else if (lowerText.includes(lowerQuery)) score += 25;

        const queryWords = lowerQuery.split(/\s+/);
        const matchedWords = queryWords.filter((word) =>
          lowerText.includes(word)
        );
        score += matchedWords.length * 10;
      }

      if (score > bestScore) {
        bestScore = score;
        bestItem = item;
      }
    }

    return {
      item: bestItem,
      score: bestScore,
      confidence: Math.min(bestScore / maxScore, 1),
    };
  }
}
