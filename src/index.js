import React from "react";
import ReactDOM from "react-dom/client"; // Perhatikan impor ini
import App from "./App"; // Komponen utama aplikasi

const root = ReactDOM.createRoot(document.getElementById("root")); // Menggunakan createRoot di sini
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
