import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Grid from "@mui/material/Grid2";

const ProductList = ({ products, onProductClick }) => {
  return (
    <Grid container spacing={4} justifyContent={"center"}>
      {products?.map((product) => (
        <Grid xs={12} sm={6} md={4} lg={3} key={product.id}>
          <ProductCard
            product={product}
            onClick={() => onProductClick(product.id)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
