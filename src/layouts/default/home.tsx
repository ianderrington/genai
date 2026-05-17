import { FC, ComponentType } from 'react';
import dynamic from 'next/dynamic';

// Default components - these can be overridden
const FeatureCard = dynamic(() => import('@/components/home/FeatureCard'), { ssr: true });
const AnimatedHero = dynamic(() => import('@/components/home/AnimatedHero'), { ssr: true });

export interface HomePageProps {
  hero?: ComponentType<any>;
  features?: ComponentType<any>;
  featuredPosts?: ComponentType<any>;
  cta?: ComponentType<any>;
  // Additional props for customization
  className?: string;
  heroProps?: Record<string, unknown>;
  featuresProps?: Record<string, unknown>;
  featuredPostsProps?: Record<string, unknown>;
  ctaProps?: Record<string, unknown>;
}

export default function HomePage({
  hero: CustomHero = AnimatedHero,
  features: CustomFeatures,
  featuredPosts: CustomFeaturedPosts,
  cta: CustomCTA,
  className = '',
  heroProps = {},
  featuresProps = {},
  featuredPostsProps = {},
  ctaProps = {},
}: HomePageProps) {
  return (
    <div className={`min-h-screen w-full ${className} m-0 p-0`}>
      {/* Hero Section */}
      <div className="relative w-full overflow-hidden m-0 p-0">
        <CustomHero {...heroProps} />
      </div>

      {/* Features Section - Only render if CustomFeatures is provided */}
      {CustomFeatures && (
        <div className="py-20 w-full bg-gray-50 dark:bg-gray-900">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <CustomFeatures {...featuresProps} />
          </div>
        </div>
      )}

      {/* Featured Posts Section - Only render if CustomFeaturedPosts is provided */}
      {CustomFeaturedPosts && (
        <div className="w-full bg-white dark:bg-gray-800">
          <CustomFeaturedPosts {...featuredPostsProps} />
        </div>
      )}

      {/* CTA Section - Only render if CustomCTA is provided */}
      {CustomCTA && (
        <div className="w-full bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-800 dark:to-blue-900">
          <div className="w-full text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
            <CustomCTA {...ctaProps} />
          </div>
        </div>
      )}
    </div>
  );
} 