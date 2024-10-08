import React, { useState } from "react";
import apiURL from "../api";
import { Box, Typography, Button, TextField, Container } from "@mui/material";

export const AddItemForm = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newItem = {
      name,
      price,
      description,
      category,
      image,
    };

    try {
      const response = await fetch(`${apiURL}/item/`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newItem),
      });
      if (response.ok) {
        console.log("Item added successfully");
      } else {
        console.log("Failed to add item");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <Box
      component="form"
    //   sx={{
    //     display: "flex",
    //     flexDirection: "column",
    //     maxWidth: 400,
    //     margin: "auto",
    //     padding: 3,
    //     border: "1px solid black",
    //     borderRadius: 2,
    //     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    //   }}
      onSubmit={handleSubmit}
    >
      <Typography variant="h5" component="h2" align="center" marginBottom={2}>
        Add New Item
      </Typography>

      <TextField
        label="Product name"
        variant="outlined"
        defaultValue={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
        fullWidth
        required
      />
      <TextField
        label="Price"
        variant="outlined"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        margin="normal"
        type="number"
        fullWidth
        required
      />
      <TextField
        label="Description"
        variant="outlined"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        margin="normal"
        fullWidth
        multiline
        rows={4}
        required
      />
      <TextField
        label="Category"
        variant="outlined"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        margin="normal"
        fullWidth
        required
      />
      <TextField
        label="Image URL"
        variant="outlined"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        margin="normal"
        fullWidth
        type="url"
        required
      />
      <Button variant="contained" color="primary" type="submit">
        Add Item
      </Button>
    </Box>
    
  );
};
