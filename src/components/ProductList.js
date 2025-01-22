import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Css/ProductList.css";
import { Link } from "react-router-dom";
import { API_PRODUCTS } from "../utils/BaseUrl";
import Swal from "sweetalert2"; // Impor SweetAlert2

const ProductList = ({ isLoggedIn }) => {
  const [products, setProducts] = useState([]);

  // Mengambil idAdmin dari localStorage setelah login
  const adminData = JSON.parse(localStorage.getItem("adminData"));
  const idAdmin = adminData ? adminData.id : null;

  useEffect(() => {
    console.log("isLoggedIn:", isLoggedIn);
    console.log("idAdmin:", idAdmin);

    // Pastikan idAdmin ada sebelum melakukan fetch
    if (idAdmin) {
      axios.get(`${API_PRODUCTS}/getAllByAdmin/${idAdmin}`)
        .then((response) => {
          console.log("Data yang diterima:", response.data);
          if (Array.isArray(response.data)) {
            setProducts(response.data);
          } else {
            console.error("Data yang diterima tidak sesuai:", response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    } else {
      console.error("idAdmin tidak ditemukan di localStorage.");
    }
  }, [idAdmin, isLoggedIn]);

  const deleteProduct = (productId) => {
    // Menampilkan konfirmasi menggunakan SweetAlert
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Produk ini tidak dapat dikembalikan setelah dihapus!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Tidak, batalkan!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Melakukan penghapusan jika dikonfirmasi
        axios.delete(`${API_PRODUCTS}/delete/${productId}`)
          .then(() => {
            setProducts(products.filter((product) => product.id !== productId));
            Swal.fire("Dihapus!", "Produk telah dihapus.", "success");
          })
          .catch((error) => {
            console.error("Error deleting product:", error);
            Swal.fire("Error!", "Terjadi masalah saat menghapus produk.", "error");
          });
      } else {
        Swal.fire("Dibatalkan", "Produk tidak jadi dihapus.", "info");
      }
    });
  };

  return (
    <div className="product-list-container">
      <h2 className="dft">Daftar Produk</h2>
      <table className="product-list-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Gambar</th>
            <th>Nama Produk</th>
            <th>Harga</th>
            <th>Deskripsi</th>
            <th>Stok</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>
                {product.imageURL ? (
                  <img src={product.imageURL} alt={product.name} style={{ width: '190px', height: '160px', objectFit: 'cover' }} />
                ) : (
                  <span>Tidak Ada Foto</span>
                )}
              </td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td>{product.stock}</td>
              <td>
                <Link to={`/edit-product/${product.id}`}>
                  <button className="edit-btn">Edit</button>
                </Link>
                <button
                  className="delete-btn"
                  onClick={() => deleteProduct(product.id)}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link to="/add-product">
        <button className="add-product-btn">+</button>
      </Link>
    </div>
  );
};

export default ProductList;
