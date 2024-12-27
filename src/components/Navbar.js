import React from "react";
import { Link } from "react-router-dom";
import '../Css/Navbar.css'; // Pastikan file CSS diimpor

const Navbar = ({ isLoggedIn, handleLoginLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="logo">FruitStore</Link>
        
        <ul className="nav-links">
          {/* Link Home hanya muncul jika belum login */}
          {!isLoggedIn && (
            <li>
              <Link to="/">Home</Link>
            </li>
          )}
          
          {/* Link Produk dan Logout hanya muncul jika sudah login */}
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/product-list">Produk</Link>
              </li>
              <li>
                <button onClick={handleLoginLogout}>Logout</button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className="login-btn">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
