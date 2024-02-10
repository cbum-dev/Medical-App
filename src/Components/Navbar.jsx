import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
// import useUserRole from '../Utils/CheckUser';
import axios from "axios";

export function CustomNavbar() {
  const [userRole, setUserRole] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const response = await axios.get(
          "https://medi-dep-bykw.vercel.app/check/",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        setUserRole(response.data.role);
      } catch (error) {
        console.error("Error checking user role:", error);
      }
    };

    checkUserRole();
  }, []);

  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      setIsAuth(true);
    }
  }, [isAuth]);

  return (
    <Navbar
      className="navvy py-2 sticky-top bg-dark"
      variant="dark"
      expand="lg"
    >
      <Navbar.Brand
        style={{ paddingLeft: "10px", fontWeight: "bold" }}
        href="/"
      >
        MedTalk
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto d-flex justify-content-center">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/blog" className="nav-link">
            Blog
          </Link>
          {isAuth && (
            <>
              <Link
                to={
                  userRole === "healthcare_provider"
                    ? "/book/provider"
                    : "/book"
                }
                className="nav-link"
              >
                View Appointments
              </Link>
              <Link to="/record" className="nav-link">
                View Reports
              </Link>
              <Link to="/chat" className="nav-link">
                Chat Room
              </Link>
            </>
          )}
          <Link to="/help" className="nav-link">
            Help Center
          </Link>
        </Nav>
        <button
          className="btn btn-primary text-white "
          style={{ marginLeft: "auto", marginRight: "15px" }}
        >
          {isAuth ? (
            <Link
              style={{ textDecoration: "None" }}
              className="Add text-white"
              to="/logout"
            >
              Logout
            </Link>
          ) : (
            <Link
              style={{ textDecoration: "None" }}
              className="login text-white"
              to="/login"
            >
              Login
            </Link>
          )}
        </button>
      </Navbar.Collapse>
    </Navbar>
  );
}
