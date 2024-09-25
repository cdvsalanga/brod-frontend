import React from "react";
import "../styles/Header.css";
import { X } from "lucide-react";
import BrodLogo from "../assets/logos/header.png";

const Notifications = () => {
  return (
    <div className="notif-contents">
      <h1 className="notif-h1 mb-16">Notifications</h1>
      <div className="notif-separator mb-8" />
      <div className="notif-items flex-center mb-8">
        <img src={BrodLogo} width={48} height={48} className="notif-item-img" />
        <div className="notif-item-text">
          <div className="mb-4">
            Welcome to Brod ! We’re excited to have you on board. You can now
            start receiving job service requests from clients, update your
            profile, and explore new opportunities.
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
  );
};

export default Notifications;
