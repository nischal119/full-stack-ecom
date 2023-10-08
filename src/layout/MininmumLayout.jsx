import React from "react";
import { Outlet } from "react-router-dom";
import CustomSnackbar from "../components/CustomSnackbar";

const MininmumLayout = () => {
  return (
    <div>
      <CustomSnackbar />
      <Outlet />
    </div>
  );
};

export default MininmumLayout;
