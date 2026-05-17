'use client';
// pages/index.tsx
import React from 'react';
import WaveAnimation from '@/components/WaveAnimation';
import FeatureSection from '@/components/FeatureSection';
import PriviewCarousel from '@/components/PriviewCarousel';

export default function SimpleInventoryPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* 主内容区 */}
      <div className="flex-1 relative bg-gradient-to-b from-[#1a304a] to-[#162a40] flex flex-col items-center justify-center text-white px-4 overflow-hidden">
        {/* 背景山峰装饰（可选，简化版） */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#162a40] to-transparent" style={{ clipPath: 'polygon(0% 100%, 10% 70%, 20% 85%, 30% 50%, 40% 75%, 50% 40%, 60% 65%, 70% 30%, 80% 60%, 90% 35%, 100% 55%, 100% 100%)' }} />
        </div>

        {/* 图标 */}
        <div className="w-24 h-24 rounded-full bg-yellow-200 flex items-center justify-center mb-6 shadow-lg">
          {/* 简易仓库图标（可替换为图片） */}
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.5">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </div>

        {/* 标题 */}
        <h1 className="text-4xl font-bold mb-4">简单进销存</h1>

        {/* 描述 */}
        <p className="text-center text-lg max-w-2xl mb-8 leading-relaxed">
          一款基于ThinkPHP+FastAdmin开发的简单的进销存功能, 特别适合中小型企业, 个体户来使用
        </p>

        {/* 按钮组 */}
        <div className="flex gap-4 mb-12">
          <button className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium flex items-center gap-2 transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="10" x2="8" y2="10" />
              <line x1="16" y1="14" x2="8" y2="14" />
              <line x1="8" y1="18" x2="16" y2="18" />
            </svg>
            立即体验
          </button>
          <button className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium flex items-center gap-2 transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            立即购买
          </button>
        </div>

        {/* 底部链接 */}
        <div className="flex gap-8 text-sm text-gray-300">
          <a href="#" className="flex items-center gap-1 hover:text-white transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
            应用信息
          </a>
          <a href="#" className="flex items-center gap-1 hover:text-white transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
            相关文档
          </a>
          <a href="#" className="flex items-center gap-1 hover:text-white transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            售前咨询
          </a>
        </div>
      </div>
      {/* SVG 波浪区域（抬升并置顶） */}
      <div className="relative -mt-16 z-40 pointer-events-none">
        <WaveAnimation />
      </div>
      {/* 下方灰色区域 */}
      <div className="flex-1 bg-gray-100">
        <FeatureSection />
      </div>

       <div className="flex-1 bg-gray-100">
        <PriviewCarousel />
      </div>
    </div>
  );
}
