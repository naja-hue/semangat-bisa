import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home"; // Halaman Home
import ProductList from "./components/ProductList"; // Halaman Product List
import AddProduct from "./components/AddProduct"; // Halaman tambah produk
import EditProduct from "./components/EditProduct"; // Halaman edit produk
import Login from "./auth/Login"; // Halaman Login
import Navbar from "./components/Navbar"; // Navbar yang sudah diubah

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Fungsi untuk menangani login/logout
  const handleLoginLogout = () => {
    setIsLoggedIn(!isLoggedIn);  // Toggle status login
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} handleLoginLogout={handleLoginLogout} />
      <Routes>
        {/* Rute untuk halaman Home */}
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />

        {/* Rute untuk halaman Login */}
        <Route path="/login" element={<Login handleLoginLogout={handleLoginLogout} />} />

        {/* Rute untuk halaman Daftar Produk yang hanya bisa diakses jika sudah login */}
        {isLoggedIn ? (
          <>
            <Route path="/product-list" element={<ProductList isLoggedIn={isLoggedIn} />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/edit-product/:id" element={<EditProduct />} />
          </>
        ) : (
          <Route path="*" element={<Home isLoggedIn={isLoggedIn} />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
