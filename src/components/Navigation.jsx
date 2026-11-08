import { Link, useLocation } from 'react-router-dom';
import { useArticles } from '../context/ArticlesContext';
import { useAuth } from '../context/AuthContext';

function Navigation() {
  const location = useLocation();
  const { getUserSavedArticles } = useArticles();
  const { user, logout, isAuthenticated, isAdmin } = useAuth();

  return (
    <nav>
      <div className="nav-user" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <h1 className="nav-brand">NewsReader</h1>
          <div className="nav-links">
            <Link
              to="/"
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link
              to="/search"
              className={`nav-link ${location.pathname === '/search' ? 'active' : ''}`}
            >
              Search
            </Link>
            <Link
              to="/saved"
              className={`nav-link ${location.pathname === '/saved' ? 'active' : ''}`}
            >
              Saved Articles ({getUserSavedArticles().length})
            </Link>
            {isAdmin() && (
              <Link
                to="/admin"
                className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`}
              >
                Admin
              </Link>
            )}
          </div>
        </div>
        <div className="nav-user">
          {isAuthenticated ? (
            <>
              <span style={{ marginRight: '16px' }}>{user.username}</span>
              <button className="btn btn-primary" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="nav-link">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;