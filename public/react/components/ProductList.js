import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Grid from "@mui/material/Grid2";

const ProductList = ({ products, onProductClick}) => {
  return (
    <Grid container spacing={2}>
      {products?.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={() => onProductClick(product.id)}
        />
      ))}
    </Grid>
  );
};

export default ProductList;
