import Link from 'next/link';
import { getAllPostSlugs, getPostData, extractHeadings } from '@/lib/posts';
import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const fullPath = path.join(process.cwd(), 'posts', `${params.slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matter = await import('gray-matter');
  const { data } = matter.default(fileContents);
  
  return {
    title: data.title,
    description: data.description,
  };
}

export async function generateStaticParams() {
  return getAllPostSlugs();
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function TableOfContents({ headings }: { headings: { id: string; text: string; level: number }[] }) {
  if (headings.length === 0) return null;

  return (
    <nav className="hidden lg:block bg-white rounded-lg border border-gray-200 p-4 sticky top-20">
      <h3 className="font-semibold text-gray-900 mb-3">Table of Contents</h3>
      <ul className="space-y-1">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={`toc-link ${heading.level === 2 ? 'pl-0' : 'pl-4'}`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostData(params.slug);
  const headings = extractHeadings(post.content);

  return (
    <div className="min-h-screen">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
            My Blog
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <article className="flex-1">
            <header className="mb-8">
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
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {post.frontmatter.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm">
                <time dateTime={post.frontmatter.date}>
                  {formatDate(post.frontmatter.date)}
                </time>
                <div className="flex gap-2">
                  {post.frontmatter.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </header>

            <div className="bg-white rounded-lg border border-gray-200 p-6 sm:p-8 prose">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
          </article>

          <aside className="w-64 flex-shrink-0">
            <TableOfContents headings={headings} />
          </aside>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} My Blog. All rights reserved.
        </div>
      </footer>
    </div>
  );
}