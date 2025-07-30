import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { getSortedPostsData, getPostData, getAllPostIds } from '../utils/posts';

const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);

  // 格式化日期显示
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  useEffect(() => {
    const allPosts = getSortedPostsData();
    setPosts(allPosts);
  }, []);

  useEffect(() => {
    try {
      // 验证post id是否存在
      const allPostIds = getAllPostIds();
      const postExists = allPostIds.some(post => post.params.id === id);

      if (!postExists) {
        setError('文章不存在');
        setLoading(false);
        return;
      }

      // 获取文章数据
      const postData = getPostData(id);
      setPost(postData);
      setLoading(false);
    } catch (err) {
      setError('加载文章失败');
      setLoading(false);
      console.error('Error loading post:', err);
    }
  }, [id]);

  if (loading) {
    return <div className="post-loading">加载中...</div>;
  }

  if (error) {
    return (
      <div className="post-error">
        <h2>{error}</h2>
        <button onClick={() => navigate('/')} className="back-button">返回首页</button>
      </div>
    );
  }

  return (
    <div className="page-container">
    
      <div className="home-container">
        <div className="left-column">
          <nav className="left-menu">
            <ul>
              <li><Link to="/">首页</Link></li>
              <li><Link to="/archive">文章归档</Link></li>
              <li><Link to="/categories">分类</Link></li>
              <li><Link to="/tags">标签</Link></li>
              <li><Link to="/about">关于我</Link></li>
            </ul>
          </nav>
        </div>
        <div className="main-content">
          <article className="blog-post">
            <header className="post-header">
              <h1 className="post-title">{post.title}</h1>
              <div className="post-meta">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </div>
            </header>

            <div className="post-content">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>

            <div className="post-navigation">
              <button onClick={() => navigate('/')} className="back-link">返回文章列表</button>
            </div>
          </article>
        </div>
        <div className="right-column">
          <aside className="sidebar">
            <div className="tag-cloud">
              <h3>文章标签</h3>
              <div className="tags">
                {Array.from(new Set(posts.flatMap(post => post.tags || []))).map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    
    </div>
  );
};

export default Post;