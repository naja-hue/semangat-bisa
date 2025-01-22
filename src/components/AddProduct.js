import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "../Css/AddProduct.css";
import { API_PRODUCTS } from "../utils/BaseUrl";

const AddProduct = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);
  const [foto, setFoto] = useState(null);

  const adminData = JSON.parse(localStorage.getItem("adminData"));
  const idAdmin = adminData ? adminData.id : null;

  if (!idAdmin) {
    Swal.fire({
      title: "Gagal",
      text: "Admin ID tidak ditemukan. Pastikan Anda sudah login.",
      icon: "error",
      confirmButtonText: "OK",
    });
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // Tambahkan data produk ke FormData
      const productData = JSON.stringify({
        name,
        price: parseFloat(price),
        description,
        stock,
      });
      formData.append("product", productData);

      if (foto) {
        formData.append("file", foto);
      }

      // Kirim data ke backend
      const response = await axios.post(`${API_PRODUCTS}/add/${idAdmin}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Respons dari server:", response);

      if (response.status === 201) {
        Swal.fire({
          title: "Berhasil",
          text: "Produk berhasil ditambahkan!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          setName("");
          setPrice("");
          setDescription("");
          setStock(0);
          setFoto(null);

          navigate("/product-list");
        });
      } else {
        throw new Error("Status respons tidak sesuai.");
      }
    } catch (error) {
      console.error("Error:", error);

      // Tampilkan SweetAlert jika terjadi kesalahan
      if (error.response) {
        Swal.fire({
          title: "Gagal",
          text: `Terjadi kesalahan: ${error.response.data.message || "Respons server tidak valid."}`,
          icon: "error",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Gagal",
          text: "Tidak dapat terhubung ke server. Silakan coba lagi.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  return (
    <div className="add-product-container">
      <h2 className="add-product-title">Tambah Produk Baru</h2>
      <form onSubmit={handleSubmit} className="add-product-form">
        <div className="add-product-input-group">
          <label className="add-product-input-label">Nama</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="add-product-input-field"
            required
          />
        </div>
        <div className="add-product-input-group">
          <label className="add-product-input-label">Harga Produk</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="add-product-input-field"
            required
          />
        </div>
        <div className="add-product-input-group">
          <label className="add-product-input-label">Deskripsi</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="add-product-input-field"
            required
          />
        </div>
        <div className="add-product-input-group">
          <label className="add-product-input-label">Stok</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            className="add-product-input-field"
            required
          />
        </div>
        <div className="add-product-input-group">
          <label className="add-product-input-label">Gambar Produk</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFoto(e.target.files[0])}
            className="add-product-input-file"
          />
        </div>
        <button type="submit" className="add-product-submit-btn">Tambah Produk</button>
      </form>
    </div>
  );
};

export default AddProduct;
