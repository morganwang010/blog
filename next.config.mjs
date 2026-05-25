import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 在构建前创建 sitemap 目录和文件
const setupSitemap = async () => {
  const sitemapDir = path.join(__dirname, 'src', 'app', 'sitemap');
  const pageFile = path.join(sitemapDir, 'page.tsx');

  try {
    // 创建目录
    await fs.mkdir(sitemapDir, { recursive: true });

    // 检查文件是否存在
    try {
      await fs.access(pageFile);
    } catch {
      // 文件不存在，创建它
      const sitemapPageContent = `'use client';

import SitemapPage from '@/components/Sitemap';

export default SitemapPage;
`;
      
      await fs.writeFile(pageFile, sitemapPageContent);
    }
  } catch (error) {
    console.warn('Warning: Could not setup sitemap automatically:', error);
  }
};

// 执行 setup
await setupSitemap();

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
