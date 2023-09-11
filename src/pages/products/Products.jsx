import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { $axios } from "../../../lib/axios";

const Products = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await $axios.post("/product/buyer/all", {
        page: 1,
        limit: 10,
      });
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  if (loading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress color="success" />
      </div>
    );
  return <div></div>;
};

export default Products;
