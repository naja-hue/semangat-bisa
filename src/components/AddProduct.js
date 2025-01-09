import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2
import "../Css/AddProduct.css";
import { API_PRODUCT } from "../utils/BaseUrl";

const AddProduct = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const productDTO = {
      name: name,
      price: parseFloat(price),
      description: description,
      stock: stock,
    };

    axios
      .post(`${API_PRODUCT}/add/${idAdmin}`, productDTO, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
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

            navigate("/product-list");
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          title: "Gagal",
          text: "Terjadi kesalahan saat menambahkan produk.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <div className="addProduct-container">
      <h2>Tambah Produk Baru</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Nama Produk</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Harga Produk</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Deskripsi</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Stok</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Tambah Produk</button>
      </form>
    </div>
  );
};

export default AddProduct;
