import { getSortedPostsData } from '@/lib/posts';
import { getTags } from '@/lib/tags';
import HomeClient from './HomeClient';

export default function Home() {
  const allPosts = getSortedPostsData();
  const tags = getTags();
  return <HomeClient allPosts={allPosts} tags={tags} />;
}