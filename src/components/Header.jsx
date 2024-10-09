import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logos/header.png";
import "../styles/Header.css";
import { Bell, Heart, Mail, X } from "lucide-react";
import CardImage from "../assets/images/card-image.png";
import Notifications from "./Notifications";

const Header = ({ notHidden = true }) => {
  const [userInfo] = useState(JSON.parse(localStorage.getItem("userInfo")));
  const [showProfile, setShowProfile] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const navigate = useNavigate();

  const logOutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <>
      {showNotif && (
        <div className="notification scroll-lock">
          <div className="remove-notif" onClick={() => setShowNotif(false)}>
            <X
              width={32}
              height={32}
              color="#717171"
              className="close-notif pointer"
            />
          </div>
          <Notifications />
        </div>
      )}
      <header>
        <Link to="/">
          <img src={logo} className="header-logo" />
        </Link>
        {userInfo ? (
          <div className="header-links">
            <Bell
              className="header-link"
              width={32}
              height={32}
              color="#8C8C8C"
              onClick={() => setShowNotif(!showNotif)}
            />
            <Mail
              className="header-link"
              width={32}
              height={32}
              color="#8C8C8C"
            />
            <Link to={"/favorites"}>
              <Heart
                className="header-link"
                width={32}
                height={32}
                color="#5F6368"
              />
            </Link>
            <img
              src={CardImage}
              width={32}
              height={32}
              className="header-img"
              onClick={() => setShowProfile(!showProfile)}
            />
            {showProfile && (
              <div className="header-profile">
                <div
                  className="mb-16 header-link"
                  onClick={() => navigate(`/profile/${userInfo.userId}`)}
                >
                  My Account
                </div>
                <div className="header-link" onClick={logOutHandler}>
                  Log out
                </div>
              </div>
            )}
          </div>
        ) : (
          notHidden && (
            <div className={"header-btns"}>
              <Link to="/login" className="login-btn">
                Log in
              </Link>
              <span className="divider" />
              <Link to="/signup" className="signup-btn">
                Sign Up
              </Link>
            </div>
          )
        )}
      </header>
    </>
  );
};

export default Header;
