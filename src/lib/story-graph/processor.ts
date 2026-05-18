import {
  StoryGraph,
  StoryElement,
  StoryRelationship,
  StoryScene,
  TimelineEvent,
  StoryGraphAnalysis,
  StoryGraphConfig,
  Character,
  Location,
  Technology,
  Concept,
  Theme
} from '@/types/story-graph';

export class StoryGraphProcessor {
  private graph: StoryGraph;
  private config: StoryGraphConfig;

  constructor(config: StoryGraphConfig) {
    this.config = config;
    this.graph = {
      id: this.generateId(),
      metadata: {
        title: '',
        version: '1.0.0',
        created: new Date().toISOString(),
        modified: new Date().toISOString(),
      },
      elements: [],
      relationships: [],
      scenes: [],
      timeline: []
    };
  }

  private generateId(seed?: string): string {
    // Deterministic-ish id: prefer provided seed; otherwise use created timestamp
    if (seed && seed.length > 0) {
      return `sg_${seed.replace(/[^a-zA-Z0-9_-]/g, '_')}`;
    }
    return `sg_${new Date().toISOString().replace(/[^0-9TZ]/g, '')}`;
  }

  private generateElementId(type: string, name: string, scope?: { storyId?: string; universeId?: string }): string {
    const sanitized = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const ns = [scope?.universeId, scope?.storyId, type].filter(Boolean).join(':');
    return ns ? `${ns}:${sanitized}` : `${type}:${sanitized}`;
  }

  // Parse story content from markdown and extract elements
  async parseStoryContent(content: string, frontmatter: Record<string, any>): Promise<StoryGraph> {
    // Update metadata from frontmatter
    this.graph.metadata = {
      ...this.graph.metadata,
      title: frontmatter.title || this.graph.metadata.title,
      description: frontmatter.description,
      author: frontmatter.author?.name,
      tags: frontmatter.tags,
      modified: new Date().toISOString()
    };

    // Split content into scenes if it's chat format
    if (frontmatter.render_as === 'chat') {
      await this.parseChatContent(content, frontmatter);
    } else {
      await this.parseNarrativeContent(content, frontmatter);
    }

    // Generate timeline if scenes have timestamps
    this.generateTimeline();

    return this.graph;
  }

