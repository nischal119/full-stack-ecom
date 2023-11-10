import {
  Button,
  Checkbox,
  CircularProgress,
  MenuItem,
  Stack,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { addProduct } from "../lib/product.api";
import CustomSnackbar from "./CustomSnackbar";
import { useDispatch } from "react-redux";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";

import {
  openErrorSnackBar,
  openSuccessSnackBar,
} from "../redux store/slice/snackbarslice";
import { $axios } from "../lib/axios";
import axios from "axios";
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
  const [localUrl, setLocalUrl] = React.useState(null);
  const [productImage, setProductImage] = React.useState(null);
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
  const blue = {
    100: "#DAECFF",
    200: "#b6daff",
    400: "#3399FF",
    500: "#007FFF",
    600: "#0072E5",
    900: "#003A75",
  };

  const grey = {
    50: "#F3F6F9",
    100: "#E5EAF2",
    200: "#DAE2ED",
    300: "#C7D0DD",
    400: "#B0B8C4",
    500: "#9DA8B7",
    600: "#6B7A90",
    700: "#434D5B",
    800: "#303740",
    900: "#1C2025",
  };

  const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    width: 320px;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    border:1px solid grey;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  
    box-shadow: 0px 2px 2px ${
      theme.palette.mode === "dark" ? grey[900] : grey[50]
    };

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[600] : blue[200]
      };
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
  );

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
          description: "",
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
          description: Yup.string()
            .max(1000, "Must be 1000 characters or less")
            .min(10, " Must be at least 10 characters")
            .trim()
            .required("Required"),
        })}
        onSubmit={async (values) => {
          let imageUrl = "";
          if (productImage) {
            const cloudName = "dbgpxpq72";
            const data = new FormData();
            data.append("file", productImage);
            data.append("upload_preset", "nepal-mart");
            data.append("cloud_name", cloudName);
            try {
              const res = await axios.post(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                data
              );

              imageUrl = res.data.secure_url;
              console.log(imageUrl);
            } catch (error) {
              dispatch(openErrorSnackBar("Image upload failed"));
            }
          }
          values.imageUrl = imageUrl;

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

            {localUrl && (
              <img
                src={localUrl}
                alt="product"
                style={{ width: "100px", objectFit: "cover" }}
              />
            )}
            <div>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Button variant="contained" component="label">
                  Upload Image
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={(event) => {
                      const productImage = event.target.files[0];
                      setLocalUrl(URL.createObjectURL(productImage));
                      setProductImage(productImage);
                    }}
                  />
                </Button>
              </Stack>
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
              <Textarea
                minRows={3}
                maxRows={6}
                label="Description"
                type="text"
                name="description"
                placeholder="Description"
                {...formik.getFieldProps("description")}
                sx={{ width: "24vw" }}
              />
              {formik.touched.description && formik.errors.description ? (
                <div className="error-message">{formik.errors.description}</div>
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
