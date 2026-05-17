import { NextRequest, NextResponse } from 'next/server';

/**
 * Mock Chat API - No API key required
 *
 * This mock endpoint simulates AI responses without calling Claude API.
 * Perfect for development and testing without API costs.
 */

export async function POST(request: NextRequest) {
  try {
    const { messages, tools } = await request.json();

    const lastMessage = messages[messages.length - 1];
    const userQuery = lastMessage.content.toLowerCase();

    // Mock responses based on user input
    let response = '';

    if (userQuery.includes('what can you') || userQuery.includes('help')) {
      response = `I'm your AI assistant! I can help you with:

**Navigation:**
- Search for blog posts
- Navigate to different sections
- Find related content

**Available Tools (${tools?.length || 0} registered):**
${tools?.slice(0, 5).map((t: any) => `- ${t.name}: ${t.description}`).join('\n') || 'No tools available'}

**Example queries:**
- "Show me posts about AI"
- "Navigate to the blog section"
- "What are the latest posts?"

Try asking me something!`;
    } else if (userQuery.includes('navigate') || userQuery.includes('go to')) {
      response = `Sure! I can help you navigate. Here are some sections:
- /blog - All blog posts
- /search - Search page
- / - Home page

Just tell me where you'd like to go!`;
    } else if (userQuery.includes('search') || userQuery.includes('find')) {
      response = `I can help you search! Try:
- Clicking the search button in the header
- Using the search bar
- Or tell me what topic you're interested in`;
    } else if (userQuery.includes('tools')) {
      response = `I have access to ${tools?.length || 0} tools:\n\n${
        tools?.map((t: any, i: number) => `${i + 1}. **${t.name}**\n   ${t.description}`).join('\n\n') || 'No tools registered yet'
      }`;
    } else {
      response = `I received your message: "${lastMessage.content}"

I'm a mock AI assistant (no API costs!). I can:
- Show you available tools with "what tools do you have?"
- Help you navigate with "navigate to..."
- Search content with "find posts about..."

What would you like to do?`;
    }

    // Simulate AI thinking delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json({ message: response });
  } catch (error) {
    console.error('Mock chat error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
