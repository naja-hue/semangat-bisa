import React from 'react';
import ReactDOM from 'react-dom/client'; // Perhatikan impor dari 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

// Membuat root dan merender aplikasi
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <App />
  </Router>
);
