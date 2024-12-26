import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ProductList.css";  // Pastikan file ini ada dan diimport dengan benar

const ProductList = ({ isLoggedIn }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((response) => response.json())
      .then((data) => {
        console.log("Data yang diterima:", data);  // Log data produk
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("Data yang diterima bukan array", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const deleteProduct = (productId) => {
    fetch(`http://localhost:8080/api/products/delete/${productId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        setProducts(products.filter((product) => product.id !== productId));
      })
      .catch((error) => console.error("Error deleting product:", error));
  };

  return (
    <div className="product-list-container">
      <h2 className="dft">Daftar Produk</h2>
      <table className="product-list-table">
        <thead>
          <tr>
            <th>Gambar</th>
            <th>Nama Produk</th>
            <th>Harga</th>
            <th>Deskripsi</th>
            <th>Stok</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <img src={product.imageUrl} alt={product.name} style={{ width: "100px", height: "100px" }} />
              </td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td>{product.stock}</td>
              <td>
                {isLoggedIn && (
                  <>
                    <Link to={`/edit-product/${product.id}`}>
                      <button>Edit</button>
                    </Link>
                    <button onClick={() => deleteProduct(product.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isLoggedIn && (
        <Link to="/add-product">
          <button className="add-product-btn">+</button>
        </Link>
      )}
    </div>
  );
};

export default ProductList;
