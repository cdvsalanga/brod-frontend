import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logos/header.png";
import "../styles/Header.css";

const Header = ({ notHidden = true }) => {
  return (
    <header>
      <Link to="/">
        <img src={logo} className="header-logo" />
      </Link>

      {notHidden && (
        <div className="header-links">
          <Link to="/login" className="login-btn">
            Log in
          </Link>
          <span className="divider" />
          <Link to="/signup" className="signup-btn">
            Sign Up
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
