import React, { useState } from "react";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FaShoppingCart } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { Avatar, Badge, Button } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { BiExit } from "react-icons/bi";

import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { useQuery } from "react-query";
import { getCartCount } from "../lib/cart.api";

const Header = () => {
  const userRole = localStorage.getItem("userRole");
  const [searchText, setSearchText] = useState([]);
  console.log(searchText);
  const navigate = useNavigate();
  const userFirstName = localStorage.getItem("firstName");

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const { data, isLoading } = useQuery({
    queryKey: ["cart-item-count"],
    queryFn: () => getCartCount(),
  });

  return (
    <div>
      <div>
        <Navbar style={{}} className=" mb-3" bg="dark">
          <Container
            fluid
            className="nav"
            style={{
              margin: "0",
              padding: "0",
              boxShadow:
                "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
            }}
          >
            <Navbar.Brand href="/">
              <img
                style={{ width: "260px", margin: "0" }}
                src="../../../public/Image resources/logo.png"
                alt=""
              />
            </Navbar.Brand>

            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-`}
              aria-labelledby={`offcanvasNavbarLabel-expand`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  className="justify-content-end flex-grow-1 pe-3"
                >
                  <NavLink
                    to="/home"
                    className="links"
                    style={{
                      fontSize: "18px",
                      color: "white",
                      padding: "30px",
                      textDecoration: "none",
                    }}
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/products"
                    style={{
                      fontSize: "18px",
                      color: "white",
                      padding: "30px",
                      textDecoration: "none",
                    }}
                  >
                    Products
                  </NavLink>

                  <NavLink
                    to="/about"
                    style={{
                      fontSize: "18px",
                      color: "white",
                      padding: "30px",
                      textDecoration: "none",
                    }}
                  >
                    About
                  </NavLink>
                </Nav>
                {userRole === "buyer" && (
                  <NavLink
                    to="/cart"
                    style={{
                      fontSize: "25px",
                      alignSelf: "center",
                      color: "white",
                      marginRight: "10px",
                    }}
                  >
                    <Badge
                      badgeContent={data?.data?.itemCount || "0"}
                      color="primary"
                    >
                      <FaShoppingCart />
                    </Badge>
                  </NavLink>
                )}
                <div style={{ fontSize: "20px", margin: "5px" }}>
                  <span
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "10px",
                    }}
                  >
                    <Avatar alt="Remy Sharp" src="" />
                    <p style={{ color: "white" }}>
                      {" "}
                      Namastey {userFirstName} !
                    </p>
                    <Button
                      color="error"
                      aria-describedby={id}
                      variant="contained"
                      onClick={handleClick}
                    >
                      <BiExit />
                    </Button>
                  </span>
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                  >
                    <Typography sx={{ p: 2 }}>
                      <div style={{}}>
                        <h5 style={{ textAlign: "center" }}>Log out?</h5>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Button
                            sx={{ marginRight: "20px" }}
                            variant="contained"
                            color="success"
                            onClick={handleClose}
                          >
                            NO
                          </Button>
                          <Button
                            onClick={() => {
                              localStorage.clear();
                              navigate("/login");
                            }}
                            variant="contained"
                            color="error"
                          >
                            Yes
                          </Button>
                        </div>
                      </div>
                    </Typography>
                  </Popover>
                </div>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
        {/* ))} */}
      </div>
    </div>
  );
};

export default Header;
