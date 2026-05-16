import { getSortedPostsData, countWords, calculateReadingTime } from '@/lib/posts';
import { getTags } from '@/lib/tags';
import HomeClient from './HomeClient';

export default function Home() {
  const allPosts = getSortedPostsData();
  const tags = getTags();
  
  const postsWithStats = allPosts.map(post => ({
    ...post,
    wordCount: countWords(post.content),
    readingTime: calculateReadingTime(countWords(post.content)),
  }));
  
  return <HomeClient allPosts={postsWithStats} tags={tags} />;
}