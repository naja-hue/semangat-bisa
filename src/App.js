import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'; // Jangan import BrowserRouter di sini lagi
import Home from './components/Home';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import Login from './auth/Login';
import Navbar from './components/Navbar';
import PrivateRoute from './private/PrivateRoute';
import Register from './auth/Register';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true); // Jika token ada, anggap pengguna sudah login
    }
  }, []);

  const navigate = useNavigate();

  const handleLoginLogout = () => {
    setIsLoggedIn(!isLoggedIn);
    if (isLoggedIn) {
      localStorage.removeItem('authToken');
      navigate('/'); // Menggunakan navigate untuk redirect setelah logout
    } else {
      localStorage.setItem('authToken', 'yourToken');
    }
  };

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} handleLoginLogout={handleLoginLogout} />
      <Routes>
        {/* Rute untuk halaman Home jika belum login */}
        {!isLoggedIn && <Route path="/" element={<Home />} />}
        
        {/* Rute untuk halaman Login */}
        <Route path="/login" element={<Login handleLoginLogout={handleLoginLogout} />} />

        {/* Rute untuk halaman Daftar Produk hanya bisa diakses jika sudah login */}
        {isLoggedIn && (
          <>
            <Route path="/product-list" element={<PrivateRoute element={<ProductList />} />} />
            <Route path="/add-product" element={<PrivateRoute element={<AddProduct />} />} />
            <Route path="/edit-product/:id" element={<PrivateRoute element={<EditProduct />} />} />
            <Route path="/register" element={<Register />} />
          </>
        )}

        
      </Routes>
    </>
  );
}

export default App;
