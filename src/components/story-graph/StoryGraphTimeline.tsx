'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StoryGraph, TimelineEvent, StoryElement } from '@/types/story-graph';
import { Clock, Users, MapPin, Zap, AlertCircle } from 'lucide-react';

interface StoryGraphTimelineProps {
  storyGraph: StoryGraph;
  className?: string;
  onEventClick?: (event: TimelineEvent) => void;
}

interface TimelineGroup {
  id: string;
  title: string;
  events: TimelineEvent[];
  collapsed: boolean;
}

const StoryGraphTimeline: React.FC<StoryGraphTimelineProps> = ({
  storyGraph,
  className = '',
  onEventClick
}) => {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [groupedTimeline, setGroupedTimeline] = useState<TimelineGroup[]>([]);
  const [viewMode, setViewMode] = useState<'timeline' | 'compact'>('timeline');
  const [filter, setFilter] = useState<'all' | 'critical' | 'high' | 'medium' | 'low'>('all');
  const [stageFilter, setStageFilter] = useState<'all' | 'front' | 'back'>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'story' | 'history' | 'reveal' | 'twist' | 'setup' | 'payoff'>('all');
  const [timelineId, setTimelineId] = useState<string>('all');
  const [hideSpoilers, setHideSpoilers] = useState<boolean>(true);
  const timelineRef = useRef<HTMLDivElement>(null);

  const groupTimelineEvents = useCallback((events: TimelineEvent[]): TimelineGroup[] => {
    // Group events by time periods (you can customize this logic)
    const groups: Map<string, TimelineEvent[]> = new Map();
    
    events.forEach(event => {
      // Prefer Era → Arc → Chapter grouping if available; fallback to timestamp grouping
      const eraKey = event.eraId || event.time?.era;
      const arcKey = event.arcIds && event.arcIds.length > 0 ? event.arcIds[0] : undefined;
      const chapterKey = event.chapter;
      const groupKey = eraKey || arcKey || chapterKey || extractGroupKey(event.timestamp);
      if (!groups.has(groupKey)) {
        groups.set(groupKey, []);
      }
      groups.get(groupKey)!.push(event);
    });

    return Array.from(groups.entries()).map(([key, events]) => ({
      id: key,
      title: key,
      events: events.sort((a, b) => a.timestamp.localeCompare(b.timestamp)),
      collapsed: false
    }));
  }, []);

  useEffect(() => {
    if (storyGraph.timeline) {
      const grouped = groupTimelineEvents(storyGraph.timeline);
      setGroupedTimeline(grouped);
    }
  }, [storyGraph.timeline, groupTimelineEvents]);

  const extractGroupKey = (timestamp: string): string => {
    // Extract meaningful grouping from timestamp
    if (timestamp.match(/Day \d+/i)) {
      return timestamp.match(/Day \d+/i)![0];
    }
    if (timestamp.match(/Era \d+/i)) {
      return timestamp.match(/Era \d+/i)![0];
    }
    if (timestamp.match(/\d{4}-\d{2}-\d{2}/)) {
      const date = new Date(timestamp);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    }
    return 'Unknown Period';
  };

  const getSignificanceColor = (significance: string): string => {
    switch (significance) {
      case 'critical': return 'bg-red-500 border-red-600';
      case 'high': return 'bg-orange-500 border-orange-600';
      case 'medium': return 'bg-yellow-500 border-yellow-600';
      case 'low': return 'bg-green-500 border-green-600';
      default: return 'bg-gray-500 border-gray-600';
    }
  };

  const getSignificanceIcon = (significance: string) => {
    switch (significance) {
      case 'critical': return <AlertCircle className="w-4 h-4" />;
      case 'high': return <Zap className="w-4 h-4" />;
      case 'medium': return <Clock className="w-4 h-4" />;
      case 'low': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const filteredEvents = (events: TimelineEvent[]): TimelineEvent[] => {
    return events.filter(event => {
      if (filter !== 'all' && event.significance !== filter) return false;
      if (stageFilter !== 'all' && event.stage !== stageFilter) return false;
      if (categoryFilter !== 'all' && event.category !== categoryFilter) return false;
      if (hideSpoilers && event.spoiler) return false;
      if (timelineId !== 'all' && (event.timelineId || 'main') !== timelineId) return false;
      return true;
    });
  };

  const toggleGroup = (groupId: string) => {
    setGroupedTimeline(prev => 
      prev.map(group => 
        group.id === groupId 
          ? { ...group, collapsed: !group.collapsed }
          : group
      )
    );
  };

  const handleEventClick = (event: TimelineEvent) => {
    setSelectedEvent(event);
    if (onEventClick) {
      onEventClick(event);
    }
  };

  return (
    <div className={`story-graph-timeline ${className}`}>
      {/* Header Controls */}
      <div className="flex flex-wrap items-center justify-between mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold">Story Timeline</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-3 py-1 rounded text-sm ${
                viewMode === 'timeline' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Timeline
            </button>
            <button
              onClick={() => setViewMode('compact')}
              className={`px-3 py-1 rounded text-sm ${
                viewMode === 'compact' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Compact
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-3 py-1 rounded bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-sm"
          >
            <option value="all">All Events</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value as any)}
            className="px-3 py-1 rounded bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-sm"
          >
            <option value="all">All Stages</option>
            <option value="front">Front</option>
            <option value="back">Back</option>
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as any)}
            className="px-3 py-1 rounded bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-sm"
          >
            <option value="all">All Categories</option>
            <option value="story">Story</option>
            <option value="history">History</option>
            <option value="reveal">Reveal</option>
            <option value="twist">Twist</option>
            <option value="setup">Setup</option>
            <option value="payoff">Payoff</option>
          </select>
          <select
            value={timelineId}
            onChange={(e) => setTimelineId(e.target.value)}
            className="px-3 py-1 rounded bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-sm"
          >
            <option value="all">All Timelines</option>
            <option value="main">Main</option>
            {/* Additional timeline ids can be injected here via props in the future */}
          </select>
          <label className="flex items-center space-x-2 text-sm">
            <input type="checkbox" checked={hideSpoilers} onChange={(e) => setHideSpoilers(e.target.checked)} />
            <span>Hide spoilers</span>
          </label>
          
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {storyGraph.timeline?.length || 0} events
          </div>
        </div>
      </div>

      {/* Timeline Content */}
      <div className="timeline-content" ref={timelineRef}>
        {groupedTimeline.map((group) => (
          <div key={group.id} className="timeline-group mb-8">
            {/* Group Header */}
            <div 
              className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              onClick={() => toggleGroup(group.id)}
            >
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                {group.title}
              </h4>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {filteredEvents(group.events).length} events
                </span>
                <span className={`transform transition-transform ${group.collapsed ? 'rotate-0' : 'rotate-90'}`}>
                  ▶
                </span>
              </div>
            </div>

            {/* Group Events */}
            {!group.collapsed && (
              <div className="timeline-events mt-4">
                {viewMode === 'timeline' ? (
                  <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-600"></div>
                    
                    {filteredEvents(group.events).map((event, index) => (
                      <div
                        key={event.id}
                        className="relative flex items-start space-x-4 pb-8 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-4 rounded-lg transition-colors"
                        onClick={() => handleEventClick(event)}
                      >
                        {/* Timeline Node */}
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center ${getSignificanceColor(event.significance || 'low')}`}>
                          {getSignificanceIcon(event.significance || 'low')}
                        </div>
                        
                        {/* Event Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h5 className="font-medium text-gray-900 dark:text-gray-100">
                              {event.title}
                            </h5>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {event.timestamp}
                            </span>
                          </div>
                          
                          {event.description && (
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                              {event.description}
                            </p>
                          )}
                          
                          {/* Event Details */}
                          <div className="flex flex-wrap items-center space-x-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                            {event.participants.length > 0 && (
                              <div className="flex items-center space-x-1">
                                <Users className="w-3 h-3" />
                                <span>{event.participants.join(', ')}</span>
                              </div>
                            )}
                            
                            {event.location && (
                              <div className="flex items-center space-x-1">
                                <MapPin className="w-3 h-3" />
                                <span>{event.location}</span>
                              </div>
                            )}
                            
                            {event.duration && (
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>{event.duration}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  // Compact View
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredEvents(group.events).map((event) => (
                      <div
                        key={event.id}
                        className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => handleEventClick(event)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className={`w-3 h-3 rounded-full ${getSignificanceColor(event.significance || 'low')}`}></div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {event.timestamp}
                          </span>
                        </div>
                        
                        <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                          {event.title}
                        </h5>
                        
                        {event.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {event.description.substring(0, 100)}
                            {event.description.length > 100 && '...'}
                          </p>
                        )}
                        
                        {event.participants.length > 0 && (
                          <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                            <Users className="w-3 h-3" />
                            <span>{event.participants.slice(0, 3).join(', ')}</span>
                            {event.participants.length > 3 && (
                              <span>+{event.participants.length - 3}</span>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {selectedEvent.title}
              </h3>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                <span className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{selectedEvent.timestamp}</span>
                </span>
                
                {selectedEvent.duration && (
                  <span>Duration: {selectedEvent.duration}</span>
                )}
                
                <span className={`px-2 py-1 rounded text-xs ${getSignificanceColor(selectedEvent.significance || 'low')}`}>
                  {selectedEvent.significance || 'low'}
                </span>
              </div>
              
              {selectedEvent.description && (
                <p className="text-gray-700 dark:text-gray-300">
                  {selectedEvent.description}
                </p>
              )}
              
              {selectedEvent.participants.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Participants
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedEvent.participants.map(participant => (
                      <span
                        key={participant}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-sm"
                      >
                        {participant}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedEvent.location && (
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Location
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    {selectedEvent.location}
                  </p>
                </div>
              )}
              
              {selectedEvent.metadata && Object.keys(selectedEvent.metadata).length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Additional Information
                  </h4>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded p-3 text-sm">
                    <pre className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                      {JSON.stringify(selectedEvent.metadata, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryGraphTimeline; 