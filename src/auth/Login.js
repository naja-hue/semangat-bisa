import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { FaUser, FaLock } from 'react-icons/fa'; // Import ikon dari react-icons
import '../Css/Login.css'; // Pastikan file CSS kamu ada
import Navbar from '../components/Navbar';

const Login = ({ handleLoginLogout }) => {
  const [email, setEmail] = useState(''); // Menggunakan 'email' sebagai state
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Deklarasi navigate

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Pastikan email dan password diisi
    if (!email || !password) {
      setError('Silakan isi email dan password.');
      return;
    }
    setError('');

    try {
      // Kirim request login ke backend dengan email
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Menggunakan 'email' bukannya 'username'
      });

      if (response.ok) {
        const data = await response.json();
        const { token, adminData } = data; // Misalnya, data yang diterima berisi token dan adminData

        // Simpan token dan data admin yang diterima dari server
        localStorage.setItem('authToken', token);
        localStorage.setItem('adminData', JSON.stringify(adminData));

        // Redirect ke halaman produk
        navigate('/product-list');
      } else {
        const errorData = await response.text();
        setError(errorData || 'Login gagal');
      }
    } catch (error) {
      setError('Terjadi kesalahan saat login.');
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
              type="email" // Pastikan input type adalah 'email'
              value={email} // Bind the 'email' state to input
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Masukkan email"
              autoComplete="off" // Menonaktifkan fitur autocomplete pada input email
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
          <a href="/register" className="text-primary">
            Daftar di sini
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
