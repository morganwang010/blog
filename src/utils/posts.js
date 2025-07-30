import matter from 'gray-matter';

// 使用Vite的import.meta.glob动态导入所有markdown文件作为原始文本
const posts = import.meta.glob('../posts/*.md', { eager: true, as: 'raw' });

// 计算阅读时长（假设每分钟阅读250字）
const calculateReadingTime = (content) => {
  const wordsPerMinute = 250;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

export function getSortedPostsData() {
  const allPostsData = Object.entries(posts)
    .map(([path, content]) => {
      // 从路径中提取文件名作为id
      const id = path.split('/').pop().replace(/\.md$/, '');

      // 使用gray-matter解析post的metadata部分
      const matterResult = matter(content);

      // 计算阅读时长
      const readingTime = calculateReadingTime(matterResult.content);

      // 合并数据与id
      return {
        id,
        ...matterResult.data,
        tags: matterResult.data.tags || [], // 提取标签，默认为空数组
        content: matterResult.content,
        readingTime // 添加阅读时长
      };
    });
  // 按日期排序（最新的在前）
  return allPostsData.sort((a, b) => {
    if (new Date(a.date) < new Date(b.date)) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  return Object.keys(posts)
    .filter(path => path.endsWith('.md'))
    .map(path => {
      const id = path.split('/').pop().replace(/\.md$/, '');
      return {
        params: {
          id,
        },
      };
    });
}

export function getPostData(id) {
  const path = `../posts/${id}.md`;
  const content = posts[path];
  if (!content) {
    throw new Error(`Post with id ${id} not found`);
  }

  const matterResult = matter(content);
  const readingTime = calculateReadingTime(matterResult.content);

// 合并数据与id
  return {
    id,
    ...matterResult.data,
    tags: matterResult.data.tags || [], // 提取标签，默认为空数组
    content: matterResult.content,
    readingTime
  }
}