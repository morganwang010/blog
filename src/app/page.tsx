import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';
import type { Post } from '@/lib/types';

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function PostCard({ post }: { post: Post }) {
  return (
    <article className="blog-card">
      <Link href={`/posts/${post.slug}`}>
        <h2 className="blog-title">{post.frontmatter.title}</h2>
      </Link>
      <p className="blog-description">{post.frontmatter.description}</p>
      <div className="blog-meta">
        <time dateTime={post.frontmatter.date}>
          {formatDate(post.frontmatter.date)}
        </time>
        <div className="flex gap-2">
          {post.frontmatter.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  const posts = getSortedPostsData();

  return (
    <div className="min-h-screen">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="blog-container py-4">
          <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
            My Blog
          </Link>
        </div>
      </header>

      <main className="blog-container py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Latest Posts</h1>
        
        {posts.length === 0 ? (
          <p className="text-gray-500 text-center py-12">No posts yet. Check back later!</p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="blog-container py-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} My Blog. All rights reserved.
        </div>
      </footer>
    </div>
  );
}