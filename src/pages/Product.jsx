import { Box, Button, TextField } from "@mui/material";
import React from "react";
import BuyerProduct from "./BuyerProduct";
import SelllerProduct from "./SelllerProduct";

import { useDispatch } from "react-redux";
import ProductFilter from "../components/ProductFilter";
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
