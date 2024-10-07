import React from "react";
import Grid from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export const ProductCard = ({product}) => {
  const product = {
    name: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  };

  return (
    
    // GRID FOR SPACING/LAYOUT
    <Card variant="outlined" sx={{ border: "solid 1px red", width: 400 }}>
      <CardHeader title={product.name} subheader={product.category} />
      <CardMedia component="img" src={product.image} />
      <CardContent>
        <Typography sx={{ marginBottom: 2 }} variant="body1">
          {product.description}
        </Typography>
        <Typography sx={{ marginBottom: 2 }} variant="h6">
          ${product.price}
        </Typography>
      </CardContent>
    </Card>
  );
};
