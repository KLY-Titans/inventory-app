import React from "react";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import apiURL from "../api";

const ProductCard = ({ product, onClick, goBack, setOnDelete, onDelete }) => {
  const deleteHandler = async (id) => {
    try {
      const res = await fetch(`${apiURL}/item/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });
      // sets curr selectedProduct back to null after deleting from the DB
      goBack();
      setOnDelete(!onDelete);
    } catch (error) {
      console.log(`Error : ${error}`);
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{ maxWidth: 345, borderRadius: 4 }}
      onClick={onClick}
    >
      <CardHeader
        title={
          <Typography
            variant="h6"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxHeight: "3em",
            }}
          >
            {product.name}
          </Typography>
        }
        subheader={product.category}
      />
      <CardMedia
        component="img"
        height="300"
        image={product.image}
        sx={{ objectFit: "contain" }}
      />
      <CardContent>
        <Typography
          sx={{
            marginBottom: 2,
            maxHeight: "4.5em",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          variant="body1"
        >
          {product.description}
        </Typography>
        <Typography sx={{ marginBottom: 2 }} variant="h6">
          ${product.price}
        </Typography>
      </CardContent>{" "}
      {goBack && (
        <>
          <Stack spacing={2} direction="row">
            <button onClick={() => deleteHandler(product.id)}>DELETE</button>
            <button>EDIT</button>
            <button onClick={goBack}>Go Back</button>
          </Stack>
        </>
      )}
    </Card>
  );
};

export default ProductCard;
