import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import '../Css/Login.css';
import Navbar from '../components/Navbar';
import axios from 'axios'; // Import axios
import { API_LOGIN } from '../utils/BaseUrl';

const Login = ({ handleLoginLogout }) => {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError('Silakan isi email dan password.');
      return;
    }
    setError('');

    try {
      // Kirim request login ke backend dengan email
      const response = await axios.post(`${API_LOGIN}`, {
        email, 
        password,
      });

      const { token, adminData } = response.data;

      // Simpan token dan data admin yang diterima dari server
      localStorage.setItem('authToken', token);
      localStorage.setItem('adminData', JSON.stringify(adminData));
      localStorage.setItem("adminId", adminData.id);

      // Redirect ke halaman produk
      navigate('/product-list');
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'Login gagal');
      } else {
        setError('Terjadi kesalahan saat login.');
      }
    }
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
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Masukkan email"
              autoComplete="off"
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
          <button type="submit">Login</button>
        </form>
        <p className="register-link">
          Belum punya akun?{' '}
          <Link to="/register" className="text-primary">
            Daftar di sini
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
