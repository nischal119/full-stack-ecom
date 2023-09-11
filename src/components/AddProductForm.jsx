import {
  Button,
  Checkbox,
  CircularProgress,
  MenuItem,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { addProduct } from "../lib/product.api";
import CustomSnackbar from "./CustomSnackbar";
import { useDispatch } from "react-redux";
import {
  openErrorSnackBar,
  openSuccessSnackBar,
} from "../redux store/slice/snackbarslice";
const AddProductForm = () => {
  const category = [
    "grocery",
    "kitchen",
    "clothing",
    "electronics",
    "furniture",
    "cosmetics",
    "bakery",
    "liquor",
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const addProductMutation = useMutation({
    mutationKey: ["add-product"],
    mutationFn: (values) => addProduct(values),
    onSuccess: () => {
      navigate("/products");
      dispatch(openSuccessSnackBar("Product is added successfully"));
    },
    onError: (error) => {
      dispatch(
        openErrorSnackBar(error.response.data.message || "Something went wrong")
      );
    },
  });
  if (addProductMutation.isLoading) return <CircularProgress />;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Formik
        initialValues={{
          name: "",
          company: "",
          price: "",
          freeShipping: true,
          quantity: "",
          category: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .max(15, "Must be 15 characters or less")
            .min(2, "Name must be at least 2 characters")
            .trim()
            .required("Required"),
          company: Yup.string()
            .max(20, "Must be 20 characters or less")
            .min(2, "Company must be at least 2 characters")
            .trim()
            .required("Required"),
          price: Yup.number()
            .min(1, "Price cannot be zero")
            .required("Required"),
          freeShipping: Yup.boolean().required(),
          quantity: Yup.number()
            .required()
            .min(1, "Quantity must be at least one"),
          category: Yup.string()
            .trim()
            .required("Category is required")
            .oneOf([
              "grocery",
              "kitchen",
              "clothing",
              "electronics",
              "furniture",
              "cosmetics",
              "bakery",
              "liquor",
            ]),
        })}
        onSubmit={async (values) => {
          console.log(values);
          addProductMutation.mutate(values);
        }}
      >
        {(formik) => (
          <form
            onSubmit={formik.handleSubmit}
            style={{
              display: "grid",
              placeItems: "center",
              alignItems: "center",
              boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
              // minWidth: "400px",
              borderRadius: "10px",
              margin: "auto",
              padding: "1rem",
              gap: "1rem",
              backgroundColor: "#f5f5f5f5",
            }}
          >
            {/* {console.log(formik.values)} */}
            <h3>Add Details</h3>
            <div style={{ position: "relative", marginBottom: "15px" }}>
              <TextField
                label="Product Name"
                type="text"
                name="name"
                {...formik.getFieldProps("name")}
                sx={{ width: "24vw" }}
              />

              {formik.touched.name && formik.errors.name ? (
                <div
                  className="error-message"
                  style={{ justifySelf: "flex-start" }}
                >
                  {formik.errors.name}
                </div>
              ) : null}
            </div>
            <div style={{ position: "relative", marginBottom: "15px" }}>
              <TextField
                label="Company"
                type="company"
                name="company"
                {...formik.getFieldProps("company")}
                sx={{ width: "24vw" }}
              />
              {formik.touched.company && formik.errors.company ? (
                <div className="error-message">{formik.errors.company}</div>
              ) : null}
            </div>
            <div style={{ position: "relative", marginBottom: "15px" }}>
              <TextField
                label="Price"
                type="number"
                name="price"
                {...formik.getFieldProps("price")}
                sx={{ width: "24vw" }}
              />
              {formik.touched.price && formik.errors.price ? (
                <div className="error-message">{formik.errors.price}</div>
              ) : null}
            </div>
            <div style={{ position: "relative", marginBottom: "15px" }}>
              <TextField
                label="Quantity"
                type="number"
                name="quantity"
                {...formik.getFieldProps("quantity")}
                sx={{ width: "24vw" }}
              />
              {formik.touched.quantity && formik.errors.quantity ? (
                <div className="error-message">{formik.errors.quantity}</div>
              ) : null}
            </div>
            <div style={{ position: "relative" }}>
              <TextField
                select
                label="Category"
                name="category"
                sx={{ width: "24vw" }}
                {...formik.getFieldProps("category")}
              >
                {category.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}{" "}
                {formik.touched.category && formik.errors.category ? (
                  <div className="error-message">{formik.errors.category}</div>
                ) : null}
              </TextField>
            </div>
            <div style={{ display: "flex", width: "100%" }}>
              <label style={{ padding: "10px" }}>Free Shipping</label>
              <Checkbox
                {...formik.label}
                defaultChecked
                {...formik.getFieldProps("freeShipping")}
              />
            </div>

            <Button sx={{ width: "24vw" }} type="submit" variant="contained">
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AddProductForm;
