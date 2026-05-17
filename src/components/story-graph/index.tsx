'use client';

import React, { useState } from 'react';
import { Post } from '@/lib/content';
import { FileText, BarChart, Users, Calendar } from 'lucide-react';

interface StoryGraphProps {
  post: Post;
  className?: string;
}

const StoryGraph: React.FC<StoryGraphProps> = ({ post, className = '' }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  const processStory = async () => {
    setIsProcessing(true);
    // TODO: Implement story processing with the new React system
    setTimeout(() => {
      setAnalysis({
        elements: 12,
        relationships: 8,
        scenes: 5,
        characters: 4
      });
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className={`story-graph p-6 bg-white dark:bg-gray-800 rounded-lg border ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <FileText className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold">Story Graph Analysis</h2>
        </div>
        
        <button
          onClick={processStory}
          disabled={isProcessing}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isProcessing ? 'Processing...' : 'Analyze Story'}
        </button>
      </div>

      {isProcessing && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Analyzing story structure...</p>
        </div>
      )}

      {analysis && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Elements</span>
            </div>
            <div className="text-2xl font-bold">{analysis.elements}</div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <BarChart className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Relationships</span>
            </div>
            <div className="text-2xl font-bold">{analysis.relationships}</div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="w-4 h-4 text-purple-600" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Scenes</span>
            </div>
            <div className="text-2xl font-bold">{analysis.scenes}</div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="w-4 h-4 text-orange-600" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Characters</span>
            </div>
            <div className="text-2xl font-bold">{analysis.characters}</div>
          </div>
        </div>
      )}

      {!analysis && !isProcessing && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Click &quot;Analyze Story&quot; to process this content</p>
        </div>
      )}
    </div>
  );
};

export default StoryGraph; 