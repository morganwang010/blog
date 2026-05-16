import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import type { Plugin } from 'unified';
import type { Post, PostFrontmatter } from './types';

const postsDirectory = path.join(process.cwd(), 'posts');

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^\x00-\x7f]/g, (c) => {
      const code = c.charCodeAt(0);
      if (code < 0x80) return c;
      const syllables: { [key: string]: string } = {
        '中': 'zhong', '国': 'guo', '人': 'ren', '我': 'wo', '你': 'ni',
        '是': 'shi', '在': 'zai', '有': 'you', '了': 'le', '和': 'he',
        '不': 'bu', '这': 'zhe', '个': 'ge', '们': 'men', '来': 'lai',
        '到': 'dao', '时': 'shi', '说': 'shuo', '要': 'yao', '就': 'jiu',
        '会': 'hui', '能': 'neng', '对': 'dui', '起': 'qi', '好': 'hao',
        '自': 'zi', '己': 'ji', '子': 'zi', '都': 'dou', '去': 'qu',
        '法': 'fa', '如': 'ru', '然': 'ran', '那': 'na',
        '得': 'de', '着': 'zhe', '过': 'guo', '还': 'hai', '发': 'fa',
        '后': 'hou', '天': 'tian', '心': 'xin', '事': 'shi',
        '情': 'qing', '见': 'jian', '意': 'yi', '看': 'kan',
        '没': 'mei', '关': 'guan', '系': 'xi', '把': 'ba', '相': 'xiang',
        '比': 'bi', '所': 'suo',
      };
      const lowerC = c.toLowerCase();
      return syllables[lowerC] || lowerC;
    })
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function countWords(content: string): number {
  const text = content
    .replace(/^---[\s\S]*?---/g, '')
    .replace(/[#*`~\[\]()<>]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  const chineseChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
  const englishWords = text.split(/\s+/).filter(word => word.length > 0).length;
  return chineseChars + englishWords;
}

export function calculateReadingTime(wordCount: number): number {
  const wordsPerMinute = 200;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

export function getSortedPostsData(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      return {
        slug,
        frontmatter: data as PostFrontmatter,
        content,
      };
    });

  return allPostsData.sort((a, b) => {
    if (a.frontmatter.date < b.frontmatter.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostSlugs(): { params: { slug: string } }[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => ({
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    }));
}

const rehypeSlugWithCustomSlug: Plugin = () => {
  return (tree: any) => {
    const visit = (node: any) => {
      if (node.type === 'element' && node.tagName.startsWith('h') && node.tagName.length === 2) {
        let textContent = '';
        const getText = (n: any) => {
          if (n.type === 'text') textContent += n.value;
          if (n.children) n.children.forEach(getText);
        };
        getText(node);
        
        if (textContent) {
          node.properties = node.properties || {};
          node.properties.id = slugify(textContent);
        }
      }
      if (node.children) {
        node.children.forEach(visit);
      }
    };
    visit(tree);
  };
};

export async function getPostData(slug: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlugWithCustomSlug)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content);

  return {
    slug,
    frontmatter: data as PostFrontmatter,
    content: processedContent.toString(),
  };
}

export function extractHeadings(content: string): { id: string; text: string; level: number }[] {
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const headings: { id: string; text: string; level: number }[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = slugify(text);
    headings.push({ id, text, level });
  }

  return headings;
}

export function searchPosts(posts: Post[], query: string): Post[] {
  if (!query.trim()) return posts;
  const lowerQuery = query.toLowerCase();
  return posts.filter((post) => {
    const titleMatch = post.frontmatter.title.toLowerCase().includes(lowerQuery);
    const descMatch = post.frontmatter.description.toLowerCase().includes(lowerQuery);
    const tagsMatch = post.frontmatter.tags && Array.isArray(post.frontmatter.tags) && 
      post.frontmatter.tags.some((tag) => tag.toLowerCase().includes(lowerQuery));
    return titleMatch || descMatch || tagsMatch;
  });
}

export function paginatePosts<T>(items: T[], page: number, pageSize: number): {
  items: T[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
} {
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const validPage = Math.min(Math.max(1, page), totalPages || 1);
  const startIndex = (validPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return {
    items: items.slice(startIndex, endIndex),
    totalPages,
    totalItems,
    currentPage: validPage,
  };
}