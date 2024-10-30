import React, { useEffect } from "react";
import "../styles/DashboardTradie.css";
import DefaultProfilePicture from "../assets/images/default-profile-picture.png";
import { Link } from "react-router-dom";

const DashboardSidebar = ({ profile }) => {
  useEffect(() => {
    console.log(profile);
  }, []);
  if (profile) {
    return (
      <div className="dashboard-sidebar gray-bg">
        <div className="mb-32 gray-bg">
          <div className="flex-center gray-bg mb-16">
            {profile.profilePicture ? (
              <img
                className="dashboard-sidebar-img"
                src={profile.profilePicture}
                width={100}
                height={100}
              />
            ) : (
              <img
                className="dashboard-sidebar-img"
                src={DefaultProfilePicture}
                width={100}
                height={100}
              />
            )}
            <div className="status-available flex-center">
              <div className="green-dot" />
              Available for work
            </div>
          </div>
          <h1 className="mb-16 gray-bg dashboard-sidebar-h1">
            {profile.firstName + " " + profile.lastName}
          </h1>
          <div className="gray-bg dashboard-sidebar-status">
            <div className="gray-bg mb-8">
              Active Jobs:{" "}
              <span className="gray-bg dashboard-sidebar-num">
                {profile.activeJobs}
              </span>
            </div>
            <div className="gray-bg mb-8">
              Pending Offers:{" "}
              <span className="gray-bg dashboard-sidebar-num">
                {profile.pendingOffers}
              </span>
            </div>
            <div className="gray-bg mb-8">
              Completed Jobs:{" "}
              <span className="gray-bg dashboard-sidebar-num">
                {profile.completedJobs}
              </span>
            </div>
            <div className="gray-bg">
              Estimated Earnings:{" "}
              <span className="gray-bg dashboard-sidebar-num">
                {profile.estimatedEarnings}
              </span>
            </div>
          </div>
        </div>
        <Link to={`/profile/${profile._id}`}>
          <button className="dashboard-sidebar-btn gray-bg pointer">
            Customize your profile
          </button>
        </Link>
      </div>
    );
  }
};

export default DashboardSidebar;
