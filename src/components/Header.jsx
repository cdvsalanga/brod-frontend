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
    <div className="header">
      <header>
        <Link
          to={
            userInfo
              ? userInfo.role === "Client"
                ? "/services"
                : userInfo.role === "Tradie"
                ? `/tradesperson/dashboard/${userInfo.userId}`
                : "/admin"
              : "/"
          }
        >
          <img src={logo} className="header-logo" />
        </Link>
        {userInfo ? (
          userInfo.role === "Admin" ||
          (userInfo.status !== "Approved" && userInfo.role === "Tradie") ? (
            <div className="header-links">
              <img
                src={CardImage}
                width={32}
                height={32}
                className="header-img"
                onClick={() => setShowProfile(!showProfile)}
              />
              {showProfile &&
                (userInfo.role === "Admin" ||
                (userInfo.status !== "Approved" &&
                  userInfo.role === "Tradie") ? (
                  <div className="header-profile header-w-91">
                    <div className="pointer" onClick={logOutHandler}>
                      Log out
                    </div>
                  </div>
                ) : (
                  <div className="header-profile">
                    <div
                      className="mb-16 pointer"
                      onClick={() => navigate(`/profile/${userInfo.userId}`)}
                    >
                      My Account
                    </div>
                    <div className="pointer" onClick={logOutHandler}>
                      Log out
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="header-links">
              <Bell
                className="pointer"
                width={32}
                height={32}
                color="#8C8C8C"
                onClick={() => setShowNotif(!showNotif)}
              />
              <Mail
                className="pointer"
                width={32}
                height={32}
                color="#8C8C8C"
              />
              {userInfo.role === "Client" && (
                <Link to={"/favorites"}>
                  <Heart
                    className="pointer"
                    width={32}
                    height={32}
                    color="#5F6368"
                  />
                </Link>
              )}
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
                    className="mb-16 pointer"
                    onClick={() => navigate(`/profile/${userInfo.userId}`)}
                  >
                    My Account
                  </div>
                  <div className="pointer" onClick={logOutHandler}>
                    Log out
                  </div>
                </div>
              )}
            </div>
          )
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
    </div>
  );
};

export default Header;
