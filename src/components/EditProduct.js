import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../Css/EditProduct.css'; // Jangan lupa pastikan ada file CSS-nya

const EditProduct = () => {
  const { id } = useParams(); // Ambil id dari URL
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  useEffect(() => {
    // Ambil data produk berdasarkan id, misalnya dari API
    fetch(`http://localhost:8080/api/products/${id}`)
      .then(response => response.json())
      .then(data => {
        setProduct(data);
        setName(data.name);
        setPrice(data.price);
        setStock(data.stock);
      })
      .catch(error => console.error(error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const productDTO = {
      name,
      price,
      stock,
    };

    // Mengirimkan data produk yang telah diperbarui ke API
    const idAdmin = 1; // Anda bisa menyesuaikan cara mendapatkan idAdmin sesuai kebutuhan

    fetch(`http://localhost:8080/api/products/edit/${id}/${idAdmin}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productDTO),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Gagal memperbarui produk');
        }
        return response.json();
      })
      .then((data) => {
        alert('Produk berhasil diperbarui!');
        navigate('/product-list/1'); // Navigasi setelah update
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat memperbarui produk.');
      });
  };

  if (!product) {
    return <p>Loading...</p>; // Tampilkan loading jika data belum ada
  }

  return (
    <div className="edit-product-container">
      <h2>Edit Produk</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nama Produk</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Harga Produk</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Stok Produk</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>
        <button type="submit">Perbarui Produk</button>
      </form>
    </div>
  );
};

export default EditProduct;
