import React, { useState, useEffect } from "react";

// import and prepend the api url to any fetch calls
import apiURL from "../api";
import ProductCard from "./ProductCard";
import ProductList from "./ProductList";
import { AddItemForm } from "./AddItemForm";

export const App = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [onDelete, setOnDelete] = useState(false);
  const [onAdd, setOnAdd] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${apiURL}/item/`);
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [onDelete, onAdd]);

  const handleProductClick = async (id) => {
    const res = await fetch(`${apiURL}/item/${id}`);
    const data = await res.json();
    setSelectedProduct(data);
  };

  return (
    <main>
      <h1>Titan Store</h1>
      <h2>All things 🔥</h2>
      <AddItemForm onAdd={onAdd} setOnAdd={setOnAdd} />
      {selectedProduct ? (
        <ProductCard
          product={selectedProduct}
          goBack={() => setSelectedProduct(null)}
          setOnDelete={setOnDelete}
          onDelete={onDelete}
        />
      ) : (
        <ProductList products={products} onProductClick={handleProductClick} />
      )}
    </main>
  );
};
