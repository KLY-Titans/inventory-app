import React, { useState, useEffect } from "react";
import { SaucesList } from "./SaucesList";

// import and prepend the api url to any fetch calls
import apiURL from "../api";
import ProductCard from "./ProductCard";
import ProductList from "./ProductList";

export const App = () => {
  const [sauces, setSauces] = useState([]);
  const [products, setProducts] = useState([]);

  async function fetchSauces() {
    try {
      const response = await fetch(`${apiURL}/sauces`);
      const saucesData = await response.json();

      setSauces(saucesData);
    } catch (err) {
      console.log("Oh no an error! ", err);
    }
  }

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
  }, []);

  return (
    <main>
      <h1>Sauce Store</h1>
      <h2>All things 🔥</h2>
      {/* <SaucesList sauces={sauces} /> */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ProductList products={products}/>
      </div>
    </main>
  );
};
