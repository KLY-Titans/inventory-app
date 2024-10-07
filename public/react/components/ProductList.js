import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Grid from "@mui/material/Grid2";

const ProductList = ({products}) => {

  return (
    <Grid container spacing={2}>
      {products.map((product, i) => (
        <ProductCard key={i} product={product} />
      ))}
    </Grid>
  );
};

export default ProductList;
