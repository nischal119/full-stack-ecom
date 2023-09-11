// import { KeyboardDatePicker } from "@material-ui/pickers";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Button,
  IconButton,
  Input,
  InputAdornment,
  TextField,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { ErrorMessage, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import "./register.styles.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{
        email: "",
        password: "Nischal1234@",
        firstName: "",
        lastName: "",
        gender: "",
        role: "",
        dob: "",
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
        // console.log(values);
        try {
          const response = await axios.post(
            "http://localhost:8000/user/register",
            values
          );
          console.log(response);
        } catch (error) {
          console.log(error.response.data);
        }
      }}
    >
      {({ values, handleChange, handleSubmit }) => (
        <Form
          style={{
            display: "flex",
            flexDirection: "column",
            boxShadow:
              "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
            width: "500px",
            alignSelf: "center",
            padding: "30px",
          }}
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {/* <img src="../../public/berry logo.png" alt="hel" /> */}
          <h1 className="purple"> Sign Up </h1>
          <p className="para">Enter your credentials to continue</p>

          <p style={{ textAlign: "center" }}>
            {" "}
            {/* <b>Sign Up with email address</b> */}
          </p>

          <TextField
            sx={{ margin: "20px" }}
            label="Email"
            variant="standard"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          <ErrorMessage name="email" className="error-message" />

          <TextField
            sx={{ margin: "20px" }}
            label="First Name"
            variant="standard"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
          />
          <ErrorMessage name="firstName" />

          <TextField
            sx={{ margin: "20px" }}
            label="Last Name"
            variant="standard"
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
          />
          <ErrorMessage name="lastName" />

          <FormControl
            sx={{ m: 1, width: "25ch", margin: "20px 10px" }}
            variant="standard"
          >
            <InputLabel
              sx={{ marginLeft: "13px", marginBottom: "10px" }}
              htmlFor="standard-adornment-password"
              name="password"
            >
              Password
            </InputLabel>
            <Input
              fullWidth
              sx={{ marginLeft: "13px", width: "211%" }}
              id="standard-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <ErrorMessage name="password" />

          <FormControl sx={{ margin: "20px" }}>
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              id="gender"
              name="gender"
              value={values.gender}
              onChange={handleChange}
              label="Gender"
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="preferNotToSay">Prefer not to say</MenuItem>
            </Select>
            <ErrorMessage name="gender" />
          </FormControl>

          <FormControl sx={{ margin: "20px" }}>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              id="role"
              name="role"
              value={values.role}
              onChange={handleChange}
              label="Role"
            >
              <MenuItem value="buyer">Buyer</MenuItem>
              <MenuItem value="seller">Seller</MenuItem>
            </Select>
            <ErrorMessage name="role" />
          </FormControl>

          <TextField
            sx={{ margin: "20px" }}
            label="Date of Birth"
            variant="standard"
            name="dob"
            value={values.dob}
            onChange={handleChange}
          />
          <ErrorMessage name="dob" />
          {/* {console.log(values)} */}
          <Button variant="contained" type="submit" className="purple">
            Register
          </Button>
          <Link className="link" to="/login">
            Already have an account?{" "}
          </Link>
        </Form>
      )}
    </Formik>
  );
};

export default Register;
