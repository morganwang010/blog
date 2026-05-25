# Sitemap 导航功能

本项目已集成一个完整的网站地图/导航页面，方便用户快速访问各个主要功能模块。

## 功能特性

✅ **网站导航页面** - 访问 `/sitemap` 查看所有分类
✅ **头部导航链接** - 在主导航栏中添加"导航"菜单项
✅ **分类展示**：
   - 首页 - 博客文章列表
   - FastAdmin - 进销存系统
   - GitHub 仓库 - 精选项目
   - 资源分享 - 夸克网盘资源
   - 工具应用 - 域名查询工具
   - 网站导航 - 在线工具导航

## 文件结构

```
src/
├── app/
│   ├── Header.tsx                 # 已更新：添加导航链接
│   └── sitemap/                   # 通过脚本自动创建
│       └── page.tsx               # Sitemap 页面
├── components/
│   └── Sitemap.tsx                # Sitemap 组件 (SitemapPage, SitemapGrid, SitemapQuickLinks)
└── ...
setup-sitemap.js                   # 创建目录和文件的脚本
next.config.mjs                    # 已更新：包含自动 setup 逻辑
package.json                       # 已更新：添加 setup scripts
```

## 快速开始

### 方法 1：自动设置（推荐）
```bash
npm run setup       # 手动运行设置
npm run dev         # 开发时自动运行设置
npm run build       # 构建时自动运行设置
```

### 方法 2：手动设置
```bash
node setup-sitemap.js
```

## 使用方法

1. **访问导航页面**
   - 直接访问 `/sitemap` URL
   - 或点击导航栏中的"导航"链接

2. **查看分类卡片**
   - 每个分类都显示为一个卡片
   - 包含图标、标题和描述
   - 支持 hover 效果

3. **快速链接**
   - 页面下方提供快速链接列表
   - 快速跳转到各个分类

## 自定义

编辑 `src/components/Sitemap.tsx` 中的 `categories` 数组来修改分类：

```typescript
const categories: Category[] = [
  {
    slug: '/your-route',
    title: '分类名称',
    description: '分类描述',
    icon: '🎯',
    color: 'from-red-500 to-red-600',
  },
  // ... 添加更多分类
];
```

## 样式特性

- **响应式设计** - 支持移动设备、平板和桌面
- **渐变背景** - 每个卡片都有独特的颜色渐变
- **悬停效果** - 卡片支持缩放和阴影效果
- **平滑过渡** - 所有动画都使用 Tailwind CSS 过渡

## 注意事项

- 首次运行 `npm run dev` 或 `npm run build` 时，脚本会自动创建 `src/app/sitemap` 目录
- 如果手动删除该目录，重新运行上述命令会自动重建
- Sitemap 页面使用客户端组件 (`use client`)，确保交互功能正常工作
