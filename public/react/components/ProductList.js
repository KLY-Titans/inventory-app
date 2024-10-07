import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Grid from "@mui/material/Grid2";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {

    try{
      const response = await fetch(`http://localhost:3000/api/item/`)
      const data = await response.json()
      console.log(data)
      setProducts(data)
    }catch(err){
      console.log(err)
    }
  };

  useEffect(()=>{

    fetchProducts()
  }, [])

  return (
    <Grid container spacing={2}>
      {products.map((product, i) => (
        <ProductCard key={i} product={product} />
      ))}
    </Grid>
  );
};

export default ProductList;
