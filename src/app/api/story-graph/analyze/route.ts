import { NextRequest, NextResponse } from 'next/server';
import { StoryGraphProcessor } from '@/lib/story-graph/processor';
import { StoryGraphConfig } from '@/types/story-graph';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content, frontmatter, config } = body;

    if (!content) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    // Default configuration
    const defaultConfig: StoryGraphConfig = {
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
    };

    const processorConfig = { ...defaultConfig, ...config };
    const processor = new StoryGraphProcessor(processorConfig);

    // Process the story content
    const storyGraph = await processor.parseStoryContent(content, frontmatter || {});
    const analysis = processor.analyzeStoryGraph();

    // Return the processed data
    return NextResponse.json({
      success: true,
      storyGraph,
      analysis,
      metadata: {
        processedAt: new Date().toISOString(),
        processingTime: Date.now(), // You could implement actual timing
        version: '1.0.0'
      }
    });

  } catch (error) {
    console.error('Story graph analysis error:', error);
    
    return NextResponse.json(
      {
        error: 'Failed to analyze story graph',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Story Graph Analysis API',
    endpoints: {
      analyze: 'POST /api/story-graph/analyze',
    },
    version: '1.0.0'
  });
} 