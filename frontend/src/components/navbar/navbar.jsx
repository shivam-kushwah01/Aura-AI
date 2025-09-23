import './navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [user, setUser] = useState(null); 
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
  }, []);

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

  return (
    <div className="nav m-2">
      <div className="innerDiv">
        <div className="logo"></div>
        <div className="name">
          <h2>Aura AI</h2>
        </div>
      </div>

      <div className="innerDiv">
        {user ? (
          <>
            <span className="welcome">Welcome, {user.username}</span>
            <button className="btn logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/auth/signup">
              <button className="sign-up btn">Sign Up</button>
            </Link>
            <Link to="/auth/login">
              <button className="login btn">Login</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
