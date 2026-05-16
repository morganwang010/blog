import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import type { Post, PostFrontmatter } from './types';

const postsDirectory = path.join(process.cwd(), 'posts');

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

export async function getPostData(slug: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = await remark()
    .use(remarkGfm)
    .use(rehypeHighlight)
    .use(remarkHtml)
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
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
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
    const tagsMatch = post.frontmatter.tags.some((tag) => tag.toLowerCase().includes(lowerQuery));
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