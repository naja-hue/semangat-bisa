import React, { useState, useEffect } from "react";
import "../Css/ProductList.css"; // Pastikan file ini ada dan diimport dengan benar
import { Link } from "react-router-dom"; // Pastikan kamu sudah mengimpor Link

const ProductList = ({ isLoggedIn }) => {
  const [products, setProducts] = useState([]);

  // Mengambil idAdmin dari localStorage setelah login
  const adminData = JSON.parse(localStorage.getItem("adminData"));
  const idAdmin = adminData ? adminData.id : null; // Ambil idAdmin dari localStorage

  useEffect(() => {
    console.log('isLoggedIn:', isLoggedIn); // Debugging nilai isLoggedIn
    console.log('idAdmin:', idAdmin); // Debugging nilai idAdmin

    // Pastikan idAdmin ada sebelum melakukan fetch
    if (idAdmin) {
      fetch(`http://localhost:8080/api/products/getAllByAdmin/${idAdmin}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Data yang diterima:", data); // Log data produk
          // Jika data adalah array, set produk
          if (Array.isArray(data)) {
            setProducts(data);
          } else {
            console.error("Data yang diterima tidak sesuai:", data);
          }
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    } else {
      console.error("idAdmin tidak ditemukan di localStorage.");
    }
  }, [idAdmin, isLoggedIn]); // Menambahkan isLoggedIn ke array dependency

  const deleteProduct = (productId) => {
    fetch(`http://localhost:8080/api/products/delete/${productId}`, {
      method: "DELETE",
    })
      .then(() => {
        setProducts(products.filter((product) => product.id !== productId));
      })
      .catch((error) => console.error("Error deleting product:", error));
  };

  return (
    <div className="product-list-container">
      <h2 className="dft">Daftar Produk</h2>
      <table className="product-list-table">
        <thead>
          <tr>
            <th>No</th> {/* Kolom nomor urut */}
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
              <td>{index + 1}</td> {/* Menampilkan nomor urut berdasarkan index */}
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

      {/* Navigasi ke halaman AddProduct */}
      <Link to="/add-product">
        <button className="add-product-btn">+</button>
      </Link>
    </div>
  );
};

export default ProductList;
