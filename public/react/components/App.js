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
    try {
      const res = await fetch(`${apiURL}/item/${id}`);
      const data = await res.json();
      setSelectedProduct(data);
    } catch (error) {
      console.error("Error", error);
    }
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
      <AppBar
        position="static"
        sx={{ marginBottom: 6, backgroundColor: "#3f51b5" }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box onClick={() => fetchProducts()} sx={{ cursor: "pointer" }}>
            <Typography variant="h4">Titan Store</Typography>
          </Box>

          {/* search bar */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "33%",
            }}
          >
            <TextField
              variant="outlined"
              style={{
                backgroundColor: "#F8F8F8",
                borderRadius: "5px",
              }}
              placeholder="Search product..."
              size="small"
              fullWidth
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button
              variant="outlined"
              color="white"
              onClick={() => handleSearch()}
              sx={{ marginLeft: 1 }}
            >
              Search
            </Button>
          </Box>

          <Box
            sx={{
              visibility: selectedProduct
                ? "hidden"
                : showForm
                ? "hidden"
                : "visible",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowForm(!showForm)}
            >
              Add Item
            </Button>
          </Box>
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
