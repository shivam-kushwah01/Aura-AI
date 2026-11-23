import './navbar.css'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const NAV_LINKS = [
  { to: '/features', label: 'Features' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/faq', label: 'FAQ' },
];

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const APP_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${APP_URL}/auth/me`, {
      credentials: 'include'
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      })
      .catch(() => setUser(null));
  }, [APP_URL]);

  const handleLogout = async () => {
    try {
      const res = await fetch(`${APP_URL}/auth/logout`, {
        method: 'GET',
        credentials: 'include'
      });
      const data = await res.json();
      console.log(data.message);
      setUser(null);
      navigate('/');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="nav-wrapper">
      <nav className="nav glass" aria-label="Main navigation">
        <Link to="/" className="brand" onClick={closeMenu}>
          <img src="/assets/Aura.svg" alt="" className="logo" />
          <span className="name">Aura AI</span>
        </Link>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                onClick={closeMenu}
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              >
                {link.label}
              </NavLink>
            </li>
          ))}

          <li className="nav-auth">
            {user ? (
              <>
                <span className="welcome">
                  <i className="ri-user-smile-line" aria-hidden="true"></i> Hi, {user.username}
                </span>
                <button className="btn-ghost nav-btn logout" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/auth/login" className="btn-ghost nav-btn" onClick={closeMenu}>
                  Login
                </Link>
                <Link to="/auth/signup" className="btn-primary nav-btn" onClick={closeMenu}>
                  Sign Up
                </Link>
              </>
            )}
          </li>
        </ul>

        <button
          className="menu-toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <i className={menuOpen ? 'ri-close-line' : 'ri-menu-line'} aria-hidden="true"></i>
        </button>
      </nav>
    </header>
  );
}
