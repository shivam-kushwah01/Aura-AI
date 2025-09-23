import './signup.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Signup({ setUser }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const APP_URL = import.meta.env.VITE_API_URL;

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const res = await fetch(`${APP_URL}/auth/signup`, {
        method: 'POST',
        credentials: 'include', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password }),
      });

      if (!res.ok) {
        throw new Error('Signup failed');
      }

      const data = await res.json();
      console.log('Signup successful:', data);
      navigate('/');
      alert(`Welcome ${username}`);
    } catch (err) {
      console.error(err);
      alert(`Error signing up : ${err.message}`);
    }
  };

  return (
    <>
      <h1 className='text-3xl mt-5'>Get Started with Aura AI</h1>
      <div className="signup-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
}
