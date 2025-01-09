import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../Css/EditProduct.css'; // Pastikan file CSS tersedia
import axios from 'axios'; // Import Axios
import { API_PRODUCT } from '../utils/BaseUrl';

const EditProduct = () => {
  const { id } = useParams(); // Ambil id dari URL
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');

  // Mengambil idAdmin dari localStorage
  const adminData = JSON.parse(localStorage.getItem("adminData"));
  const idAdmin = adminData ? adminData.id : null;

  // Ambil data produk berdasarkan id
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${API_PRODUCT}/products/${id}`);
        const data = response.data;
        setProduct(data);
        setName(data.name);
        setPrice(data.price);
        setStock(data.stock);
        setDescription(data.description);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productDTO = {
      name,
      price,
      stock,
      description,
    };

    if (!idAdmin) {
      alert('Admin ID tidak ditemukan!');
      return;
    }

    try {
      // Konfirmasi menggunakan SweetAlert2
      const result = await Swal.fire({
        title: 'Apakah Anda yakin ingin memperbarui produk?',
        text: 'Periksa kembali data produk yang akan diperbarui.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, Perbarui Produk!',
        cancelButtonText: 'Batal',
      });

      if (result.isConfirmed) {
        await axios.put(`${API_PRODUCT}/edit/${id}?idAdmin=${idAdmin}`, productDTO);
        Swal.fire('Produk Diperbarui!', 'Produk berhasil diperbarui.', 'success');
        navigate('/product-list/1'); // Navigasi setelah update
      }
    } catch (error) {
      console.error('Error updating product:', error);
      Swal.fire('Gagal!', 'Terjadi kesalahan saat memperbarui produk.', 'error');
    }
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
          <label>Deskripsi Produk</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="textarea-input"
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