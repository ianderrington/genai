// Story Graph Types - TypeScript interfaces to replace Python data structures
export interface StoryElement {
  id: string;
  name: string;
  type: 'character' | 'location' | 'technology' | 'concept' | 'theme';
  description?: string;
  ratings?: Ratings;
  metadata: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface Character extends StoryElement {
  type: 'character';
  role?: string;
  emotionalState?: string;
  motivations?: string[];
  appearanceDescription?: string;
  relationships?: string[];
}

export interface Location extends StoryElement {
  type: 'location';
  locationType?: string;
  atmosphere?: string;
  significance?: string;
  physicalDescription?: string;
}

export interface Technology extends StoryElement {
  type: 'technology';
  techType?: string;
  status?: 'active' | 'inactive' | 'developing' | 'destroyed';
  purpose?: string;
  threatLevel?: 'low' | 'medium' | 'high' | 'critical';
}

export interface Concept extends StoryElement {
  type: 'concept';
  conceptType?: string;
  significance?: string;
  currentState?: string;
  evolution?: string[];
}

export interface Theme extends StoryElement {
  type: 'theme';
  themeType?: string;
  manifestation?: string;
  symbolism?: string;
}

export interface StoryRelationship {
  id: string;
  source: string;
  target: string;
  type: 'observes' | 'operates' | 'collaborates' | 'inhabits' | 'executes' | 'influences' | 'contains' | 'seeks' | 'opposes' | 'advises' | 'related';
  description?: string;
  strength?: 'weak' | 'moderate' | 'strong';
  metadata: Record<string, any>;
  createdAt: string;
}

export interface StoryScene {
  id: string;
  title: string;
  description?: string;
  timestamp?: string; // legacy timestamp string
  // Extended temporal fields
  time?: {
    abs?: string; // ISO date/time
    era?: string; // human label
    rel?: { after?: string; before?: string; offset?: string; simultaneousWith?: string };
    order?: number; // tiebreaker within same parent
  };
  location?: string;
  duration?: string;
  eraId?: string;
  arcIds?: string[];
  chapter?: string;
  stage?: 'front' | 'back';
  beats?: Beat[];
  timelineId?: string; // default 'main'
  elements: StoryElement[];
  relationships: StoryRelationship[];
  narrative?: string;
  ratings?: Ratings;
  metadata: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface StoryGraph {
  id: string;
  metadata: {
    title: string;
    description?: string;
    version: string;
    author?: string;
    created: string;
    modified: string;
    tags?: string[];
    universeId?: string;
    storyId?: string;
  };
  elements: StoryElement[];
  relationships: StoryRelationship[];
  scenes: StoryScene[];
  timeline?: TimelineEvent[];
}

export interface TimelineEvent {
  id: string;
  title: string;
  description?: string;
  timestamp: string; // derived/resolved timestamp label for UI
  time?: StoryScene['time'];
  duration?: string;
  sceneId: string;
  participants: string[];
  location?: string;
  significance?: 'low' | 'medium' | 'high' | 'critical';
  eraId?: string;
  arcIds?: string[];
  chapter?: string;
  stage?: 'front' | 'back';
  category?: 'story' | 'history' | 'reveal' | 'twist' | 'setup' | 'payoff';
  timelineId?: string;
  setupIds?: string[];
  payoffIds?: string[];
  relatesTo?: string[];
  spoiler?: boolean;
  ratings?: Ratings;
  metadata: Record<string, any>;
}

export interface StoryGraphConfig {
  autoExtract: boolean;
  relationshipPatterns: Record<string, string>;
  visualizationOptions: {
    theme: 'light' | 'dark' | 'auto';
    layout: 'timeline' | 'graph' | 'hybrid';
    showMetadata: boolean;
    interactive: boolean;
  };
  exportFormats: ('json' | 'yaml' | 'csv' | 'mermaid' | 'timeline_js')[];
}

export interface StoryGraphAnalysis {
  consistency: {
    issues: string[];
    warnings: string[];
    suggestions: string[];
  };
  statistics: {
    totalElements: number;
    elementCounts: Record<string, number>;
    relationshipCounts: Record<string, number>;
    sceneCount: number;
    timelineSpan?: string;
  };
  centralElements: Array<{
    id: string;
    name: string;
    type: string;
    centrality: number;
    connections: number;
  }>;
  characterArcs: Record<string, Array<{
    sceneId: string;
    timestamp?: string;
    emotionalState?: string;
    role?: string;
  }>>;
} 

// New supporting types
export interface Ratings {
  canonStatus?: 'draft' | 'alpha' | 'beta' | 'canon' | 'deprecated';
  narrativeStrength?: 1 | 2 | 3 | 4 | 5;
  coherence?: 1 | 2 | 3 | 4 | 5;
  novelty?: 1 | 2 | 3 | 4 | 5;
  emotionalImpact?: 1 | 2 | 3 | 4 | 5;
  readiness?: 1 | 2 | 3 | 4 | 5;
  confidence?: 1 | 2 | 3 | 4 | 5;
}

export interface Beat {
  id: string;
  title: string;
  stage?: 'front' | 'back';
  timestamp?: string;
  significance?: 'low' | 'medium' | 'high' | 'critical';
  metadata?: Record<string, any>;
}