import Link from 'next/link';
import { getPostsByTag, getTags } from '@/lib/tags';
import { countWords, calculateReadingTime } from '@/lib/posts';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { tag: string } }): Promise<Metadata> {
  return {
    title: `${params.tag} - My Blog`,
    description: `Posts tagged with ${params.tag}`,
  };
}

export async function generateStaticParams() {
  const tags = getTags();
  return tags.map((tag) => ({ tag }));
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function TagPage({ params }: { params: { tag: string } }) {
  const posts = getPostsByTag(params.tag);
  const allTags = getTags();

  const postsWithStats = posts.map(post => ({
    ...post,
    wordCount: countWords(post.content),
    readingTime: calculateReadingTime(countWords(post.content)),
  }));

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to home
          </Link>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">标签: {params.tag}</h1>
          <p className="text-gray-500 mb-6">共 {posts.length} 篇文章</p>

          {posts.length === 0 ? (
            <p className="text-gray-500 text-center py-12">暂无文章</p>
          ) : (
            <div className="space-y-6">
              {postsWithStats.map((post) => (
                <article key={post.slug} className="blog-card">
                  <Link href={`/posts/${post.slug}`}>
                    <h2 className="blog-title">{post.frontmatter.title}</h2>
                  </Link>
                  <p className="blog-description">{post.frontmatter.description}</p>
                  <div className="blog-meta">
                    <time dateTime={post.frontmatter.date}>
                      {formatDate(post.frontmatter.date)}
                    </time>
                    <span className="text-gray-400">·</span>
                    <span>{post.wordCount} 字</span>
                    <span className="text-gray-400">·</span>
                    <span>阅读时间：{post.readingTime} 分钟</span>
                    <div className="flex gap-2 ml-auto">
                      {(post.frontmatter.tags || []).map((tag) => (
                        <Link
                          key={tag}
                          href={`/tags/${tag}`}
                          className="tag hover:bg-blue-100 transition-colors"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        <aside className="w-64 flex-shrink-0">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">所有标签</h3>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${tag}`}
                  className={`tag hover:bg-blue-100 transition-colors ${
                    tag === params.tag ? 'bg-blue-600 text-white' : ''
                  }`}
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}