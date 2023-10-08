import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { $axios } from "../../lib/axios";
import { useMutation } from "react-query";
import { registerUser } from "../../lib/user.api";
import { useDispatch } from "react-redux";
import { openErrorSnackBar } from "../../redux store/slice/snackbarslice";

const Register = () => {
  const navigate = useNavigate();
  // register mutation
  const registerMutation = useMutation({
    mutationKey: ["register"],
    mutationFn: (values) => registerUser(values),
    onSuccess: () => {
      navigate("/login");
    },
  });

  const dispatch = useDispatch();

  if (registerMutation.isError) {
    dispatch(
      openErrorSnackBar(
        "Please make sure to include Special characters , Numbers and Capital letters in password"
      )
    );
  }

  return (
    <div
      className="register-main"
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Formik
        initialValues={{
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          gender: "",
          dob: "",
          role: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address.")
            .required("Email is required.")
            .min(5, "Must be at least 5 characters.")
            .max(55, "Must be at most 55 characters.")
            .trim(),
          firstName: Yup.string()
            .max(55, "Must be at most 55 characters.")
            .required("First name is required.")
            .min(2, "Must be at least 2 characters.")
            .trim(),
          lastName: Yup.string()
            .max(55, "Must be at most 55 characters.")
            .required("Last name is required.")
            .min(2, "Must be at least 2 characters.")
            .trim(),
          password: Yup.string()
            .max(25, "Must be at most 25 characters.")
            .required("Password is required.")
            //   .matches(
            //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$/,
            //     "Password must be at least 8 character with  at least 1 capital letter, 1 small letter, 1 number and 1 special character."
            //   )
            .trim(),

          gender: Yup.string()
            .required("Please choose at least one gender.")
            .trim()
            .oneOf(
              ["male", "female", "preferNotToSay"],
              "Gender must be male,female or prefer not to say."
            ),

          role: Yup.string()
            .required("Please choose at least one role.")
            .trim()
            .oneOf(["buyer", "seller"]),

          dob: Yup.date("Must be valid date.").required(
            "Date of birth is required."
          ),
        })}
        onSubmit={async (values) => {
          registerMutation.mutate(values);
        }}
      >
        {({ errors, handleSubmit, touched, getFieldProps }) => (
          <form
            onSubmit={handleSubmit}
            className="register-glass"
            style={{
              margin: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              padding: "2rem",
              minWidth: "350px",
              borderRadius: "10px",
              boxShadow:
                "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px",
            }}
          >
            <Typography
              variant="h3"
              sx={{ textAlign: "center", color: "white" }}
            >
              Sign up
            </Typography>

            <div style={{ display: "flex" }}>
              <div
                style={{
                  margin: "10px",
                  position: "relative",
                  color: "white",
                  width: "100%",
                }}
              >
                <TextField
                  name="email"
                  label="Email"
                  {...getFieldProps("email")}
                  sx={{ width: "24vw" }}
                />
                {touched.email && errors.email ? (
                  <div className="error-message">{errors.email}</div>
                ) : null}
              </div>
              <div
                style={{ margin: "10px", position: "relative", color: "white" }}
              >
                <TextField
                  name="password"
                  label="Password"
                  type="password"
                  {...getFieldProps("password")}
                  sx={{ width: "24vw" }}
                />
                {touched.password && errors.password ? (
                  <div className="error-message">{errors.password}</div>
                ) : null}
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <div
                style={{ margin: "10px", position: "relative", color: "white" }}
              >
                <TextField
                  name="firstName"
                  label="First name"
                  {...getFieldProps("firstName")}
                  sx={{ width: "24vw" }}
                />
                {touched.firstName && errors.firstName ? (
                  <div className="error-message">{errors.firstName}</div>
                ) : null}
              </div>
              <div
                style={{ margin: "10px", position: "relative", color: "white" }}
              >
                <TextField
                  name="lastName"
                  label="Last name"
                  {...getFieldProps("lastName")}
                  sx={{ width: "24vw" }}
                />
                {touched.lastName && errors.lastName ? (
                  <div className="error-message">{errors.lastName}</div>
                ) : null}
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <div
                  style={{
                    margin: "10px",
                    position: "relative",
                    color: "white",
                  }}
                >
                  <Select
                    name="gender"
                    label="Gender"
                    {...getFieldProps("gender")}
                    sx={{ width: "24vw" }}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="preferNotToSay">
                      Prefer not to say
                    </MenuItem>
                  </Select>
                  {touched.gender && errors.gender ? (
                    <div className="error-message">{errors.gender}</div>
                  ) : null}
                </div>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <div
                  style={{
                    margin: "10px",
                    position: "relative",
                    color: "white",
                  }}
                >
                  <Select
                    name="role"
                    label="Role"
                    {...getFieldProps("role")}
                    sx={{ width: "24vw" }}
                  >
                    <MenuItem value="buyer">Buyer</MenuItem>
                    <MenuItem value="seller">Seller</MenuItem>
                  </Select>
                  {touched.role && errors.role ? (
                    <div className="error-message">{errors.role}</div>
                  ) : null}
                </div>
              </FormControl>
            </div>
            <div
              style={{ margin: "10px", position: "relative", color: "white" }}
            >
              <TextField
                name="dob"
                label="DOB"
                sx={{ width: "100%" }}
                {...getFieldProps("dob")}
              />
              {touched.dob && errors.dob ? (
                <div className="error-message">{errors.dob}</div>
              ) : null}
            </div>
            <Button
              variant="contained"
              type="submit"
              sx={{ marginTop: "1rem" }}
              disabled={registerMutation.isLoading}
            >
              Register
            </Button>
            <Link style={{ textAlign: "center" }} to="/login">
              Already have an account?
            </Link>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
