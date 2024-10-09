import React, { useState } from "react";
import apiURL from "../api";
import { Box, Typography, Button, TextField } from "@mui/material";

const AddEditForm = ({
  onAdd,
  setOnAdd,
  setShowForm,
  showForm,
  onEdit,
  setOnEdit,
  setSelectedProduct,
  product = null,
}) => {
  const [name, setName] = useState(product ? product.name : "");
  const [price, setPrice] = useState(product ? product.price : "");
  const [description, setDescription] = useState(
    product ? product.description : ""
  );
  const [category, setCategory] = useState(product ? product.category : "");
  const [image, setImage] = useState(product ? product.image : "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const item = {
      name,
      price,
      description,
      category,
      image,
    };

    try {
      let response;

      if (product) {
        response = await fetch(`${apiURL}/item/${product.id}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(item),
        });
        const data = await response.json();
        setSelectedProduct(data);
        setOnEdit(!onEdit);
      } else {
        response = await fetch(`${apiURL}/item/`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(item),
        });
        setOnAdd(!onAdd);
      }
      if (response.ok) {
        setName("");
        setPrice("");
        setDescription("");
        setCategory("");
        setImage("");

        setShowForm(!showForm);
        console.log(
          product ? "Item successfully update" : "Item added successfully"
        );
      } else {
        console.log(product ? "Failed to update item" : "Failed to add item");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: 400,
        margin: "auto",
        marginBottom: 3,
        padding: 3,
        border: "1px solid black",
        borderRadius: 2,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
      onSubmit={handleSubmit}
    >
      <Typography variant="h5" component="h2" align="center" marginBottom={2}>
        {product ? "Edit Item" : "Add New Item"}
      </Typography>

      <TextField
        id="productName"
        label="Product name"
        variant="filled"
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
        fullWidth
        required
      />
      <TextField
        id="price"
        label="Price"
        variant="filled"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        margin="normal"
        type="number"
        fullWidth
        required
      />
      <TextField
        id="description"
        label="Description"
        variant="filled"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        margin="normal"
        fullWidth
        multiline
        rows={4}
        required
      />
      <TextField
        id="category"
        label="Category"
        variant="filled"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        margin="normal"
        fullWidth
        required
      />
      <TextField
        id="image"
        label="Image URL"
        variant="filled"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        margin="normal"
        fullWidth
        type="url"
        required
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        sx={{ marginBottom: "0.5em" }}
      >
        {product ? "Update Item" : "Add Item"}
      </Button>
      <Button
        variant="outlined"
        color="error"
        type="button"
        onClick={() => setShowForm(!showForm)}
      >
        Go Back
      </Button>
    </Box>
  );
};

export default AddEditForm;
