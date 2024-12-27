import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faKey,
  faEyeSlash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import "../Css/Register.css";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi form input
    if (username.trim() === "" || email.trim() === "" || password.trim() === "") {
      setErrorMessage("Semua field harus diisi.");
      return;
    }

    if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password)
    ) {
      Swal.fire({
        icon: "error",
        title:
          "Password harus memiliki minimal 8 karakter, satu huruf besar, dan satu huruf kecil.",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    try {
      // Mengirim data ke server menggunakan Axios
      const response = await axios.post("http://localhost:8080/api/user/register", {
        username,
        email,
        password,
      });

      // Menangani respons dari server
      Swal.fire({
        icon: "success",
        title: "Registrasi berhasil!",
        text: `Akun untuk ${response.data.username} berhasil dibuat.`,
        showConfirmButton: true,
      });

      // Redirect setelah sukses
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      console.error("Error during registration:", error);
      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        Swal.fire({
          icon: "error",
          title: "Terjadi kesalahan saat registrasi.",
          text: "Coba lagi nanti.",
          showConfirmButton: true,
        });
      }
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="card-title">Register</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          {/* Username Field */}
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <div className="input-group">
              <span className="input-group-text"><FontAwesomeIcon icon={faUser} /></span>
              <input
                type="text"
                id="username"
                className="form-control"
                placeholder="Username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <div className="input-group">
              <span className="input-group-text"><FontAwesomeIcon icon={faUser} /></span>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-group">
              <span className="input-group-text"><FontAwesomeIcon icon={faKey} /></span>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="form-control"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={togglePasswordVisibility}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100 mb-3">Register</button>

          <p className="text-center">
            Sudah punya akun?{" "}
            <a href="/login" className="text-primary">Masuk</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
