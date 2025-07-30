import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Fuse from 'fuse.js';
import { getSortedPostsData } from '../utils/posts';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [fuse, setFuse] = useState(null);

  // 初始化加载所有文章并设置Fuse搜索
  useEffect(() => {
    const allPosts = getSortedPostsData();
    setPosts(allPosts);
    setFilteredPosts(allPosts);

    // 配置Fuse搜索选项
    const options = {
      keys: ['title', 'description', 'content'],
      includeScore: true,
      threshold: 0.4,
    };
    setFuse(new Fuse(allPosts, options));
  }, []);

  // 处理搜索查询变化
  useEffect(() => {
    if (!fuse) return;

    if (searchQuery.trim() === '') {
      setFilteredPosts(posts);
    } else {
      const results = fuse.search(searchQuery);
      setFilteredPosts(results.map(result => result.item));
    }
  }, [searchQuery, fuse, posts]);

  // 格式化日期显示
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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
            <div className="search-container">
              <input
                type="text"
                placeholder="搜索博客文章..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="posts-list">
              <h2>{searchQuery ? `搜索结果: ${searchQuery}` : '最新博客文章'}</h2>

              {filteredPosts.length === 0 ? (
                <p className="no-posts">没有找到匹配的文章</p>
              ) : (
                <ul className="post-items">
                  {filteredPosts.map((post) => (
                    <li key={post.id} className="post-item">
                      <Link to={`/posts/${post.id}`} className="post-link">
                        <h3 className="post-title">{post.title}</h3>
                      </Link>
                      <div className="post-meta">
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                        <span className="reading-time">· {post.readingTime} 分钟阅读</span>
                        {post.tags && post.tags.length > 0 && (
                          <div className="post-tags">
                            {post.tags.map(tag => (
                              <span key={tag} className="tag">{tag}</span>
                            ))}
                          </div>
                        )}
                      </div>
                      <p className="post-description">{post.description}</p>
                      <Link
                        to={`/posts/${post.id}`}
                        className="read-more-link"
                      >
                        阅读全文 →
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
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
        <footer className="site-footer">
          <div className="footer-content">
            <p>&copy; {new Date().getFullYear()} 我的博客. 保留所有权利.</p>
          </div>
        </footer>
      </div>
    );
  };

export default Home;