import { Alert, Snackbar } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeSnackBar } from "../redux store/slice/snackbarslice";

const CustomSnackbar = () => {
  const snackBarData = useSelector((state) => state.snackbar);
  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(closeSnackBar());
  };
  return (
    <Snackbar
      open={snackBarData.open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={handleClose}
        severity={snackBarData.severity}
        sx={{ width: "100%" }}
      >
        {snackBarData.message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
