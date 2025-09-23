import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

export default function Login({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const APP_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`${APP_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include', 
      });

      const data = await res.json();

      if (data.success) {
        if (setUser) setUser(data.user);
        navigate('/');
        alert(`Welcome back ${username}`);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      setError('Login request failed');
    }
  };

  return (
    <>
      <h1 className='text-3xl mt-5'>Log Into Your Account</h1>
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="error">{error}</p>}

          <button className="btn" type="submit">
            Login
          </button>
        </form>
      </div>
    </>
  );
}
