'use client';

import Link from 'next/link';
import { useSearch } from './SearchProvider';
import { usePathname } from 'next/navigation';

function SearchInput() {
  const { searchQuery, setSearchQuery } = useSearch();
  const pathname = usePathname();

  const handleChange = (value: string) => {
    setSearchQuery(value);
  };

  return (
    <div className="flex-1 max-w-md mx-4">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="搜索文章标题、描述或标签..."
          className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
        />
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        {searchQuery && (
          <button
            onClick={() => handleChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors whitespace-nowrap">
            My Blog
          </Link>

          <SearchInput />

          <nav className="flex items-center gap-4 whitespace-nowrap">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                pathname === '/' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              首页
            </Link>
            <Link
              href="/sitemap"
              className={`text-sm font-medium transition-colors ${
                pathname === '/sitemap' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              导航
            </Link>
            <Link
              href="/github"
              className={`text-sm font-medium transition-colors ${
                pathname === '/github' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              GitHub
            </Link>
            <Link
              href="/tools"
              className={`text-sm font-medium transition-colors ${
                pathname === '/tools' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              工具
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}