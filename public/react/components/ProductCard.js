import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";


const ProductCard = ({ product }) => {
  return (
    
    <Card variant="outlined" sx={{ border: "solid 1px red", width: 400 }}>
      <CardHeader title={product.name} subheader={product.category} />
      
      {/* image needs uniform sizing */}
      <CardMedia component="img" src={product.image} />
      <CardContent>
        <Typography sx={{ marginBottom: 2 }} variant="body1">
          {product.description}
        </Typography>
        <Typography sx={{ marginBottom: 2 }} variant="h6">
          ${product.price}
        </Typography>
      </CardContent>{" "}

      {/* needs conditional rendereing for single view only */}
      <Stack spacing={2} direction="row">
        <button>DELETE</button>
        <button>EDIT</button>
      </Stack>
    </Card>
  );
};

export default ProductCard;
