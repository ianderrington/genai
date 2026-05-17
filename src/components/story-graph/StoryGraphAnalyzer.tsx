'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Post } from '@/lib/content';
import { StoryGraphProcessor } from '@/lib/story-graph/processor';
import { StoryGraph, StoryGraphConfig, StoryGraphAnalysis } from '@/types/story-graph';
import StoryGraphTimeline from './StoryGraphTimeline';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FileText, Users, MapPin, Cog, Zap, TrendingUp, Network, Calendar, Settings } from 'lucide-react';

interface StoryGraphAnalyzerProps {
  post: Post;
  className?: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF7C7C'];

const StoryGraphAnalyzer: React.FC<StoryGraphAnalyzerProps> = ({
  post,
  className = ''
}) => {
  const [storyGraph, setStoryGraph] = useState<StoryGraph | null>(null);
  const [analysis, setAnalysis] = useState<StoryGraphAnalysis | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'timeline' | 'analysis' | 'elements' | 'settings'>('timeline');
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
      interactive: true,
    },
    exportFormats: ['json', 'csv']
  });

  const processStory = useCallback(async () => {
    if (!post.content) return;
    
    setIsProcessing(true);
    setError(null);
    
    try {
      const processor = new StoryGraphProcessor(config);
      const graph = await processor.parseStoryContent(post.content, post.metadata);
      const analysisResult = processor.analyzeStoryGraph();
      
      setStoryGraph(graph);
      setAnalysis(analysisResult);
    } catch (err) {
      console.error('Error processing story:', err);
      setError(err instanceof Error ? err.message : 'Failed to process story');
    } finally {
      setIsProcessing(false);
    }
  }, [post.content, post.metadata, config]);

  useEffect(() => {
    // Auto-process if this is a story post
    if (post.metadata.render_as === 'chat' || post.sectionId === 'fiction') {
      processStory();
    }
  }, [post.content, post.metadata, post.sectionId, config, processStory]);

  const elementTypeData = useMemo(() => {
    if (!analysis) return [];
    
    return Object.entries(analysis.statistics.elementCounts).map(([type, count]) => ({
      type: type.charAt(0).toUpperCase() + type.slice(1),
      count,
      percentage: Math.round((count / analysis.statistics.totalElements) * 100)
    }));
  }, [analysis]);

  const relationshipData = useMemo(() => {
    if (!analysis) return [];
    
    return Object.entries(analysis.statistics.relationshipCounts).map(([type, count]) => ({
      type: type.charAt(0).toUpperCase() + type.slice(1),
      count
    }));
  }, [analysis]);

  const tabs = [
    { id: 'timeline', label: 'Timeline', icon: Calendar },
    { id: 'analysis', label: 'Analysis', icon: TrendingUp },
    { id: 'elements', label: 'Elements', icon: Network },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className={`story-graph-analyzer ${className}`}>
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Story Graph Analysis
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {post.metadata.title}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {!storyGraph && (
                <button
                  onClick={processStory}
                  disabled={isProcessing}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isProcessing ? 'Processing...' : 'Analyze Story'}
                </button>
              )}
              
              {storyGraph && (
                <button
                  onClick={processStory}
                  disabled={isProcessing}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isProcessing ? 'Reprocessing...' : 'Reanalyze'}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        {storyGraph && (
          <div className="flex space-x-1 p-2 bg-gray-50 dark:bg-gray-700">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">!</span>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-red-800 dark:text-red-200">
                Processing Error
              </h3>
              <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                {error}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isProcessing && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-8 mb-6">
          <div className="flex items-center justify-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="text-blue-800 dark:text-blue-200">
              Processing story content...
            </span>
          </div>
        </div>
      )}

      {/* Content */}
      {storyGraph && analysis && (
        <div className="space-y-6">
          {/* Timeline Tab */}
          {activeTab === 'timeline' && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6">
                {storyGraph.timeline && storyGraph.timeline.length > 0 ? (
                  <StoryGraphTimeline storyGraph={storyGraph} />
                ) : (
                  <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                    <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium mb-2">No Timeline Available</p>
                    <p className="text-sm">
                      This story doesn&apos;t have timestamp information. 
                      Add timestamps to your scenes to generate a timeline.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Analysis Tab */}
          {activeTab === 'analysis' && (
            <div className="space-y-6">
              {/* Statistics Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Elements</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {analysis.statistics.totalElements}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                      <Network className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Relationships</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {Object.values(analysis.statistics.relationshipCounts).reduce((a, b) => a + b, 0)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Scenes</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {analysis.statistics.sceneCount}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Characters</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {analysis.statistics.elementCounts.character || 0}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Element Distribution */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Element Distribution
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={elementTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ type, percentage }) => `${type} (${percentage}%)`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {elementTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Relationship Types */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Relationship Types
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={relationshipData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="type" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Consistency Check */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Consistency Analysis
                </h3>
                
                <div className="space-y-4">
                  {analysis.consistency.issues.length > 0 && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                      <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">Issues</h4>
                      <ul className="list-disc list-inside text-sm text-red-700 dark:text-red-300 space-y-1">
                        {analysis.consistency.issues.map((issue, index) => (
                          <li key={index}>{issue}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {analysis.consistency.warnings.length > 0 && (
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
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
            </div>
          )}

          {/* Elements Tab */}
          {activeTab === 'elements' && (
            <div className="space-y-6">
              {/* Central Elements */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Most Central Elements
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {analysis.centralElements.slice(0, 6).map((element, index) => (
                    <div key={element.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">
                          {element.name}
                        </h4>
                        <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">
                          {element.type}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {element.connections} connections
                      </div>
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${element.centrality * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* All Elements by Type */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  All Elements
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
                        {storyGraph.elements.filter(el => el.type === type).length > 12 && (
                          <div className="bg-gray-50 dark:bg-gray-700 rounded px-3 py-2">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              +{storyGraph.elements.filter(el => el.type === type).length - 12} more
                            </span>
                          </div>
                        )}
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

                <div>
                  <label className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2 block">
                    Export Formats
                  </label>
                  <div className="space-y-2">
                    {['json', 'yaml', 'csv', 'mermaid', 'timeline_js'].map(format => (
                      <div key={format} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={config.exportFormats.includes(format as any)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setConfig(prev => ({
                                ...prev,
                                exportFormats: [...prev.exportFormats, format as any]
                              }));
                            } else {
                              setConfig(prev => ({
                                ...prev,
                                exportFormats: prev.exportFormats.filter(f => f !== format)
                              }));
                            }
                          }}
                          className="rounded"
                        />
                        <label className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                          {format}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StoryGraphAnalyzer; 