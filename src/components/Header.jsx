import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logos/header.png";
import "../styles/Header.css";
import {
  ArrowLeft,
  Bell,
  CircleUserRound,
  Heart,
  Mail,
  MapPin,
  Menu,
  X,
} from "lucide-react";
import DefaultProfilePicture from "../assets/images/default-profile-picture.png";
import BrodLogo from "../assets/logos/header.png";
import { useMediaQuery } from "react-responsive";

const Header = ({ notHidden = true }) => {
  const isMobile = useMediaQuery({ query: "(max-width:768px)" });

  const [userInfo] = useState(JSON.parse(localStorage.getItem("userInfo")));
  const [showProfile, setShowProfile] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [postalCode, setPostalCode] = useState();
  const [name, setName] = useState();
  const [profilePicture, setProfilePicture] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setPostalCode(userInfo.postalCode);
      setProfilePicture(userInfo.profilePicture);
    }
  }, [userInfo]);

  const logOutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <div className="header">
      <header>
        {isMobile && userInfo ? (
          <div className="flex-center gap-4">
            {showMenu ? (
              <X
                color="#8C8C8C"
                className="pointer"
                onClick={() => setShowMenu(false)}
              />
            ) : (
              <Menu
                color="#8C8C8C"
                className="pointer"
                onClick={() => setShowMenu(true)}
              />
            )}
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
          </div>
        ) : (
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
        )}
        {userInfo ? (
          userInfo.role === "Admin" ||
          (userInfo.status !== "Approved" && userInfo.role === "Tradie") ? (
            <div className="header-links">
              <img
                src={DefaultProfilePicture}
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
                    <Link
                      to={`/profile/${userInfo.userId}`}
                      className="link-none mb-16"
                    >
                      My Account
                    </Link>
                    <div className="pointer" onClick={logOutHandler}>
                      Log out
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            !isMobile && (
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
                {userInfo.profilePicture ? (
                  <img
                    src={profilePicture}
                    width={32}
                    height={32}
                    className="header-img"
                    onClick={() => setShowProfile(!showProfile)}
                  />
                ) : (
                  <img
                    src={DefaultProfilePicture}
                    width={32}
                    height={32}
                    className="header-img"
                    onClick={() => setShowProfile(!showProfile)}
                  />
                )}
                {showProfile && (
                  <div className="header-profile">
                    <Link
                      to={`/profile/${userInfo.userId}`}
                      className="link-none block mb-16"
                    >
                      My Account
                    </Link>
                    <div className="pointer" onClick={logOutHandler}>
                      Log out
                    </div>
                  </div>
                )}
              </div>
            )
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
          {!isMobile && (
            <div className="remove-notif" onClick={() => setShowNotif(false)}>
              <X
                width={32}
                height={32}
                color="#717171"
                className="close-notif pointer"
              />
            </div>
          )}
          <div className="notif-contents">
            {isMobile ? (
              <div className="flex-center gap-8 mb-8">
                <ArrowLeft
                  color="#717171"
                  className="pointer"
                  onClick={() => setShowNotif(false)}
                />
                <h1 className="notif-h1">Notifications</h1>
              </div>
            ) : (
              <>
                <h1 className="notif-h1 mb-16">Notifications</h1>
                <div className="notif-separator mb-8" />
              </>
            )}
            <div className="notif-items flex-center mb-8">
              <img
                src={BrodLogo}
                width={48}
                height={48}
                className="notif-item-img"
              />
              <div className="notif-item-text">
                <div className="mb-4">
                  Welcome to Brod ! We’re excited to have you on board. You can
                  now start receiving job service requests from clients, update
                  your profile, and explore new opportunities.
                </div>
                <div className="notif-item-date">March 1, 2024</div>
              </div>
              <X
                width={16}
                height={16}
                color="#222222"
                className="pointer notif-delete"
              />
            </div>
          </div>
        </div>
      )}

      {showMenu && isMobile && (
        <div className="header-menu-container scroll-lock">
          <div className="header-menu">
            <div className="flex-center gap-16 mb-24">
              <img
                src={profilePicture}
                width={60}
                height={60}
                className="header-img"
              />
              <div>
                <div className="header-name mb-4">{name}</div>
                <div className="header-loc flex-center gap-8">
                  <MapPin width={20} height={20} color="#8C8C8C" />
                  {postalCode}
                </div>
              </div>
            </div>
            <div className="mb-24">
              <Link
                to={`/profile/${userInfo.userId}`}
                className="link-none flex-center gap-12 mb-16"
              >
                <CircleUserRound color="#8C8C8C" />
                My Account
              </Link>
              <Link
                to={"/favorites"}
                className="link-none flex-center gap-12 mb-16"
              >
                <Heart color="#8C8C8C" />
                My Favorites
              </Link>
              <div className="flex-center gap-12 mb-16">
                <Mail color="#8C8C8C" />
                Inbox
              </div>
              <div
                className="flex-center gap-12 pointer"
                onClick={() => setShowNotif(!showNotif)}
              >
                <Bell color="#8C8C8C" />
                Notifications
              </div>
            </div>
            <div className="header-line mb-24"></div>
            <div className="pointer" onClick={logOutHandler}>
              Log out
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
