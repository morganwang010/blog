'use client';

import Link from 'next/link';

interface Category {
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const categories: Category[] = [
  {
    slug: '/',
    title: '首页',
    description: '浏览最新的博客文章，按分类和标签筛选',
    icon: '🏠',
    color: 'from-blue-500 to-blue-600',
  },
  {
    slug: '/fastadmin',
    title: 'FastAdmin',
    description: '基于 ThinkPHP + FastAdmin 开发的简单进销存系统',
    icon: '📦',
    color: 'from-orange-500 to-orange-600',
  },
  {
    slug: '/github',
    title: 'GitHub 仓库',
    description: '精选的 GitHub 项目仓库列表',
    icon: '🐙',
    color: 'from-gray-700 to-gray-800',
  },
  {
    slug: '/resources',
    title: '资源分享',
    description: '来自夸克网盘的学习资源和工具分享',
    icon: '💾',
    color: 'from-purple-500 to-purple-600',
  },
  {
    slug: '/tools',
    title: '工具应用',
    description: '域名查询、Whois反查等实用工具集',
    icon: '🔧',
    color: 'from-red-500 to-red-600',
  },
  {
    slug: '/website',
    title: '网站导航',
    description: '精选的在线工具和网站导航',
    icon: '🌐',
    color: 'from-cyan-500 to-cyan-600',
  },
];

export function SitemapGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={category.slug}
          className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 h-full"
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
          />

          <div className="relative p-8 h-full flex flex-col">
            <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
              {category.icon}
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              {category.title}
            </h2>

            <p className="text-gray-600 text-sm flex-1">
              {category.description}
            </p>

            <div className="mt-4 flex items-center text-blue-600 font-medium text-sm">
              进入
              <svg
                className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>

          <div className="absolute inset-0 rounded-2xl border border-gray-200 group-hover:border-blue-300 transition-colors pointer-events-none" />
        </Link>
      ))}
    </div>
  );
}

export function SitemapQuickLinks() {
  return (
    <div className="bg-gray-50 rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">快速链接</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Link
            key={`quick-${category.slug}`}
            href={category.slug}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-white transition-colors group"
          >
            <span className="text-2xl">{category.icon}</span>
            <span className="text-gray-700 group-hover:text-blue-600 transition-colors font-medium">
              {category.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function SitemapPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">网站地图</h1>
        <p className="text-gray-600 text-lg">
          快速导航到本站的各个主要分类和功能模块
        </p>
      </div>

      <SitemapGrid />

      <div className="mt-16">
        <SitemapQuickLinks />
      </div>
    </main>
  );
}
