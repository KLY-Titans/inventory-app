import React, { useState, useEffect } from "react";

// import and prepend the api url to any fetch calls
import apiURL from "../api";
import ProductCard from "./ProductCard";
import ProductList from "./ProductList";
import AddEditForm from "./AddEditForm";

import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  Box,
  TextField,
} from "@mui/material";

export const App = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [onDelete, setOnDelete] = useState(false);
  const [onAdd, setOnAdd] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [query, setQuery] = useState("");

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

  const handleSearch = async () => {
    try {
      const res = await fetch(`${apiURL}/item/search?q=${query}`);
      const data = await res.json();
      setProducts(data);
      setQuery("");
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <>
      <AppBar position="static" sx={{ marginBottom: 6 }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" component="div">
            Titan Store
          </Typography>

          {/* NEED TO FIX JUMPING SEARCH BAR WHEN SELECTING AN ITEM */}
          {/* search bar */}
          <Box sx={{ display: "flex", width: "33%" }}>
            <TextField
              variant="outlined"
              style={{ backgroundColor: "#F8F8F8", borderRadius: "5px" }}
              placeholder="Search product..."
              size="small"
              fullWidth
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button
              variant="contained"
              color="success"
              onClick={() => handleSearch()}
            >
              Search
            </Button>
          </Box>

          {!selectedProduct && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowForm(!showForm)}
            >
              Add Item
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <main>
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ProductCard
              product={selectedProduct}
              goBack={() => setSelectedProduct(null)}
              setOnDelete={setOnDelete}
              onDelete={onDelete}
              showForm={showForm}
              setShowForm={setShowForm}
            />
          </Box>
        ) : (
          <>
            <ProductList
              products={products}
              onProductClick={handleProductClick}
            />
          </>
        )}
      </main>
    </>
  );
};
