import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const EmptyPage = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div>
        <img
          style={{ height: "400px", width: "400px" }}
          src="../.././public/Image resources/empty cart.jpg"
          alt=""
        />
        <h1>OOPS! Nothing in cart</h1>
      </div>
      <Button
        onClick={() => {
          navigate("/products");
        }}
        variant="contained"
        sx={{ marginLeft: "20px" }}
      >
        Begin Shopping?
      </Button>
    </div>
  );
};

export default EmptyPage;
