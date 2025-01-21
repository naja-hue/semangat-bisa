import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2
import "../Css/AddProduct.css";
import { API_PRODUCTS } from "../utils/BaseUrl";

export const uploadImageToS3 = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("https://s3.lynk2.co/api/s3/profile", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Gagal mengupload gambar ke S3");
    }

    const data = await response.json();
    if (data.data && data.data.url_file) {
      console.log("URL gambar berhasil didapat:", data.data.url_file);
      return data.data.url_file;
    } else {
      throw new Error("URL gambar tidak tersedia dalam respons S3");
    }
  } catch (error) {
    console.error("Error upload ke S3:", error);
    throw error;
  }
};

const AddProduct = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);
  const [foto, setFoto] = useState(null); // State untuk gambar produk

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
      let imageUrl = "";

      // Upload gambar produk jika ada
      if (foto) {
        imageUrl = await uploadImageToS3(foto);
      }

      const productDTO = {
        name: name,
        price: parseFloat(price),
        description: description,
        stock: stock,
        imageUrl: imageUrl, // URL gambar produk
      };

      const response = await axios.post(`${API_PRODUCTS}/add/${idAdmin}`, productDTO, {
        headers: {
          "Content-Type": "application/json",
        },
      });

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
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Gagal",
        text: "Terjadi kesalahan saat menambahkan produk.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="addProduct-container">
      <h2>Tambah Produk Baru</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Nama</label>
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
        <div className="input-group">
          <label>Gambar Produk</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFoto(e.target.files[0])} // Untuk gambar produk
          />
        </div>
        <button type="submit" className="submit-btn">Tambah Produk</button>
      </form>
    </div>
  );
};

export default AddProduct;
