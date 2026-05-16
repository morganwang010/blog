import { getSortedPostsData } from '@/lib/posts';
import type { Post } from '@/lib/types';

export function getTags(): string[] {
  const posts = getSortedPostsData();
  const tagsSet = new Set<string>();
  posts.forEach((post) => {
    post.frontmatter.tags.forEach((tag) => tagsSet.add(tag));
  });
  return Array.from(tagsSet).sort();
}

export function getPostsByTag(tag: string): Post[] {
  const posts = getSortedPostsData();
  return posts.filter((post) => post.frontmatter.tags.includes(tag));
}