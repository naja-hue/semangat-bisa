import React from "react";
import Navbar from "./Navbar";  // Navbar yang akan menyesuaikan dengan status login
import "../Css/Home.css";  // Styling untuk Home
import Beri from '../images/beri.png';  // Mengimpor gambar dari src/img
import Jeruk from '../images/jeruk.png';
import Pisang from "../images/pisang.png";
import Mangga from '../images/mg.png';
import Apel from '../images/apel.png';
import Anggur from '../images/anggur.png';
import Alpukat from '../images/alp.png';
import Melon from '../images/melon.png';
import Nanas from '../images/nanas.png';
import Semangka from '../images/smk.png';
import Pir from '../images/pir.png';
import Leci from '../images/leci.png';

// Import SweetAlert2
import Swal from 'sweetalert2';

const Home = ({ isLoggedIn, handleLoginLogout }) => {
  const products = [
    { id: 1, name: "Stroberi", img: Beri, price: "Rp 200.000" },
    { id: 2, name: "Jeruk", img: Jeruk, price: "Rp 150.000" },
    { id: 3, name: "Pisang", img: Pisang, price: "Rp 150.000" },
    { id: 4, name: "Mangga", img: Mangga, price: "Rp 555.000" },
    { id: 5, name: "Apel", img: Apel, price: "Rp 255.000" },
    { id: 6, name: "Anggur", img: Anggur, price: "Rp 255.000" },
    { id: 7, name: "Alpukat", img: Alpukat, price: "Rp 255.000" },
    { id: 8, name: "Melon", img: Melon, price: "Rp 105.000" },
    { id: 9, name: "Nanas", img: Nanas, price: "Rp 290.000" },
    { id: 10, name: "Semangka", img: Semangka, price: "Rp 250.000" },
    { id: 11, name: "Pir", img: Pir, price: "Rp 275.000" },
    { id: 12, name: "Leci", img: Leci, price: "Rp 195.000" },
  ];

  // Fungsi untuk menangani klik tombol "Beli Sekarang"
  const handleBuyNow = (productName) => {
    Swal.fire({
      title: 'Apakah Anda ingin membeli ' + productName + '?',
      text: "Pastikan produk yang Anda pilih sudah benar.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Ya, beli sekarang!',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        // Arahkan ke halaman pembelian atau lakukan aksi lain
        Swal.fire(
          'Terima Kasih!',
          'Produk telah dibeli.',
          'success'
        );
      }
    });
  };

  return (
    <div className="home-container">
      {/* Navbar yang berubah sesuai status login */}
      <Navbar isLoggedIn={isLoggedIn} handleLoginLogout={handleLoginLogout} />
      
      <div className="main-content">
        <h1 className="welcome-message">Selamat Datang di FruitStore</h1>
        <p className="intro-text">Temukan berbagai macam buah segar dengan harga terbaik!</p>

        {/* Display produk dengan tombol beli */}
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.img} alt={product.name} className="product-image" />
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">{product.price}</p>
              <button
                className="buy"
                onClick={() => handleBuyNow(product.name)} // Memanggil fungsi untuk membeli
              >
                Beli Sekarang
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
