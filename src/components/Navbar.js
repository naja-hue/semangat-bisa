import React from "react";
import { NavLink } from "react-router-dom"; // Import NavLink
import '../Css/Navbar.css'; // Pastikan file CSS diimpor

const Navbar = ({ isLoggedIn, handleLoginLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <h1 className="logo">FruitStore</h1>
        
        <ul className="nav-links">
          {/* Link Home hanya muncul jika belum login */}
          {!isLoggedIn && (
            <li>
              <NavLink to="/" exact activeclassname="active">
                Home
              </NavLink>
            </li>
          )}
          
          {/* Link Produk dan Logout hanya muncul jika sudah login */}
          {isLoggedIn ? (
            <>
              <li>
                <NavLink to="/product-list" activeclassname="active">
                  Produk
                </NavLink>
              </li>
              <li>
                <button className="logout-btn" onClick={handleLoginLogout}>Logout</button>
              </li>
            </>
          ) : (
            <li>
              <NavLink to="/login" className="login-btn" activeclassname="active">
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
