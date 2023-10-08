import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import Loader from "../components/Loader";
import { category } from "../constants/constants";
import { editProduct, getProductDetails } from "../lib/product.api";
import { useDispatch } from "react-redux";
import { openErrorSnackBar } from "../redux store/slice/snackbarslice";

const EditProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const productId = params.id;
  const dispatch = useDispatch();

  const { isLoading, data } = useQuery({
    queryKey: ["get-product-details", productId],
    queryFn: () => getProductDetails(productId),
    onError: (error) => {
      dispatch(
        openErrorSnackBar(
          error?.response?.data?.message || "Something went wrong."
        )
      );
    },
  });

  const editProductMutation = useMutation({
    mutationKey: ["edit-product"],
    mutationFn: (values) => editProduct(productId, values),
    onSuccess: () => {
      navigate(`/products/details/${productId}`);
    },
    onError: (error) => {
      dispatch(
        openErrorSnackBar(
          error?.response?.data?.message || "Something went wrong."
        )
      );
    },
  });

  const productDetails = data?.data;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          margin: "5rem",
          width: "400px",

          padding: "10px",
          borderRadius: "10px",
          boxShadow:
            "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px",
        }}
      >
        <Formik
          enableReinitialize
          initialValues={{
            name: productDetails?.name || "Hello",
            company: productDetails?.company || "",
            price: productDetails?.price || 0,
            freeShipping: productDetails?.freeShipping || false,
            quantity: productDetails?.quantity || 0,
            category: productDetails?.category || "",
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .min(2, "Name must be at least 2 characters.")
              .max(55, "Name must be at most 55 characters.")
              .trim()
              .required("Product name is required."),
            company: Yup.string()
              .min(2, "Company name must be at least 2 characters.")
              .max(55, "Company name must be at most 55 characters.")
              .trim()
              .required("Company is required."),
            price: Yup.number()
              .min(0, "Price cannot be less than or equals to 0.")
              .required("Price is required."),
            freeShipping: Yup.boolean().required("Free shipping is required."),
            quantity: Yup.number()
              .min(1, "Quantity must be at least 1.")
              .required("Quantity is required")
              .integer(),
            category: Yup.string()
              .trim()
              .required("Category is required.")
              .oneOf(category),
          })}
          onSubmit={(values) => {
            editProductMutation.mutate(values);
          }}
        >
          {({ handleSubmit, getFieldProps, errors, touched, values }) => (
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
                padding: "2rem",
                minWidth: "350px",
              }}
            >
              <TextField
                sx={{ width: "100%" }}
                name="name"
                label="Product name"
                {...getFieldProps("name")}
              />
              {touched.name && errors.name ? (
                <div className="error-message">{errors.name}</div>
              ) : null}

              <TextField
                sx={{ width: "100%" }}
                name="company"
                label="Company"
                {...getFieldProps("company")}
              />
              {touched.company && errors.company ? (
                <div className="error-message">{errors.company}</div>
              ) : null}

              <TextField
                sx={{ width: "100%" }}
                name="price"
                label="Price"
                {...getFieldProps("price")}
                type="number"
              />
              {touched.price && errors.price ? (
                <div className="error-message">{errors.price}</div>
              ) : null}

              <TextField
                sx={{ width: "100%" }}
                name="quantity"
                label="Quantity"
                {...getFieldProps("quantity")}
                type="number"
              />
              {touched.quantity && errors.quantity ? (
                <div className="error-message">{errors.quantity}</div>
              ) : null}

              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  label="Category"
                  {...getFieldProps("category")}
                >
                  {category.map((item, index) => {
                    return (
                      <MenuItem value={item} key={index}>
                        {item}
                      </MenuItem>
                    );
                  })}
                </Select>
                {touched.category && errors.category ? (
                  <div className="error-message">{errors.category}</div>
                ) : null}
              </FormControl>

              <Grid
                item
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <InputLabel>Free shipping</InputLabel>
                <Checkbox
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                  label="Free shipping"
                  name="freeShipping"
                  {...getFieldProps("freeShipping")}
                />
              </Grid>

              <Button
                type="submit"
                variant="contained"
                sx={{ width: "100%", padding: "7px" }}
              >
                Submit
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default EditProduct;
