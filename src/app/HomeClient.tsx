'use client';

import Link from 'next/link';
import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSearch } from './SearchProvider';
import { TagCloud } from './TagCloud';
import type { Post } from '@/lib/types';

interface PostWithStats extends Post {
  wordCount: number;
  readingTime: number;
}

const PAGE_SIZE = 5;

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function PostCard({ post }: { post: PostWithStats }) {
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
  );
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
      >
        上一页
      </button>
      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, index) =>
          typeof page === 'number' ? (
            <button
              key={index}
              onClick={() => onPageChange(page)}
              className={`px-4 py-2 rounded-lg border transition ${
                page === currentPage
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ) : (
            <span key={index} className="px-2 text-gray-400">...</span>
          )
        )}
      </div>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
      >
        下一页
      </button>
    </div>
  );
}

export default function HomeClient({
  allPosts,
  tags,
}: {
  allPosts: PostWithStats[];
  tags: string[];
}) {
  const router = useRouter();
  // const { categories, websites } = getNavYamlData();
  const { debouncedQuery } = useSearch();

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const pageParam = params.get('page');
      if (pageParam) {
        setCurrentPage(parseInt(pageParam, 10));
      }
    }
  }, []);

  const updateURL = useCallback((page: number) => {
    const params = new URLSearchParams(window.location.search);
    if (debouncedQuery) params.set('q', debouncedQuery);
    if (page > 1) params.set('page', page.toString());
    const queryString = params.toString();
    router.push(queryString ? `/?${queryString}` : '/', { scroll: false });
  }, [router, debouncedQuery]);

  const filteredPosts = allPosts.filter((post) => {
    if (!debouncedQuery.trim()) return true;
    const lowerQuery = debouncedQuery.toLowerCase();
    const titleMatch = post.frontmatter.title.toLowerCase().includes(lowerQuery);
    const descMatch = post.frontmatter.description.toLowerCase().includes(lowerQuery);
    const tagsMatch = post.frontmatter.tags.some((tag) => tag.toLowerCase().includes(lowerQuery));
    return titleMatch || descMatch || tagsMatch;
  });

  const totalPages = Math.ceil(filteredPosts.length / PAGE_SIZE);
  const validPage = Math.min(Math.max(1, currentPage), totalPages || 1);
  const startIndex = (validPage - 1) * PAGE_SIZE;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + PAGE_SIZE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateURL(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Latest Posts</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          {debouncedQuery && (
            <p className="text-gray-500 mb-4">
              搜索 &quot;{debouncedQuery}&quot;，找到 {filteredPosts.length} 篇文章
            </p>
          )}

          {paginatedPosts.length === 0 ? (
            <p className="text-gray-500 text-center py-12">
              {debouncedQuery ? '没有找到匹配的文章' : 'No posts yet. Check back later!'}
            </p>
          ) : (
            <>
              <div className="space-y-6">
                {paginatedPosts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
              <Pagination
                currentPage={validPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>

        <aside className="w-64 flex-shrink-0">
          <TagCloud tags={tags} />
        </aside>
      </div>
    </main>
  );
}