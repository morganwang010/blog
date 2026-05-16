import Link from 'next/link';
import { getAllPostSlugs, getPostData, extractHeadings, countWords, calculateReadingTime } from '@/lib/posts';
import { getTags } from '@/lib/tags';
import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import { TagCloud } from '../../TagCloud';
import matter from 'gray-matter';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const fullPath = path.join(process.cwd(), 'posts', `${params.slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data } = matter(fileContents);
  
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
  const fullPath = path.join(process.cwd(), 'posts', `${params.slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data: frontmatter, content: rawContent } = matter(fileContents);
  
  const post = await getPostData(params.slug);
  const headings = extractHeadings(rawContent);
  const tags = getTags();
  const wordCount = countWords(rawContent);
  const readingTime = calculateReadingTime(wordCount);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
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
              {frontmatter.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm">
              <time dateTime={frontmatter.date}>
                {formatDate(frontmatter.date)}
              </time>
              <span className="text-gray-400">·</span>
              <span>{wordCount} 字</span>
              <span className="text-gray-400">·</span>
              <span>阅读时间：{readingTime} 分钟</span>
              <div className="flex gap-2 ml-auto">
                {(frontmatter.tags || []).map((tag: string) => (
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
          </header>

          <div className="bg-white rounded-lg border border-gray-200 p-6 sm:p-8 prose">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </article>

        <aside className="w-64 flex-shrink-0">
          <div className="sticky top-20 space-y-6">
            <TableOfContents headings={headings} />
            <TagCloud tags={tags} />
          </div>
        </aside>
      </div>
    </main>
  );
}