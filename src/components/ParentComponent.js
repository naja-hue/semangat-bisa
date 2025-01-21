// Misalnya ini adalah komponen induk
import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';

const ParentComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);  // set isLoggedIn based on token presence
  }, []);

  return <ProductList isLoggedIn={isLoggedIn} />;
};

export default ParentComponent;
