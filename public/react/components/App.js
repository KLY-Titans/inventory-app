import React, { useState, useEffect } from "react";

// import and prepend the api url to any fetch calls
import apiURL from "../api";
import ProductCard from "./ProductCard";
import ProductList from "./ProductList";
import AddEditForm from "./AddEditForm";

import { AppBar, Button, Toolbar, Typography, Box, TextField } from "@mui/material";

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
	<>
      <AppBar position="static" sx={{marginBottom: 6}}>
        <Toolbar sx={{justifyContent: "space-between"}}>
          <Typography variant="h6" component="div">
            Titan Store
          </Typography>
          <Box sx={{width: '20%'}}>
            <TextField variant="outlined" style={{backgroundColor:"#F8F8F8", borderRadius:"5px"}}
              placeholder="Search product..."
              size="small"
              fullWidth
            />
          </Box>
          <Button variant="contained" color="primary" onClick={() => setShowForm(!showForm)}>Add Item</Button>
		  <Typography variant="h6" color="inherit" component="div">
		  	All things 🔥
          </Typography>
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
