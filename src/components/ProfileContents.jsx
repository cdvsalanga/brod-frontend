import React, { useState } from "react";
import "../styles/Profile.css";
import ProfileContentItem from "./ProfileContentItem";
import { Link } from "react-router-dom";

const ProfileContents = ({ role }) => {
  const [item, setItem] = useState(role === "Client" ? "job" : "publish");
  return (
    <div className="profile-contents">
      {role === "Client" ? (
        <div className="mb-16">
          <h1 className="profile-content-h1 mb-16">My Account</h1>
          <div className="profile-navs">
            <div
              className={item === "job" ? "profile-nav-active" : "profile-nav"}
              onClick={() => setItem("job")}
            >
              In Progress Jobs (2)
            </div>
            <div
              className={
                item === "offer" ? "profile-nav-active" : "profile-nav"
              }
              onClick={() => setItem("offer")}
            >
              Sent Offers (2)
            </div>
            <div
              className={
                item === "complete" ? "profile-nav-active" : "profile-nav"
              }
              onClick={() => setItem("complete")}
            >
              Completed (2)
            </div>
            <div
              className={
                item === "bookmark" ? "profile-nav-active" : "profile-nav"
              }
              onClick={() => setItem("bookmark")}
            >
              Bookmarked (2)
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-16">
          <div className="flex-between mb-16">
            <h1 className="profile-content-h1">My Account</h1>
            <Link to={"/tradesperson/post-job-ad"} className="link-none">
              <button className="profile-post-btn pointer">
                Post a job ad
              </button>
            </Link>
          </div>
          <div className="profile-navs">
            <div
              className={
                item === "publish" ? "profile-nav-active" : "profile-nav"
              }
              onClick={() => setItem("publish")}
            >
              Published Ads (1)
            </div>
            <div
              className={
                item === "unpublish" ? "profile-nav-active" : "profile-nav"
              }
              onClick={() => setItem("unpublish")}
            >
              Unpublished Ads (1)
            </div>
            <div
              className={
                item === "complete" ? "profile-nav-active" : "profile-nav"
              }
              onClick={() => setItem("complete")}
            >
              Completed Jobs (1)
            </div>
          </div>
        </div>
      )}

      <ProfileContentItem item={item} role={role} />
    </div>
  );
};

export default ProfileContents;
