// app/tools/page.tsx
import React from 'react';

// 图标组件（用 emoji 模拟，可替换为实际图标）
const AppIcon = ({ color, emoji }: { color: string; emoji: string }) => (
  <div
    className={`w-16 h-16 rounded-xl flex items-center justify-center text-2xl shadow-md`}
    style={{ background: color }}
  >
    {emoji}
  </div>
);

// 单个应用卡片组件
const AppCard = ({
  title,
  desc,
  tag,
  iconColor,
  iconEmoji,
}: {
  title: string;
  desc: string;
  tag?: 'HOT' | 'NEW';
  iconColor: string;
  iconEmoji: string;
}) => (
  <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition cursor-pointer">
    <AppIcon color={iconColor} emoji={iconEmoji} />
    <div className="flex-1">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        {tag && (
          <span
            className={`px-2 py-0.5 text-xs text-white rounded-full ${
              tag === 'HOT' ? 'bg-red-500' : 'bg-pink-500'
            }`}
          >
            {tag}
          </span>
        )}
      </div>
      <p className="text-gray-500 text-sm mt-1">{desc}</p>
    </div>
  </div>
);

type AppItem = {
  title: string;
  desc: string;
  tag?: 'HOT' | 'NEW';
  iconColor: string;
  iconEmoji: string;
};

export default function ToolsPage() {
  const apps: AppItem[] = [
    {
      title: '最新注册域名',
      desc: '查询新注册域名',
      tag: 'HOT',
      iconColor: 'linear-gradient(135deg, #ff9966 0%, #ff5e62 100%)',
      iconEmoji: '.com',
    },
    {
      title: 'Whois反查',
      desc: '深挖注册人所有域名',
      iconColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      iconEmoji: '🔍',
    },
    {
      title: '域名批量查询',
      desc: '秒查千个域名Whois',
      iconColor: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      iconEmoji: '🔎',
    },
    {
      title: 'Whois历史',
      desc: '全程追溯历史记录',
      iconColor: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
      iconEmoji: '🕰️',
    },
    {
      title: '域名注册',
      desc: '域名抢注快人一步',
      iconColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      iconEmoji: '📝',
    },
    {
      title: '全球域名后缀',
      desc: '1500+全球域名后缀',
      iconColor: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
      iconEmoji: '🌐',
    },
    {
      title: '域名注册商',
      desc: '7W+全球注册商',
      iconColor: 'linear-gradient(135deg, #ff9966 0%, #ff5e62 100%)',
      iconEmoji: '👤',
    },
    {
      title: 'IP反查域名',
      desc: '发现IP历史关联域名',
      tag: 'HOT',
      iconColor: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
      iconEmoji: '🌍',
    },
    {
      title: '子域名查询',
      desc: '一览网站子域名结构',
      iconColor: 'linear-gradient(135deg, #ff9966 0%, #ff5e62 100%)',
      iconEmoji: 'www',
    },
    {
      title: 'Nslookup查询',
      desc: '多角度查DNS服务器',
      tag: 'NEW',
      iconColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      iconEmoji: '🔍',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">热门应用</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {apps.map((app) => (
            <AppCard key={app.title} {...app} />
          ))}
        </div>
      </div>
    </div>
  );
}