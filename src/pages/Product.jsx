import React, { useState } from "react";
import SelllerProduct from "./SelllerProduct";
import BuyerProduct from "./BuyerProduct";
import { Box, Button, TextField, useForkRef } from "@mui/material";
import FilterProduct from "../components/FilterProduct";

import AmountInput from "../components/AmountInput";
import ProductFilter from "../components/ProductFilter";
import { useDispatch } from "react-redux";
import { resetFilter, setSearchText } from "../redux store/slice/productSlice";

const Product = () => {
  const role = localStorage.getItem("userRole");
  const dispatch = useDispatch();

  return (
    <Box sx={{ padding: "1rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        {role === "buyer" && (
          <>
            <Button
              sx={{ margin: "10px" }}
              variant="contained"
              color="error"
              onClick={() => dispatch(resetFilter())}
            >
              Clear Filter
            </Button>
            <ProductFilter />
          </>
        )}

        <TextField
          sx={{ width: "30vw" }}
          id="outlined-basic"
          label="Search"
          variant="outlined"
          onChange={(event) => {
            dispatch(setSearchText(event.target.value));
          }}
        />
      </div>

      {role === "seller" ? <SelllerProduct /> : <BuyerProduct />}
    </Box>
  );
};

export default Product;
