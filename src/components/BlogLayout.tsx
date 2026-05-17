import React from 'react';
import { BlogPostProps } from '@/lib/getBlogPosts';
import Link from 'next/link';

interface SidebarItemProps {
  post: BlogPostProps;
  currentSlug: string;
  level?: number;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ post, currentSlug, level = 0 }) => (
  <Link 
    href={`/blog/${post.slug}`}
    className={`
      block py-2 pl-${level * 4} hover:bg-gray-100
      ${currentSlug === post.slug ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'}
    `}
  >
    {post.title}
  </Link>
);

interface BlogLayoutProps {
  post: BlogPostProps;
  siblingPosts: BlogPostProps[];
  childPosts: BlogPostProps[];
  children: React.ReactNode;
}

const BlogLayout: React.FC<BlogLayoutProps> = ({ 
  post, 
  siblingPosts, 
  childPosts, 
  children 
}) => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4">
          {/* Parent/Sibling Navigation */}
          {siblingPosts.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-500 uppercase text-sm mb-2">
                In This Section
              </h3>
              <nav>
                {siblingPosts.map(sibling => (
                  <SidebarItem 
                    key={sibling.slug} 
                    post={sibling} 
                    currentSlug={post.slug}
                  />
                ))}
              </nav>
            </div>
          )}

          {/* Child Pages */}
          {childPosts.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-500 uppercase text-sm mb-2">
                Sub Pages
              </h3>
              <nav>
                {childPosts.map(child => (
                  <SidebarItem 
                    key={child.slug} 
                    post={child} 
                    currentSlug={post.slug}
                    level={1}
                  />
                ))}
              </nav>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-white">
        <div className="max-w-4xl mx-auto px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default BlogLayout; 