import React, { useEffect } from "react";
import "../styles/DashboardTradie.css";
import DefaultProfilePicture from "../assets/images/default-profile-picture.png";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const DashboardSidebar = ({ profile }) => {
  const isMobile = useMediaQuery({ query: "(max-width:768px)" });

  useEffect(() => {
    console.log(profile);
  }, []);

  if (profile) {
    return (
      <div className="dashboard-sidebar gray-bg">
        <div className={isMobile ? "mb-24 gray-bg" : "mb-32 gray-bg"}>
          <div className="dashboard-details-container gray-bg">
            <div className={isMobile ? "gray-bg" : "flex-center gray-bg mb-16"}>
              <img
                className="dashboard-sidebar-img"
                src={
                  profile.profilePicture
                    ? profile.profilePicture
                    : DefaultProfilePicture
                }
                width={isMobile ? 60 : 100}
                height={isMobile ? 60 : 100}
              />
              {/* {!isMobile &&
                (profile.publishedAds > 0 ? (
                  <div className="status-available flex-center">
                    <div className="green-dot" />
                    Available for work
                  </div>
                ) : (
                  <div className="status-not-available">
                    Not available for work
                  </div>
                ))} */}
            </div>
            <div className="gray-bg">
              <div className="dashboard-name-status gray-bg">
                <h1 className="gray-bg dashboard-sidebar-h1">
                  {profile.firstName + " " + profile.lastName}
                </h1>
                {/* {isMobile &&
                  (profile.publishedAds > 0 ? (
                    <div className="dashboard-status flex-center">
                      <div className="green-dot" />
                      Available for work
                    </div>
                  ) : (
                    <div className="dashboard-status-not">
                      Not available for work
                    </div>
                  ))} */}
              </div>
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
          </div>
        </div>
        {isMobile && (
          <Link to={"/tradesperson/post-job-ad"} className="link-none">
            <button className="dashboard-sidebar-btn-blk pointer">
              Post job ad
            </button>
          </Link>
        )}
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
