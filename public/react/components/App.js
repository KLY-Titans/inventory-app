import React, { useState, useEffect } from "react";

// import and prepend the api url to any fetch calls
import apiURL from "../api";
import ProductCard from "./ProductCard";
import ProductList from "./ProductList";
import AddEditForm from "./AddEditForm";

import { Button } from "@mui/material";

export const App = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [onDelete, setOnDelete] = useState(false);
  const [onAdd, setOnAdd] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [showForm, setShowForm] = useState(false);

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
  }, [onDelete, onAdd, onEdit]);

  const handleProductClick = async (id) => {
    const res = await fetch(`${apiURL}/item/${id}`);
    const data = await res.json();
    setSelectedProduct(data);
  };

  return (
    <main>
      <h1>Titan Store</h1>
      <h2>All things 🔥</h2>

      {showForm ? (
        <AddEditForm
          onAdd={onAdd}
          setOnAdd={setOnAdd}
          showForm={showForm}
          setShowForm={setShowForm}
          onEdit={onEdit}
          setOnEdit={setOnEdit}
          product={selectedProduct}
          setSelectedProduct={setSelectedProduct}
        />
      ) : selectedProduct ? (
        <ProductCard
          product={selectedProduct}
          goBack={() => setSelectedProduct(null)}
          setOnDelete={setOnDelete}
          onDelete={onDelete}
          showForm={showForm}
          setShowForm={setShowForm}
        />
      ) : (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowForm(!showForm)}
          >
            Add Item
          </Button>
          <ProductList
            products={products}
            onProductClick={handleProductClick}
          />
        </>
      )}
    </main>
  );
};
