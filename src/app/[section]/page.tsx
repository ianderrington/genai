import { notFound } from 'next/navigation';
import { getCachedSectionContent, getCachedSections, Post } from '@/lib/content';
import SafeHTML from '@/components/SafeHTML';
import type { Metadata, ResolvingMetadata } from 'next';
import blogConfig from '@/lib/content/blog-config';
import { loadConfig } from '@/lib/content/resolver';
import { DEFAULT_IMAGES } from '@/lib/constants';
import FloatingShareButton from '@/components/FloatingShareButton';
import { resolveImagePath } from '@/lib/imageUtils';
import CollectionDisplay from '@/components/CollectionDisplay';
import { prepareCollectionRenderData } from '@/lib/content/collectionRenderer';

// Force dynamic rendering to avoid SSR issues with client components
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Add type definitions at the top of the file
interface SectionPageProps {
  params: Promise<{
    section: string;
  }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Static params removed - using force-dynamic to avoid SSR issues with client components

// Generate metadata for section pages
export async function generateMetadata(
  { params }: SectionPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Await params before accessing section
  const resolvedParams = await Promise.resolve(params);
  
  // Ensure params.section is available and valid
  if (!resolvedParams?.section) {
    return {
      title: 'Section Not Found',
      description: 'The requested section could not be found.',
    };
  }

  const sectionParam = resolvedParams.section;

  // Try to get the section information (compare case-insensitively since slugs are lowercased)
  const sections = await getCachedSections();
  const sectionInfo = sections.find(s => s.id === sectionParam || s.id === sectionParam.toLowerCase());

  if (!sectionInfo) {
    return {
      title: 'Section Not Found',
      description: 'The requested section could not be found.',
    };
  }

  // Use the resolved (lowercase) section ID
  const section = sectionInfo.id;

  // Get the section content
  const contentResult = await getCachedSectionContent(section);
  const rootPost = contentResult.find(post => post.isIndex && (post.slug === section || post.slug === `${section}/index`));
  
  // Load site configuration
  const config = loadConfig();
  const { site } = config;
  
  // Determine the base slug for image resolution (just the section)
  const baseSlugForImage = section;
  
  // Use the appropriate image
  let imagePath: string = resolveImagePath(
    rootPost?.metadata?.coverImage,
    rootPost?.metadata?.image,
    section, // section context
    baseSlugForImage // base slug for relative paths
  );
  
  // Fallback logic if resolveImagePath didn't find one
  if (!imagePath || imagePath === DEFAULT_IMAGES.post /* Check against the default post image */ ) {
     imagePath = DEFAULT_IMAGES.section[section as keyof typeof DEFAULT_IMAGES.section] || DEFAULT_IMAGES.post;
  }
  
  // Get the absolute URL for images
  const parentMetadata = await parent;
  const metadataBase = parentMetadata.metadataBase || new URL(site.url);
  const absoluteImageUrl = imagePath.startsWith('http') 
    ? imagePath 
    : new URL(imagePath, metadataBase).toString();
  
  // Use section name or capitalize the section ID
  const sectionTitle = sectionInfo.name || section.charAt(0).toUpperCase() + section.slice(1);
  
  // Use root post description or a default
  const description = rootPost?.metadata.description || 
                     rootPost?.excerpt || 
                     `Explore ${sectionTitle} content by ${site.title}`;
  
  return {
    title: sectionTitle,
    description: description, // Use the determined description
    openGraph: {
      title: sectionTitle,
      description: description, // Use the determined description
      url: `/${section}`,
      siteName: site.title,
      images: [
        {
          url: absoluteImageUrl,
          width: 1200,
          height: 630,
          alt: sectionTitle,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: sectionTitle,
      description: description,
      images: [absoluteImageUrl],
      creator: site.social.twitter.handle,
    },
  };
}

export default async function SectionPage({ params }: SectionPageProps) {
  const resolvedParams = await Promise.resolve(params);
  if (!resolvedParams?.section) {
    notFound();
  }
  const { section } = resolvedParams;



  const sections = await getCachedSections();
  // Slug generation lowercases paths; compare case-insensitively
  const sectionLower = section.toLowerCase();
  const sectionInfo = sections.find(s => s.id === sectionLower || s.id === section);
  if (!sectionInfo) {
    notFound();
  }
  const resolvedSection = sectionInfo.id;

  // Handle top-level .md file case (remains unchanged)
  const isTopLevelMd = sectionInfo.id.endsWith('.md');
  if (isTopLevelMd) {
    const allPostsInSection = await getCachedSectionContent(sectionInfo.id);
    const baseSlug = sectionInfo.id.replace(/\.md$/, '');
    const post = allPostsInSection.find(p => p.slug === baseSlug);
    if (post) {
      return (
        <div className="container mx-auto px-4 py-8">
          <div className="prose prose-lg max-w-none dark:prose-invert mx-auto bg-white dark:bg-gray-800 rounded-xl p-4 md:p-8 shadow-sm dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-600 dark:prose-p:text-gray-300">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 font-display">{post.metadata.title || sectionInfo.name}</h1>
            <SafeHTML html={post.html} className="text-left" />
          </div>
        </div>
      );
    } else {
       notFound();
    }
  }

  // Use unified collection renderer (use resolved lowercase section ID)
  const renderData = await prepareCollectionRenderData(resolvedSection);
  
  if (!renderData.indexPost) {
    notFound();
  }

  // Get view configuration from index post frontmatter
  const defaultViewType = renderData.indexPost?.metadata?.defaultViewType || 'cards';
  const allowedViewTypes = renderData.indexPost?.metadata?.allowedViewTypes;

  return (
    <>
      <CollectionDisplay
        indexPost={renderData.indexPost}
        items={renderData.items}
        section={renderData.section}
        breadcrumbPath={renderData.breadcrumbPath}
        defaultViewType={defaultViewType as any}
        allowedViewTypes={allowedViewTypes as any}
        getImagePath={resolveImagePath}
      />

      <FloatingShareButton
        title={renderData.indexPost?.metadata?.title || renderData.breadcrumbPath[0]?.name}
        description={renderData.indexPost?.metadata?.description || ''}
        tags={renderData.indexPost?.metadata?.tags || []}
        shareBlurbs={renderData.indexPost?.metadata?.shareBlurbs || {}}
        isAlwaysVisible={false}
        isCollection={renderData.isCollection}
        fullContent={renderData.indexPost?.content || ''}
        htmlContent={renderData.indexPost?.html || ''}
        coverImage={typeof renderData.indexPost?.metadata?.coverImage === 'string' 
          ? renderData.indexPost?.metadata?.coverImage 
          : renderData.indexPost?.metadata?.coverImage?.url || ''}
      />
    </>
  );
}

