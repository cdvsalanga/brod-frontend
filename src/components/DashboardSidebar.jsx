import React from "react";
import "../styles/DashboardTradie.css";
import CardImage from "../assets/images/card-image.png";

const DashboardSidebar = () => {
  return (
    <div className="dashboard-sidebar gray-bg">
      <div className="mb-32 gray-bg">
        <div className="flex-center gray-bg mb-16">
          <img
            className="dashboard-sidebar-img"
            src={CardImage}
            width={100}
            height={100}
          />
          <div className="dashboard-sidebar-availability flex-center">
            <div className="green-dot" />
            Available for work
          </div>
        </div>
        <h1 className="mb-16 gray-bg dashboard-sidebar-h1">Ian Arceta</h1>
        <div className="gray-bg dashboard-sidebar-status">
          <div className="gray-bg mb-8">
            Active Jobs:{" "}
            <span className="gray-bg dashboard-sidebar-num">1</span>
          </div>
          <div className="gray-bg mb-8">
            Pending Offers:{" "}
            <span className="gray-bg dashboard-sidebar-num">1</span>
          </div>
          <div className="gray-bg mb-8">
            Completed Jobs:{" "}
            <span className="gray-bg dashboard-sidebar-num">5</span>
          </div>
          <div className="gray-bg">
            Estimated Earnings:{" "}
            <span className="gray-bg dashboard-sidebar-num">5200AUD</span>
          </div>
        </div>
      </div>
      <button className="dashboard-sidebar-btn gray-bg">
        Customize your profile
      </button>
    </div>
  );
};

export default DashboardSidebar;
