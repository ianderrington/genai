import Link from 'next/link';
import dynamic from 'next/dynamic';

// Dynamically import components that use client-side functionality
const AnimatedHero = dynamic(() => import('@/components/home/AnimatedHero'), { ssr: true });
const FeatureCard = dynamic(() => import('@/components/home/FeatureCard'), { ssr: true });

interface HomePageProps {
  content: {
    hero: {
      title: string;
      welcome: string;
      description: string;
      cta: {
        text: string;
        link: string;
      };
    };
    features: {
      title: string;
      description: string;
      items: Array<{
        icon: string;
        title: string;
        description: string;
      }>;
    };
    cta: {
      title: string;
      description: string;
      button: {
        text: string;
        link: string;
      };
    };
  };
}

// SVG icons (you could also move these to a separate file)
const LightbulbIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18h6"></path>
    <path d="M10 22h4"></path>
    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"></path>
  </svg>
);

// Icon map
const ICONS = {
  lightbulb: LightbulbIcon,
  // Add other icons as needed
};

// The actual page component
export default function HomePage({ content }: HomePageProps) {
  if (!content) {
    return <div>Loading...</div>;
  }

  const { hero, features, cta } = content;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-50 opacity-90" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative pt-16 pb-20 lg:pt-24 lg:pb-28">
            <AnimatedHero
              title={hero.title}
              description={hero.description}
              cta={hero.cta}
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
              {features.title}
            </h2>
            <p className="text-xl text-gray-600">
              {features.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.items.map((feature, index) => {
              const Icon = ICONS[feature.icon as keyof typeof ICONS] || LightbulbIcon;
              return (
                <FeatureCard
                  key={index}
                  icon={<Icon />}
                  title={feature.title}
                  description={feature.description}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-3xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-white mb-8">
            {cta.title}
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            {cta.description}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href={cta.button.link}
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl text-blue-600 bg-white hover:bg-blue-50 transition-colors duration-300"
            >
              {cta.button.text}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 