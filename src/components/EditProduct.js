import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../Css/EditProduct.css';
import axios from 'axios';
import { API_PRODUCTS } from '../utils/BaseUrl';

// Fungsi untuk mengupload gambar ke S3
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

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const adminData = JSON.parse(localStorage.getItem("adminData"));
  const idAdmin = adminData ? adminData.id : null;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${API_PRODUCTS}/${id}`);
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
      price: parseFloat(price),
      stock: parseInt(stock, 10),
      description,
    };

    if (!idAdmin) {
      Swal.fire('Gagal!', 'Admin ID tidak ditemukan.', 'error');
      return;
    }

    try {
      if (image) {
        const imageUrl = await uploadImageToS3(image);
        productDTO.imageURL = imageUrl;
      }

      const result = await Swal.fire({
        title: 'Apakah Anda yakin?',
        text: 'Periksa kembali data sebelum memperbarui.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, Perbarui!',
        cancelButtonText: 'Batal',
      });

      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append("product", JSON.stringify(productDTO));
        if (image) {
          formData.append("file", image);
        }

        const response = await axios.put(`${API_PRODUCTS}/edit/${id}?idAdmin=${idAdmin}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          Swal.fire('Sukses!', 'Produk berhasil diperbarui.', 'success');
          navigate('/product-list/1');
        } else {
          throw new Error('Respons tidak valid dari server.');
        }
      }
    } catch (error) {
      console.error('Error updating product:', error);
      Swal.fire('Gagal!', error.response?.data?.message || 'Terjadi kesalahan.', 'error');
    }
  };

  if (!product) {
    return <p>Loading...</p>;
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
        <div>
          <label>Gambar Produk</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <button type="submit">Perbarui Produk</button>
      </form>
    </div>
  );
};

export default EditProduct;
