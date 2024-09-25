import React, { useState } from "react";
import "../styles/Profile.css";
import ProfileContentItem from "./ProfileContentItem";

const ProfileContents = () => {
  const [item, setItem] = useState("job");
  return (
    <div className="profile-contents">
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
            className={item === "offer" ? "profile-nav-active" : "profile-nav"}
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
      <ProfileContentItem item={item} />
    </div>
  );
};

export default ProfileContents;
