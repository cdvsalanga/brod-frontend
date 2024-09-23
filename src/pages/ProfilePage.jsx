import React from "react";
import Header from "../components/Header";
import ProfileContents from "../components/ProfileContents";
import ProfileSideBar from "../components/ProfileSideBar";

const ProfilePage = () => {
  return (
    <div>
      <Header />
      <div className="profile">
        <ProfileSideBar />
        <ProfileContents />
      </div>
    </div>
  );
};

export default ProfilePage;
