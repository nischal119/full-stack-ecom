import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GuestGaurd = (props) => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  useEffect(() => {
    if (isLoggedIn) navigate("/home", { replace: true });

    // if (!isLoggedIn) navigate("/login", { replace: true });
  }, [isLoggedIn, navigate]);
  return props.children;
};

export default GuestGaurd;
