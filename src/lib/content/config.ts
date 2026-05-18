export interface SiteConfig {
  site: {
    title: string;
    description: string;
    url: string;
    images: {
      favicon: string;
      og: string;
      twitter: string;
    };
    social: {
      twitter: {
        card: 'summary' | 'summary_large_image' | 'app' | 'player';
        handle: string;
      };
      github?: string;
      openGraph: {
        type: 'website' | 'article' | 'profile';
        locale: string;
      };
    };
  };
  layout: {
    header: {
      navigation: {
        default_order: string[];
        external_links?: Array<{ label: string; url: string; [key: string]: unknown }>;
      };
    };
  };
} 