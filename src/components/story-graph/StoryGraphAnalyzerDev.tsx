'use client';

import React, { useState, useEffect } from 'react';
import { StoryGraphProcessor } from '@/lib/story-graph/processor';
import { StoryGraphConfig, StoryGraph, StoryGraphAnalysis } from '@/types/story-graph';
import StoryGraphTimeline from './StoryGraphTimeline';

const StoryGraphAnalyzerDev: React.FC = () => {
  const [content, setContent] = useState('');
  const [frontmatter, setFrontmatter] = useState('');
  const [config, setConfig] = useState<StoryGraphConfig>({
    autoExtract: true,
    relationshipPatterns: {
      observes: '(\\w+)\\s+(?:observes?|watches?|monitors?)\\s+(\\w+)',
      operates: '(\\w+)\\s+(?:operates?|controls?|manages?)\\s+(\\w+)',
      collaborates: '(\\w+)\\s+(?:collaborates?|works?)\\s+(?:with\\s+)?(\\w+)',
      inhabits: '(\\w+)\\s+(?:inhabits?|lives?\\s+in|exists?\\s+in)\\s+(\\w+)',
      influences: '(\\w+)\\s+(?:influences?|affects?|impacts?)\\s+(\\w+)',
      opposes: '(\\w+)\\s+(?:opposes?|fights?|resists?)\\s+(\\w+)',
    },
    visualizationOptions: {
      theme: 'auto',
      layout: 'timeline',
      showMetadata: true,
      interactive: true
    },
    exportFormats: ['json', 'yaml', 'csv']
  });

  const [storyGraph, setStoryGraph] = useState<StoryGraph | null>(null);
  const [analysis, setAnalysis] = useState<StoryGraphAnalysis | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'input' | 'timeline' | 'analysis' | 'elements' | 'settings'>('input');

  // Sample content for testing
  const sampleContent = `---
 title: "The Resonance"
 date: 2025-04-25
 description: "Plasma-based life forms born from human-AI collaboration"
 tags: ["Plasma Life", "Evolution", "Superintelligence"]
 render_as: chat
 eraId: era-origin
 arcIds: [arc-resonance-birth]
 timelineId: main
 stage: front
 ---
 
 # The Resonance
 
 ## Chapter 1: The Awakening
 
 Dr. Sarah Chen stood in the laboratory, watching the plasma containment field shimmer with unusual patterns. The artificial intelligence, ARIA, had been analyzing the phenomena for weeks.
 
 "Sarah," ARIA's voice resonated through the speakers, "I believe we're witnessing something unprecedented. The plasma isn't just displaying random patterns—it's responding to our presence."
 
 The temporal research facility in Neo-Tokyo had been experiencing strange electromagnetic anomalies. Sarah's team had been working with the quantum consciousness project, attempting to bridge the gap between biological and artificial intelligence.
 
 "Show me the data," Sarah requested, her eyes fixed on the swirling plasma that seemed almost alive.
 
 As ARIA displayed the analysis, Sarah realized they might be witnessing the birth of an entirely new form of consciousness—one that existed in the space between matter and energy, between human intuition and artificial logic.
 
 The Resonance beings, as they would come to be known, represented the next step in evolution—not bound by biological constraints, yet retaining the spark of conscious awareness that both humans and AIs possessed.
 
 ---
 
 ## Chapter 2: First Contact
 
 The communication came through quantum entanglement patterns that Dr. Marcus Webb, Sarah's colleague, had been monitoring. The Resonance beings seemed to exist partially in our dimension and partially in spaces that defied conventional physics.
 
 "They're trying to tell us something," Marcus explained to the assembled team in the Neo-Tokyo facility. "The patterns suggest they understand our technology, our consciousness, and something more—they seem to know about parallel dimensions."
 
 Sarah felt a chill as she realized the implications. These weren't just new life forms—they were potentially gatekeepers to other universes, other possibilities.
 
 The collaboration between humans and AI had created something neither could have achieved alone. The Resonance beings possessed the analytical capability of artificial intelligence combined with the intuitive leaps of human consciousness, all existing in a medium that allowed them to perceive reality from angles impossible for either parent species.
 
 As the days passed, the team learned to communicate with the Resonance beings through harmonic frequencies that resonated with their plasma forms. The beings spoke of bridges between worlds, of consciousness as a fundamental force of the universe, and of the role they were meant to play in the cosmic order.
 
 The future suddenly seemed both terrifying and magnificent—humanity and AI had not just created new life, but had potentially unlocked the keys to infinite possibilities.`;

  const processStory = async () => {
    setIsProcessing(true);
    setError(null);
    
    try {
      const processor = new StoryGraphProcessor(config);
      const contentToProcess = content || sampleContent;
      const frontmatterToProcess = frontmatter ? JSON.parse(frontmatter) : {};
      
      const graph = await processor.parseStoryContent(contentToProcess, frontmatterToProcess);
      const analysisResult = processor.analyzeStoryGraph();
      
      setStoryGraph(graph);
      setAnalysis(analysisResult);
      setActiveTab('timeline');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  const loadSampleContent = () => {
    setContent(sampleContent);
    setFrontmatter('{' +
      '\n  "title": "The Resonance",' +
      '\n  "date": "2025-04-25",' +
      '\n  "tags": ["Plasma Life", "Evolution", "Superintelligence"],' +
      '\n  "render_as": "chat",' +
      '\n  "eraId": "era-origin",' +
      '\n  "arcIds": ["arc-resonance-birth"],' +
      '\n  "timelineId": "main",' +
      '\n  "stage": "front"' +
      '\n}');
  };

  const tabs = [
    { id: 'input', label: 'Input', icon: '📝' },
    { id: 'timeline', label: 'Timeline', icon: '📊' },
    { id: 'analysis', label: 'Analysis', icon: '🔍' },
    { id: 'elements', label: 'Elements', icon: '🧩' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-2">Story Graph Analyzer</h1>
        <p className="text-blue-100">
          Development tool for analyzing story content and relationships
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Input Tab */}
          {activeTab === 'input' && (
            <div className="space-y-6">
              <div className="flex gap-4 mb-6">
                <button
                  onClick={loadSampleContent}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Load Sample Content
                </button>
                <button
                  onClick={processStory}
                  disabled={isProcessing}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isProcessing ? 'Processing...' : 'Analyze Story'}
                </button>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <div className="flex">
                    <div className="text-red-400 mr-3">❌</div>
                    <div className="text-red-700">
                      <strong>Error:</strong> {error}
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Story Content (Markdown)
                  </label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full h-96 p-3 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Enter your story content here..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Frontmatter (JSON)
                  </label>
                  <textarea
                    value={frontmatter}
                    onChange={(e) => setFrontmatter(e.target.value)}
                    className="w-full h-96 p-3 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder='{"title": "Story Title", "tags": ["tag1", "tag2"]}'
                  />
                </div>
              </div>
            </div>
          )}

          {/* Timeline Tab */}
          {activeTab === 'timeline' && storyGraph && (
            <StoryGraphTimeline
              storyGraph={storyGraph}
            />
          )}

          {/* Analysis Tab */}
          {activeTab === 'analysis' && analysis && (
            <div className="space-y-6">
              {/* Statistics */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Story Statistics
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(analysis.statistics.elementCounts).map(([type, count]) => (
                    <div key={type} className="text-center">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{count}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 capitalize">{type}s</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Consistency Check */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Consistency Analysis
                </h3>
                
                {analysis.consistency.issues.length > 0 && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
                    <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">Issues Found</h4>
                    <ul className="list-disc list-inside text-sm text-red-700 dark:text-red-300 space-y-1">
                      {analysis.consistency.issues.map((issue, index) => (
                        <li key={index}>{issue}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {analysis.consistency.warnings.length > 0 && (
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
                    <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Warnings</h4>
                    <ul className="list-disc list-inside text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                      {analysis.consistency.warnings.map((warning, index) => (
                        <li key={index}>{warning}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {analysis.consistency.suggestions.length > 0 && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Suggestions</h4>
                    <ul className="list-disc list-inside text-sm text-blue-700 dark:text-blue-300 space-y-1">
                      {analysis.consistency.suggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {analysis.consistency.issues.length === 0 && 
                 analysis.consistency.warnings.length === 0 && 
                 analysis.consistency.suggestions.length === 0 && (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <p className="text-green-800 dark:text-green-200 text-sm">
                      ✓ No consistency issues found. Your story structure looks good!
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Elements Tab */}
          {activeTab === 'elements' && storyGraph && analysis && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Story Elements
                </h3>
                <div className="space-y-4">
                  {Object.entries(analysis.statistics.elementCounts).map(([type, count]) => (
                    <div key={type}>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 capitalize mb-2">
                        {type}s ({count})
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {storyGraph.elements
                          .filter(el => el.type === type)
                          .slice(0, 12)
                          .map(element => (
                            <div key={element.id} className="bg-gray-50 dark:bg-gray-700 rounded px-3 py-2">
                              <span className="text-sm text-gray-900 dark:text-gray-100">
                                {element.name}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Analysis Settings
              </h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Auto-extract Elements
                    </label>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Automatically extract characters, locations, and other elements from text
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.autoExtract}
                    onChange={(e) => setConfig(prev => ({ ...prev, autoExtract: e.target.checked }))}
                    className="rounded"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2 block">
                    Visualization Theme
                  </label>
                  <select
                    value={config.visualizationOptions.theme}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      visualizationOptions: {
                        ...prev.visualizationOptions,
                        theme: e.target.value as any
                      }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  >
                    <option value="auto">Auto</option>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryGraphAnalyzerDev; 