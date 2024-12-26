import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import { FaUser, FaLock } from 'react-icons/fa';  // Import ikon dari react-icons
import './Login.css';  // Pastikan file CSS kamu ada
import Navbar from '../components/Navbar';

const Login = ({ handleLoginLogout }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Deklarasi navigate

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!username || !password) {
      setError('Silakan isi username dan password.');
      return;
    }
    setError('');
    handleLoginLogout(); // Panggil fungsi handleLoginLogout untuk set status login
    navigate('/product-list');  // Navigasi otomatis ke halaman produk setelah login berhasil
  };

  return (
    <div className="login-container">
      <Navbar />
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          <div className="input-container">
            <FaUser className="input-icon" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Masukkan username"
            />
          </div>
          <div className="input-container">
            <FaLock className="input-icon" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Masukkan password"
            />
          </div>
          <button type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
