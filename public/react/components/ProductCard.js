import React from "react";

import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  Stack,
  Button,
} from "@mui/material";

import apiURL from "../api";

const ProductCard = ({
  product,
  onClick,
  goBack,
  setOnDelete,
  onDelete,
  setShowForm,
  showForm,
}) => {
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
        title={<Typography variant="h6">{product.name}</Typography>}
        subheader={product.category}
      />
      <CardMedia
        component="img"
        height="300"
        image={product.image}
        sx={{ objectFit: "contain" }}
      />
      <CardContent>
        <Typography gutterBottom noWrap={goBack ? false : true} variant="body1">
          {product.description}
        </Typography>
        <Typography sx={{ marginBottom: 2 }} variant="h6">
          ${parseFloat(product.price).toFixed(2)}
        </Typography>
      </CardContent>{" "}
      {goBack && (
        <>
          <Stack
            spacing={{ xs: 1, sm: 2 }}
            direction="row"
            useFlexGap
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            <Button
              variant="contained"
              color="error"
              onClick={() => deleteHandler(product.id)}
            >
              DELETE
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowForm(!showForm)}
            >
              EDIT
            </Button>
            <Button variant="outlined" color="error" onClick={() => goBack()}>
              Go Back
            </Button>
          </Stack>
        </>
      )}
    </Card>
  );
};

export default ProductCard;
