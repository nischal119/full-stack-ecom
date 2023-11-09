import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const GuestGaurd = (props) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  useEffect(() => {
    if (isLoggedIn) navigate("/home", { replace: true });
    if (!isLoggedIn && pathname === "/") navigate("/login", { replace: true });
    // if (!isLoggedIn) navigate("/login", { replace: true });
  }, [isLoggedIn, navigate, pathname]);
  return props.children;
};

export default GuestGaurd;
