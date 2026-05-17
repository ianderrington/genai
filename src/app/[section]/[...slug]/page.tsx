import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';
import { loadConfig } from '@/lib/content/resolver';
import { DEFAULT_IMAGES } from '@/lib/constants';
import PostComponent from '@/components/PostComponent';
import FloatingShareButton from '@/components/FloatingShareButton';
import Breadcrumb from '@/components/Breadcrumb';
import { resolveImagePath } from '@/lib/imageUtils';
import CollectionDisplay from '@/components/CollectionDisplay';
import { prepareCollectionRenderData } from '@/lib/content/collectionRenderer';
import { ArticleSchema, BreadcrumbSchema } from '@supernal/docs-kit';

// Force dynamic rendering to avoid SSR issues with client components
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  params: Promise<{
    section: string;
    slug: string[];
  }>;
}

// Static params removed - using force-dynamic to avoid SSR issues with client components

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  // Lowercase section to match slug generation (generateSlug lowercases all paths)
  const section = resolvedParams.section.toLowerCase();
  const slug = resolvedParams.slug;

  // Use unified collection renderer
  const renderData = await prepareCollectionRenderData(section, slug);
  
  if (!renderData.indexPost) {
    notFound();
  }

  // Get view configuration from index post frontmatter
  const defaultViewType = renderData.indexPost?.metadata?.defaultViewType || 'cards';
  const allowedViewTypes = renderData.indexPost?.metadata?.allowedViewTypes;

  // Prepare schema data
  const config = loadConfig();
  const baseUrl = config.site.url;
  const fullUrl = `${baseUrl}/${section}/${slug.join('/')}`;

  // Prepare breadcrumb items for schema
  const breadcrumbItems = [
    { name: 'Home', url: baseUrl },
    ...renderData.breadcrumbPath.map((crumb: any) => ({
      name: crumb.title,
      url: `${baseUrl}${crumb.href}`
    }))
  ];

  // Prepare image URL for schema - resolve relative paths first
  const resolvedSchemaImageUrl = resolveImagePath(
    renderData.indexPost.metadata.coverImage,
    DEFAULT_IMAGES.post,
    section,
    renderData.indexPost.slug
  );

  const absoluteImageUrl = resolvedSchemaImageUrl.startsWith('http')
    ? resolvedSchemaImageUrl
    : `${baseUrl}${resolvedSchemaImageUrl}`;

  return (
    <>
      {/* Schema.org structured data */}
      {!renderData.isCollection && (
        <>
          <ArticleSchema
            title={renderData.indexPost.metadata.title}
            description={renderData.indexPost.metadata.description || renderData.indexPost.excerpt || ''}
            datePublished={renderData.indexPost.metadata.date ? new Date(renderData.indexPost.metadata.date).toISOString() : new Date().toISOString()}
            dateModified={renderData.indexPost.metadata.dateModified ? new Date(renderData.indexPost.metadata.dateModified).toISOString() : undefined}
            image={absoluteImageUrl || undefined}
            url={fullUrl}
            keywords={renderData.indexPost.metadata.tags}
          />
          <BreadcrumbSchema items={breadcrumbItems} />
        </>
      )}

      {renderData.isCollection ? (
        <CollectionDisplay
          indexPost={renderData.indexPost}
          items={renderData.items}
          section={renderData.section}
          breadcrumbPath={renderData.breadcrumbPath}
          defaultViewType={defaultViewType as any}
          allowedViewTypes={allowedViewTypes as any}
          getImagePath={resolveImagePath}
        />
      ) : (
        <>
          <div className="breadcrumb-container">
            <Breadcrumb path={renderData.breadcrumbPath} />
          </div>
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-4">
            <PostComponent post={renderData.indexPost} />
          </div>
        </>
      )}
      <FloatingShareButton
        title={renderData.indexPost.metadata.title}
        description={renderData.indexPost.metadata.description || renderData.indexPost.excerpt || ''}
        tags={renderData.indexPost.metadata.tags || []}
        shareBlurbs={renderData.indexPost.metadata.shareBlurbs}
        isAlwaysVisible={false}
        isCollection={renderData.isCollection}
        fullContent={renderData.indexPost.content || ''}
        htmlContent={renderData.indexPost.html || ''}
        coverImage={typeof renderData.indexPost.metadata.coverImage === 'string'
          ? renderData.indexPost.metadata.coverImage
          : renderData.indexPost.metadata.coverImage?.url || ''}
      />
    </>
  );
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  
  const { section, slug } = resolvedParams;
  const renderData = await prepareCollectionRenderData(section, slug);
  const post = renderData.indexPost;

  if (!post) {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist.',
    };
  }

  const config = loadConfig();
  const { site } = config;
  
  const parentMetadata = await parent;
  const metadataBase = parentMetadata.metadataBase || new URL(site.url);
  
  const url = `/${resolvedParams.section}/${Array.isArray(resolvedParams.slug) ? resolvedParams.slug.join('/') : resolvedParams.slug}`;
  
  const title = post.metadata.title;
  const description = post.metadata.description || post.excerpt || '';
  
  const resolvedImageUrl = resolveImagePath(
    post.metadata.coverImage,
    DEFAULT_IMAGES.post,
    resolvedParams.section,
    post.slug
  );

  const absoluteImageUrl = resolvedImageUrl.startsWith('http') 
    ? resolvedImageUrl 
    : new URL(resolvedImageUrl, metadataBase).toString();

  const shareBlurbs = post.metadata.shareBlurbs || {};

  // Use platform-specific descriptions for social sharing
  const facebookDescription = shareBlurbs.facebook || description;
  const twitterDescription = shareBlurbs.twitter || description;

  return {
    title,
    description,
    metadataBase: metadataBase,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: title,
      description: facebookDescription,
      url: url,
      siteName: site.title,
      images: [
        {
          url: absoluteImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: site.social.openGraph.locale,
      type: 'article',
      publishedTime: post.metadata.date ? new Date(post.metadata.date).toISOString() : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: twitterDescription,
      images: [absoluteImageUrl],
    },
  };
} 