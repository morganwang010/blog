import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Post from './pages/Post';
import './App.css';

function App() {
  return (
    <div className="app-container">
            <header className="site-header">
          <div className="header-content">
            <h1 className="site-title"><Link to="/">我的博客</Link></h1>
            <nav className="main-nav">
              <ul>
                <li><Link to="/">首页</Link></li>
                <li><Link to="/about">关于</Link></li>
                <li><Link to="/contact">联系</Link></li>
              </ul>
            </nav>
          </div>
        </header>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<Post />} />
        </Routes>
      </main>
    <footer className="site-footer">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} 我的博客. 保留所有权利.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
