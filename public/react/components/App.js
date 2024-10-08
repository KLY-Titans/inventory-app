import React, { useState, useEffect } from "react";

// import and prepend the api url to any fetch calls
import apiURL from "../api";
import ProductCard from "./ProductCard";
import ProductList from "./ProductList";

export const App = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${apiURL}/item/`);
      const data = await response.json();
      console.log(data);
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    <main>
      <h1>Titan Store</h1>
      <h2>All things 🔥</h2>

      {selectedProduct ? (
        <ProductCard
          product={selectedProduct}
          goBack={() => setSelectedProduct(null)}
        />
      ) : (
        <ProductList products={products} onProductClick={handleProductClick} />
      )}
    </main>
  );
};
