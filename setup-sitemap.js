#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const sitemapDir = path.join(__dirname, 'src', 'app', 'sitemap');
const pageFile = path.join(sitemapDir, 'page.tsx');

// 创建目录
if (!fs.existsSync(sitemapDir)) {
  fs.mkdirSync(sitemapDir, { recursive: true });
  console.log('✓ Created sitemap directory');
}

// 创建或更新 page.tsx
if (!fs.existsSync(pageFile)) {
  const content = `'use client';

import SitemapPage from '@/components/Sitemap';

export default SitemapPage;
`;
  fs.writeFileSync(pageFile, content);
  console.log('✓ Created sitemap/page.tsx');
} else {
  console.log('✓ Sitemap page already exists');
}

