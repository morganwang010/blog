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

  // 获取特色文章（假设前3篇为特色文章）
  const featuredPosts = posts.slice(0, 3);

  return (
    <div className="page-container">
      {/* 顶部导航栏 */}
      <header className="site-header">
        <div className="container header-content">
          <div className="logo-container">
            <Link to="/" className="logo">
              <h1>我的博客</h1>
            </Link>
          </div>
          <nav className="main-navigation">
            <ul className="nav-menu">
              <li><Link to="/">首页</Link></li>
              <li><Link to="/categories/programming">编程</Link></li>
              <li><Link to="/categories/ai">AI & 机器学习</Link></li>
              <li><Link to="/categories/web">Web开发</Link></li>
              <li><Link to="/about">关于</Link></li>
            </ul>
          </nav>
          <div className="mobile-menu-toggle">
            <button className="menu-toggle-btn">
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </button>
          </div>
        </div>
      </header>

      <main className="site-main">
        <div className="container">
          {/* 特色文章区域 */}
          <section className="featured-posts">
            <h2 className="section-title">特色文章</h2>
            <div className="featured-posts-container">
              {featuredPosts.map((post) => (
                <article key={post.id} className="featured-post">
                  <div className="featured-post-content">
                    <div className="post-meta">
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                      {post.tags && post.tags.length > 0 && (
                        <span className="tag">{post.tags[0]}</span>
                      )}
                    </div>
                    <h3 className="post-title">
                      <Link to={`/posts/${post.id}`}>{post.title}</Link>
                    </h3>
                    <p className="post-description">{post.description}</p>
                    <Link to={`/posts/${post.id}`} className="read-more">阅读全文</Link>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* 搜索区域 */}
          <section className="search-section">
            <div className="search-container">
              <input
                type="text"
                placeholder="搜索博客文章..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </section>

          {/* 最新文章区域 */}
          <section className="latest-posts">
            <h2 className="section-title">{searchQuery ? `搜索结果: ${searchQuery}` : '最新博客文章'}</h2>
            <div className="posts-list">
              {filteredPosts.length === 0 ? (
                <p className="no-posts">没有找到匹配的文章</p>
              ) : (
                <div className="post-grid">
                  {filteredPosts.map((post) => (
                    <article key={post.id} className="post-card">
                      <div className="post-card-content">
                        <div className="post-meta">
                          <time dateTime={post.date}>{formatDate(post.date)}</time>
                          {post.tags && post.tags.length > 0 && (
                            <span className="tag">{post.tags[0]}</span>
                          )}
                        </div>
                        <h3 className="post-title">
                          <Link to={`/posts/${post.id}`}>{post.title}</Link>
                        </h3>
                        <p className="post-description">{post.description}</p>
                        <div className="post-footer">
                          <Link to={`/posts/${post.id}`} className="read-more">阅读全文 →</Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="site-footer">
        <div className="container footer-content">
          <div className="footer-logo">
            <Link to="/" className="logo">我的博客</Link>
          </div>
          <div className="footer-nav">
            <ul className="footer-menu">
              <li><Link to="/">首页</Link></li>
              <li><Link to="/categories/programming">编程</Link></li>
              <li><Link to="/categories/ai">AI & 机器学习</Link></li>
              <li><Link to="/categories/web">Web开发</Link></li>
              <li><Link to="/about">关于</Link></li>
            </ul>
          </div>
          <div className="footer-copyright">
            <p>&copy; {new Date().getFullYear()} 我的博客. 保留所有权利.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;