import React, { useState } from "react";
import { useParams } from "react-router-dom";  // Untuk mendapatkan idAdmin dari URL
import "../Css/AddProduct.css";

const AddProduct = () => {
  const { idAdmin } = useParams();  // Mengambil idAdmin dari URL
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(""); 
  const [stock, setStock] = useState(0);  

  const handleSubmit = (e) => {
    e.preventDefault();

    // Membuat objek produk dalam format JSON
    const productDTO = {
      name: name,
      price: price,
      description: description,
      stock: stock,
    };

    // Mengirimkan data produk ke backend
    fetch(`http://localhost:8080/api/products/add/${idAdmin}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Menentukan tipe data yang dikirim
      },
      body: JSON.stringify(productDTO),  // Mengirim data dalam format JSON
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Terjadi kesalahan saat menambahkan produk.");
        }
        return response.json();
      })
      .then((data) => {
        alert("Produk berhasil ditambahkan!");
        setName("");  
        setPrice("");  
        setDescription("");  
        setStock(0);  
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Terjadi kesalahan saat menambahkan produk.");
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
            type="text"
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