  private async parseChatContent(content: string, frontmatter: Record<string, any>): Promise<void> {
    // Split content into segments based on chat format
    const segments = this.splitChatContent(content);
    
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      const scene = await this.parseScene(segment, i, frontmatter);
      this.graph.scenes.push(scene);
    }
  }

  private splitChatContent(content: string): string[] {
    // Split on common chat delimiters
    const delimiters = [
      /---\s*\n/,  // Horizontal rule
      /\n\n---\s*\n/,  // Horizontal rule with spacing
      /\n\s*\n\s*\n/,  // Multiple blank lines
    ];

    let segments = [content];
    
    for (const delimiter of delimiters) {
      const newSegments: string[] = [];
      for (const segment of segments) {
        newSegments.push(...segment.split(delimiter));
      }
      segments = newSegments;
    }

    return segments.filter(segment => segment.trim().length > 0);
  }

  private async parseNarrativeContent(content: string, frontmatter: Record<string, any>): Promise<void> {
    // For narrative content, treat the whole thing as one scene
    const scene = await this.parseScene(content, 0, frontmatter);
    this.graph.scenes.push(scene);
  }

  private async parseScene(content: string, index: number, frontmatter: Record<string, any>): Promise<StoryScene> {
    const sceneId = `scene_${index}_${Date.now()}`;
    const timestamp = this.extractTimestamp(content, index);
    
    const scene: StoryScene = {
      id: sceneId,
      title: `Scene ${index + 1}`,
      description: content.substring(0, 100) + (content.length > 100 ? '...' : ''),
      timestamp,
      time: frontmatter.time,
      eraId: frontmatter.eraId,
      arcIds: frontmatter.arcIds,
      chapter: frontmatter.chapter,
      stage: frontmatter.stage,
      beats: frontmatter.beats,
      timelineId: frontmatter.timelineId || 'main',
      elements: [],
      relationships: [],
      narrative: content,
      ratings: frontmatter.ratings,
      metadata: {
        index,
        wordCount: content.split(/\s+/).length,
        extracted: new Date().toISOString()
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Extract elements from content
    if (this.config.autoExtract) {
      await this.extractElements(content, scene);
      await this.extractRelationships(content, scene);
    }

    return scene;
  }

  private extractTimestamp(content: string, index: number): string | undefined {
    // Look for common timestamp patterns
    const patterns = [
      /(\d{4}-\d{2}-\d{2})/,  // YYYY-MM-DD
      /(\d{2}:\d{2})/,        // HH:MM
      /(Day \d+)/i,           // Day N
      /(Year \d+)/i,          // Year N
      /(Era \d+)/i,           // Era N
    ];

    for (const pattern of patterns) {
      const match = content.match(pattern);
      if (match) {
        return match[1];
      }
    }

    return undefined;
  }

  private async extractElements(content: string, scene: StoryScene): Promise<void> {
    // Extract potential character names (capitalized words)
    const characterNames = this.extractCharacterNames(content);
    for (const name of characterNames) {
      const element = this.createOrUpdateElement(name, 'character', { extractedFrom: scene.id });
      scene.elements.push(element);
    }

    // Extract locations (words after "at", "in", "on")
    const locations = this.extractLocations(content);
    for (const location of locations) {
      const element = this.createOrUpdateElement(location, 'location', { extractedFrom: scene.id });
      scene.elements.push(element);
    }

    // Extract technologies (technical terms, systems, etc.)
    const technologies = this.extractTechnologies(content);
    for (const tech of technologies) {
      const element = this.createOrUpdateElement(tech, 'technology', { extractedFrom: scene.id });
      scene.elements.push(element);
    }

    // Extract concepts (abstract ideas, theories)
    const concepts = this.extractConcepts(content);
    for (const concept of concepts) {
      const element = this.createOrUpdateElement(concept, 'concept', { extractedFrom: scene.id });
      scene.elements.push(element);
    }
  }

  private extractCharacterNames(content: string): string[] {
    // Extract capitalized words that might be character names
    const pattern = /\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\b/g;
    const matches = content.match(pattern) || [];
    
    // Filter out common false positives
    const commonWords = new Set([
      'The', 'This', 'That', 'They', 'There', 'Then', 'Thus', 'Therefore',
      'Chapter', 'Scene', 'Act', 'Part', 'Book', 'Section', 'Volume',
      'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]);

    return Array.from(new Set(matches.filter(name => !commonWords.has(name))));
  }

  private extractLocations(content: string): string[] {
    // Extract locations using common prepositions
    const patterns = [
      /(?:at|in|on|to|from|within|inside|outside|near|beside|above|below|under|over)\s+(?:the\s+)?([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/gi,
      /\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+(?:Station|Base|Laboratory|Facility|Center|Complex|Building|Room|Chamber|Hall|Academy|Institute)\b/gi
    ];

    const locations = new Set<string>();
    
    for (const pattern of patterns) {
      const matches = content.matchAll(pattern);
      for (const match of matches) {
        if (match[1]) {
          locations.add(match[1]);
        }
      }
    }

    return Array.from(locations);
  }

  private extractTechnologies(content: string): string[] {
    // Extract technology-related terms
    const patterns = [
      /\b([A-Z][a-z]*(?:\s+[A-Z][a-z]*)*)\s+(?:System|Engine|Network|Protocol|Interface|Device|Machine|Computer|Server|Database|Algorithm|Framework|Platform|Technology|Software|Hardware)\b/gi,
      /\b(?:the\s+)?([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+(?:runs|operates|processes|computes|analyzes|monitors|controls|manages|executes)\b/gi
    ];

    const technologies = new Set<string>();
    
    for (const pattern of patterns) {
      const matches = content.matchAll(pattern);
      for (const match of matches) {
        if (match[1]) {
          technologies.add(match[1]);
        }
      }
    }

    return Array.from(technologies);
  }

  private extractConcepts(content: string): string[] {
    // Extract abstract concepts and theories
    const patterns = [
      /\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+(?:Theory|Principle|Concept|Idea|Philosophy|Doctrine|Paradigm|Framework|Model|Approach|Method|Strategy)\b/gi,
      /\bthe\s+concept\s+of\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/gi,
      /\bthe\s+idea\s+of\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/gi
    ];

    const concepts = new Set<string>();
    
    for (const pattern of patterns) {
      const matches = content.matchAll(pattern);
      for (const match of matches) {
        if (match[1]) {
          concepts.add(match[1]);
        }
      }
    }

    return Array.from(concepts);
  }

  private createOrUpdateElement(name: string, type: string, metadata: Record<string, any>): StoryElement {
    // Check if element already exists
    const existing = this.graph.elements.find(el => el.name === name && el.type === type);
    
    if (existing) {
      existing.metadata = { ...existing.metadata, ...metadata };
      existing.updatedAt = new Date().toISOString();
      return existing;
    }

    // Create new element
    const element: StoryElement = {
      id: this.generateElementId(type, name, { storyId: this.graph.metadata.storyId, universeId: this.graph.metadata.universeId }),
      name,
      type: type as any,
      metadata: {
        ...metadata,
        extractedFromScenes: [metadata.extractedFrom]
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.graph.elements.push(element);
    return element;
  }

  private async extractRelationships(content: string, scene: StoryScene): Promise<void> {
    // Extract relationships using configured patterns
    for (const [relType, pattern] of Object.entries(this.config.relationshipPatterns)) {
      const regex = new RegExp(pattern, 'gi');
      const matches = content.matchAll(regex);
      
      for (const match of matches) {
        if (match[1] && match[2]) {
          const relationship: StoryRelationship = {
            id: `rel_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            source: match[1],
            target: match[2],
            type: relType as any,
            metadata: {
              extractedFrom: scene.id,
              confidence: 0.8,
              context: match[0]
            },
            createdAt: new Date().toISOString()
          };

          scene.relationships.push(relationship);
          this.graph.relationships.push(relationship);
        }
      }
    }
  }

  private generateTimeline(): void {
    // Generate timeline events from scenes with timestamps
    const timelineEvents: TimelineEvent[] = [];

    for (const scene of this.graph.scenes) {
      const timestampLabel = scene.timestamp || scene.time?.abs || scene.time?.era || `Index ${scene.metadata.index}`;
      if (timestampLabel) {
        const event: TimelineEvent = {
          id: `event_${scene.id}`,
          title: scene.title,
          description: scene.description,
          timestamp: String(timestampLabel),
          time: scene.time,
          duration: scene.duration,
          sceneId: scene.id,
          participants: scene.elements.filter(el => el.type === 'character').map(el => el.name),
          location: scene.location,
          significance: this.calculateSignificance(scene),
          eraId: scene.eraId,
          arcIds: scene.arcIds,
          chapter: scene.chapter,
          stage: scene.stage,
          timelineId: scene.timelineId || 'main',
          spoiler: scene.stage === 'back' ? true : undefined,
          ratings: scene.ratings,
          metadata: {
            ...scene.metadata,
            elementCount: scene.elements.length,
            relationshipCount: scene.relationships.length
          }
        };

        timelineEvents.push(event);
      }
    }

    // Sort timeline events by timestamp
    timelineEvents.sort((a, b) => this.compareEventsByTime(a, b));

    this.graph.timeline = timelineEvents;
  }

  private compareEventsByTime(a: TimelineEvent, b: TimelineEvent): number {
    // Prefer abs time; then order; then legacy timestamp string; finally index from metadata
    const aAbs = a.time?.abs;
    const bAbs = b.time?.abs;
    if (aAbs && bAbs) {
      return aAbs.localeCompare(bAbs);
    }
    const aOrder = a.time?.order ?? (a.metadata?.index as number | undefined);
    const bOrder = b.time?.order ?? (b.metadata?.index as number | undefined);
    if (typeof aOrder === 'number' && typeof bOrder === 'number') {
      return aOrder - bOrder;
    }
    return a.timestamp.localeCompare(b.timestamp);
  }

  private calculateSignificance(scene: StoryScene): 'low' | 'medium' | 'high' | 'critical' {
    const elementCount = scene.elements.length;
    const relationshipCount = scene.relationships.length;
    const wordCount = scene.metadata.wordCount || 0;

    const score = (elementCount * 2) + (relationshipCount * 3) + (wordCount / 100);

    if (score >= 50) return 'critical';
    if (score >= 30) return 'high';
    if (score >= 15) return 'medium';
    return 'low';
  }

  // Analysis methods
  analyzeStoryGraph(): StoryGraphAnalysis {
    const analysis: StoryGraphAnalysis = {
      consistency: this.checkConsistency(),
      statistics: this.calculateStatistics(),
      centralElements: this.findCentralElements(),
      characterArcs: this.generateCharacterArcs()
    };

    return analysis;
  }

  private checkConsistency(): { issues: string[]; warnings: string[]; suggestions: string[] } {
    const issues: string[] = [];
    const warnings: string[] = [];
    const suggestions: string[] = [];

    // Check for orphaned elements
    const connectedElements = new Set<string>();
    for (const rel of this.graph.relationships) {
      connectedElements.add(rel.source);
      connectedElements.add(rel.target);
    }

    const orphanedElements = this.graph.elements.filter(el => !connectedElements.has(el.name));
    if (orphanedElements.length > 0) {
      warnings.push(`Found ${orphanedElements.length} orphaned elements with no relationships`);
    }

    // Check for character consistency across scenes
    const characterScenes = new Map<string, string[]>();
    for (const scene of this.graph.scenes) {
      const characters = scene.elements.filter(el => el.type === 'character');
      for (const char of characters) {
        if (!characterScenes.has(char.name)) {
          characterScenes.set(char.name, []);
        }
        characterScenes.get(char.name)!.push(scene.id);
      }
    }

    // Check for timeline consistency
    if (this.graph.timeline && this.graph.timeline.length > 1) {
      for (let i = 1; i < this.graph.timeline.length; i++) {
        const prev = this.graph.timeline[i - 1];
        const curr = this.graph.timeline[i];
        
        if (prev.timestamp > curr.timestamp) {
          issues.push(`Timeline inconsistency: Event "${curr.title}" occurs before "${prev.title}"`);
        }
      }
    }

    // Suggestions for improvement
    if (this.graph.elements.length > 0 && this.graph.relationships.length === 0) {
      suggestions.push('Consider adding relationships between story elements to create a more connected narrative');
    }

    if (this.graph.scenes.length > 1 && !this.graph.timeline) {
      suggestions.push('Consider adding timestamps to scenes to create a timeline visualization');
    }

    return { issues, warnings, suggestions };
  }

  private calculateStatistics(): StoryGraphAnalysis['statistics'] {
    const elementCounts = this.graph.elements.reduce((acc, el) => {
      acc[el.type] = (acc[el.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const relationshipCounts = this.graph.relationships.reduce((acc, rel) => {
      acc[rel.type] = (acc[rel.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const timelineSpan = this.graph.timeline && this.graph.timeline.length > 1
      ? `${this.graph.timeline[0].timestamp} - ${this.graph.timeline[this.graph.timeline.length - 1].timestamp}`
      : undefined;

    return {
      totalElements: this.graph.elements.length,
      elementCounts,
      relationshipCounts,
      sceneCount: this.graph.scenes.length,
      timelineSpan
    };
  }

  private findCentralElements(): StoryGraphAnalysis['centralElements'] {
    // Calculate centrality based on relationship connections
    const connectionCounts = new Map<string, number>();
    
    for (const rel of this.graph.relationships) {
      connectionCounts.set(rel.source, (connectionCounts.get(rel.source) || 0) + 1);
      connectionCounts.set(rel.target, (connectionCounts.get(rel.target) || 0) + 1);
    }

    const centralElements = Array.from(connectionCounts.entries())
      .map(([name, connections]) => {
        const element = this.graph.elements.find(el => el.name === name);
        return {
          id: element?.id || name,
          name,
          type: element?.type || 'unknown',
          centrality: connections / Math.max(1, this.graph.relationships.length),
          connections
        };
      })
      .sort((a, b) => b.centrality - a.centrality)
      .slice(0, 10);

    return centralElements;
  }

  private generateCharacterArcs(): Record<string, StoryGraphAnalysis['characterArcs'][string]> {
    const characterArcs: Record<string, StoryGraphAnalysis['characterArcs'][string]> = {};

    // Get all characters
    const characters = this.graph.elements.filter(el => el.type === 'character');

    for (const character of characters) {
      const arc: StoryGraphAnalysis['characterArcs'][string] = [];

      // Find all scenes where this character appears
      for (const scene of this.graph.scenes) {
        const characterInScene = scene.elements.find(el => el.name === character.name && el.type === 'character');
        if (characterInScene) {
          arc.push({
            sceneId: scene.id,
            timestamp: scene.timestamp,
            emotionalState: characterInScene.metadata.emotionalState,
            role: characterInScene.metadata.role
          });
        }
      }

      // Sort by timestamp if available
      arc.sort((a, b) => {
        if (!a.timestamp || !b.timestamp) return 0;
        return a.timestamp.localeCompare(b.timestamp);
      });

      characterArcs[character.name] = arc;
    }

    return characterArcs;
  }

  // Export methods
  exportToJSON(): string {
    return JSON.stringify(this.graph, null, 2);
  }

  exportToYAML(): string {
    // This would require a YAML library like js-yaml
    throw new Error('YAML export not implemented yet - add js-yaml dependency');
  }

  exportToCSV(): string {
    // Export elements as CSV
    const headers = ['ID', 'Name', 'Type', 'Description', 'Created', 'Updated'];
    const rows = this.graph.elements.map(el => [
      el.id,
      el.name,
      el.type,
      el.description || '',
      el.createdAt,
      el.updatedAt
    ]);

    return [headers, ...rows].map(row => row.join(',')).join('\n');
  }

  // Import methods
  importFromJSON(jsonData: string): void {
    this.graph = JSON.parse(jsonData);
  }

  getGraph(): StoryGraph {
    return this.graph;
  }
} 