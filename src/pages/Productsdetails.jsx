import { Button, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiOutlineMinus } from "react-icons/ai";
import { GrAdd } from "react-icons/gr";
import { useNavigate, useParams } from "react-router-dom";
import { $axios } from "../lib/axios";
import { useMutation } from "react-query";
import { addItemToCart } from "../lib/cart.api";

const Productsdetails = () => {
  const [productDetail, setProductDetail] = useState({});
  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState(1);
  const navigate = useNavigate();
  const params = useParams();
  const productId = params.id;
  const userRole = localStorage.getItem("userRole");

  const {
    mutate: addItemToCartMutate,
    isLoading,
    isError,
  } = useMutation({
    mutationKey: ["add-item-to-cart"],
    mutationFn: () => {
      addItemToCart({
        productId,
        quantity: counter,
      });
    },
  });
  useEffect(() => {
    const getProductDetails = async () => {
      try {
        setLoading(true);
        const response = await $axios.get(`/product/details/${productId}`);

        setProductDetail(response?.data);

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error.response.data.message);
      }
    };
    getProductDetails();
  }, [productId]);

  if (loading) <CircularProgress />;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "77vh",
          width: "50%",
          padding: "30px",
          boxShadow: "rgba(0, 0, 0, 0.25) 0px 25px 50px -12px",
          position: "relative",
        }}
      >
        <div className="product-card" style={{}}>
          <img
            style={{ width: "200px", height: "250px" }}
            src="https://www.pbtech.co.nz/imgprod/G/A/GAMSNY5504__1.jpg?h=128094012"
            alt=""
          />
        </div>
        <div
          className="bold-para"
          style={{
            position: "absolute",
            left: "45%",
            top: "25%",
            borderLeft: "5px solid red",

            height: "60%",
            paddingLeft: "30px",
          }}
        >
          <h3> Product description</h3>
          <p>Name : {productDetail.name}</p>
          <p>Brand : {productDetail.company}</p>
          <p>Price : {productDetail.price} </p>
          <p>Quantity : {productDetail.quantity} </p>
          <p>Category : {productDetail.category} </p>
          <p>
            Free Shipping : {productDetail.freeShipping === true ? "Yes" : "No"}{" "}
          </p>
          {userRole === "buyer" && (
            <>
              <div style={{ display: "flex", margin: "10px" }}>
                <p>Number of items:</p>

                <Button
                  sx={{ margin: "0px 10px", marginBottom: "10px" }}
                  variant="outlined"
                  onClick={() => {
                    if (counter - 1 <= 0) {
                      return 1;
                    }
                    setCounter(counter - 1);
                  }}
                >
                  <AiOutlineMinus />
                </Button>
                <Typography>{counter}</Typography>
                <Button
                  sx={{ margin: "0px 10px", marginBottom: "10px" }}
                  variant="outlined"
                  onClick={() => {
                    const newCount = counter + 1;
                    if (newCount >= productDetail.quantity) {
                      setCounter(productDetail.quantity);
                    } else {
                      setCounter(newCount);
                    }
                  }}
                >
                  <GrAdd />
                </Button>
              </div>
              <Button
                sx={{ width: "100%" }}
                variant="contained"
                onClick={() => {
                  addItemToCartMutate();
                }}
              >
                Add to cart
              </Button>
            </>
          )}
          {userRole === "seller" && (
            <div>
              <Button
                variant="contained"
                onClick={() => navigate(`/product/edit/${productId}`)}
              >
                Edit Product
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Productsdetails;
