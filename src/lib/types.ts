export interface PostFrontmatter {
  title: string;
  date: string;
  description: string;
  tags: string[];
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
}