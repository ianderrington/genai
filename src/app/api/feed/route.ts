import { Feed } from 'feed';
import { getCachedAllContent } from '@/lib/content';
import { siteConfig } from '@/config/site';
import { NextRequest, NextResponse } from 'next/server';

async function generateHtmlView(feed: Feed) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${feed.options.title}</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            font-family: system-ui, -apple-system, sans-serif;
            line-height: 1.5;
          }
          article {
            margin-bottom: 40px;
            padding-bottom: 40px;
            border-bottom: 1px solid #eee;
          }
          h1 { margin-bottom: 10px; }
          .meta { 
            color: #666;
            font-size: 0.9em;
            margin-bottom: 20px;
          }
        </style>
      </head>
      <body>
        <h1>${feed.options.title}</h1>
        <p>${feed.options.description}</p>
        ${feed.items.map(item => `
          <article>
            <h2><a href="${item.link}">${item.title}</a></h2>
            <div class="meta">
              <time>${new Date(item.date).toLocaleDateString()}</time>
              ${item.author ? ` by ${item.author[0].name}` : ''}
            </div>
            <div>${item.content}</div>
          </article>
        `).join('')}
      </body>
    </html>
  `;
}

export async function GET(request: NextRequest) {
  const { site, author, rss } = siteConfig;

  const feed = new Feed({
    title: rss.title,
    description: rss.description,
    id: site.url,
    link: site.url,
    language: site.language,
    favicon: `${site.url}/favicon.ico`,
    copyright: site.copyright,
    generator: "Next.js using Feed for Node.js",
    feedLinks: {
      rss2: `${site.url}/api/feed`,
      json: `${site.url}/api/feed?format=json`,
      atom: `${site.url}/api/feed?format=atom`,
    },
  });

  const posts = await getCachedAllContent();

  for (const post of posts) {
    // Use preprocessed HTML instead of converting markdown
    const htmlContent = post.html || '';
    const imageUrl = typeof post.metadata.coverImage === 'string'
      ? post.metadata.coverImage
      : post.metadata.coverImage?.url;

    feed.addItem({
      title: post.metadata.title,
      id: `${site.url}/${post.slug}`,
      link: `${site.url}/${post.slug}`,
      description: post.metadata.description || post.excerpt,
      content: htmlContent,
      author: [{
        name: (typeof post.metadata.author === 'object' ? post.metadata.author?.name : post.metadata.author) || author.name,
        link: author.link,
      }],
      date: new Date(post.metadata.date || new Date()),
      image: imageUrl ? {
        url: imageUrl.startsWith('http') ? imageUrl : `${site.url}${imageUrl}`,
        type: 'image/jpeg',
      } : undefined,
    });
  }

  const searchParams = new URL(request.url).searchParams;
  const format = searchParams.get('format');

  if (format === 'json') {
    return new NextResponse(feed.json1(), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': `public, max-age=${rss.ttl * 60}`,
      },
    });
  }

  if (format === 'atom') {
    return new NextResponse(feed.atom1(), {
      headers: {
        'Content-Type': 'application/atom+xml',
        'Cache-Control': `public, max-age=${rss.ttl * 60}`,
      },
    });
  }

  if (format === 'html') {
    const htmlResponse = await generateHtmlView(feed);
    return new NextResponse(htmlResponse, {
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 's-maxage=3600, stale-while-revalidate',
      },
    });
  }

  return new NextResponse(feed.rss2(), {
    headers: {
      'Content-Type': 'application/rss+xml',
      'Cache-Control': `public, max-age=${rss.ttl * 60}`,
    },
  });
} 