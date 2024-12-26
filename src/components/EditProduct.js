import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EditProduct.css'; // Jangan lupa pastikan ada file CSS-nya

const EditProduct = () => {
  const { id } = useParams(); // Ambil id dari URL
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [img, setImg] = useState('');
  
  useEffect(() => {
    // Ambil data produk berdasarkan id, misalnya dari API
    // Misalnya, API fetch seperti ini:
    // fetch(`api/products/${id}`)
    //   .then(response => response.json())
    //   .then(data => {
    //     setProduct(data);
    //     setName(data.name);
    //     setPrice(data.price);
    //     setImg(data.img);
    //   })
    //   .catch(error => console.error(error));

    // Untuk sementara menggunakan data dummy
    const productData = {
      name: 'Produk A',
      price: '100000',
      img: 'https://example.com/image.jpg',
    };

    setProduct(productData);
    setName(productData.name);
    setPrice(productData.price);
    setImg(productData.img);
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic untuk mengupdate produk ke database atau state
    alert('Produk berhasil diperbarui!');
    navigate('/product-list'); // Navigasi setelah edit produk
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
          <label>Gambar Produk (URL)</label>
          <input
            type="text"
            value={img}
            onChange={(e) => setImg(e.target.value)}
            required
          />
        </div>
        <button type="submit">Perbarui Produk</button>
      </form>
    </div>
  );
};

export default EditProduct;
