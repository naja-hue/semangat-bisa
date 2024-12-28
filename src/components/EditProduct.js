import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';  // Import SweetAlert2
import '../Css/EditProduct.css'; // Pastikan file CSS tersedia

const EditProduct = () => {
  const { id } = useParams(); // Ambil id dari URL
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState(''); // Menambahkan state untuk deskripsi

  // Mengambil idAdmin dari localStorage
  const adminData = JSON.parse(localStorage.getItem("adminData"));
  const idAdmin = adminData ? adminData.id : null;

  // Ambil data produk berdasarkan id
  useEffect(() => {
    fetch(`http://localhost:8080/api/products/${id}`)
      .then(response => response.json())
      .then(data => {
        setProduct(data);
        setName(data.name);
        setPrice(data.price);
        setStock(data.stock);
        setDescription(data.description); // Set deskripsi dari data yang diterima
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const productDTO = {
      name,
      price,
      stock,
      description, // Sertakan deskripsi dalam body request
    };

    // Pastikan idAdmin ada, jika tidak, tampilkan pesan error
    if (!idAdmin) {
      alert('Admin ID tidak ditemukan!');
      return;
    }

    // Menampilkan konfirmasi menggunakan SweetAlert2 sebelum update produk
    Swal.fire({
      title: 'Apakah Anda yakin ingin memperbarui produk?',
      text: 'Periksa kembali data produk yang akan diperbarui.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Perbarui Produk!',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        // Mengirimkan data produk yang telah diperbarui ke API
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
            Swal.fire(
              'Produk Diperbarui!',
              'Produk berhasil diperbarui.',
              'success'
            );
            navigate('/product-list/1'); // Navigasi setelah update
          })
          .catch((error) => {
            console.error('Error:', error);
            Swal.fire(
              'Gagal!',
              'Terjadi kesalahan saat memperbarui produk.',
              'error'
            );
          });
      }
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
          <label>Deskripsi Produk</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="textarea-input" // Menambahkan kelas untuk styling
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
