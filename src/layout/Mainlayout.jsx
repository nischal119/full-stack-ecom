import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import CustomSnackbar from "../components/CustomSnackbar";

const Mainlayout = () => {
  return (
    <div>
      <>
        <CustomSnackbar />
        <Header />
        <Outlet />
      </>
    </div>
  );
};

export default Mainlayout;
