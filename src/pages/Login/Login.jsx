import { Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import React from "react";

import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { loginUser } from "../../lib/user.api";
import {
  openErrorSnackBar,
  openSuccessSnackBar,
} from "../../redux store/slice/snackbarslice";
import "./login.styles.css";
const Login = () => {
  const dispatch = useDispatch();
  //? login mutation
  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: (values) => loginUser(values),
    onSuccess: (response) => {
      console.log(response);
      localStorage.setItem("accesstoken", response?.data?.access_token);
      localStorage.setItem("userRole", response?.data?.user?.role);
      localStorage.setItem("firstName", response?.data?.user?.firstName);
      localStorage.setItem("isLoggedIn", true);
      navigate("/home");
      dispatch(
        openSuccessSnackBar(
          `Namastey ${localStorage.getItem(
            "firstName"
          )}! You are successfully logged in`
        )
      );
    },
    onError: (error) => {
      dispatch(
        openErrorSnackBar(error.response.data.message || "Invalid Credentials")
      );
    },
  });

  const navigate = useNavigate();

  return (
    <>
      <div
        className="main-body"
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address.")
              .required("Email is required."),
            password: Yup.string().trim().required("Password is required."),
          })}
          onSubmit={async (values) => {
            loginMutation.mutate(values);
          }}
        >
          {(formik) => (
            <form
              className="glass"
              onSubmit={formik.handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                // minWidth: "400px",
                borderRadius: "10px",
                margin: "auto",
                padding: "2rem",
                gap: "1rem",

                maxHeight: "600px",
              }}
            >
              <img
                src="/Image resources/logo.png"
                alt=""
                style={{ width: "250px" }}
              />
              <Typography variant="h3" sx={{ color: "white" }}>
                Login
              </Typography>
              <div
                style={{ margin: "18px", position: "relative", color: "white" }}
              >
                <TextField
                  label="Email"
                  variant="outlined"
                  name="email"
                  {...formik.getFieldProps("email")}
                  sx={{
                    width: "24vw",
                    "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
                      color: "white",
                    },
                    "& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root.Mui-focused":
                      {
                        color: "white",
                      },
                    "&.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
                      color: "white",
                    },
                  }}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="error-message">{formik.errors.email}</div>
                ) : null}
              </div>

              <div style={{ margin: "22x" }}>
                <TextField
                  label="Password"
                  type="password"
                  name="password"
                  {...formik.getFieldProps("password")}
                  sx={{
                    width: "24vw",
                    "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
                      color: "white",
                    },
                    "& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root.Mui-focused":
                      {
                        color: "white",
                      },
                    "&.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
                      color: "white",
                    },
                  }}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="error-message">{formik.errors.password}</div>
                ) : null}
              </div>

              <Button
                style={{ marginTop: "20px" }}
                variant="contained"
                type="submit"
                disabled={loginMutation.isLoading}
              >
                Login
              </Button>
              <Link to="/register" style={{ color: "white" }}>
                Don&apos;t have an account?
              </Link>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Login;
