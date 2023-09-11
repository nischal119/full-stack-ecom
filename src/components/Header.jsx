import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FaShoppingCart } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { Avatar, Badge } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
const Header = () => {
  const [searchText, setSearchText] = useState([]);
  console.log(searchText);
  const navigate = useNavigate();
  const userFirstName = localStorage.getItem("firstName");
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

                <Nav.Link
                  href="#action2"
                  style={{
                    fontSize: "25px",
                    padding: "30px",
                    color: "white",
                  }}
                >
                  <Badge badgeContent={1} color="primary">
                    <FaShoppingCart />
                  </Badge>
                </Nav.Link>
                <Nav.Link
                  href="#action2"
                  style={{ fontSize: "20px", marginLeft: "10px" }}
                >
                  <span
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Avatar alt="Remy Sharp" src="" />
                    Namastey {userFirstName} !
                  </span>
                </Nav.Link>
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
