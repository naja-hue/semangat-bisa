import React, { useState } from "react";
import "./AddProduct.css";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState(null); 
  const [description, setDescription] = useState(""); 
  const [stock, setStock] = useState(0);  

  const handleImageChange = (e) => {
    setImg(e.target.files[0]);  
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("image", img);  
    formData.append("description", description);
    formData.append("stock", stock);

    fetch("http://localhost:8080/api/products/add", {
      method: "POST",
      body: formData,  
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Produk berhasil ditambahkan!");
        setName("");  
        setPrice("");  
        setImg(null);  
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
          <label>Gambar Produk</label>
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
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

      {/* Menampilkan gambar yang dipilih */}
      {img && <div className="image-preview">
        <img src={URL.createObjectURL(img)} alt="Produk" />
      </div>}
    </div>
  );
};

export default AddProduct;
