import React, { useState } from "react";
import Header from "../components/Header";
import ProfileContents from "../components/ProfileContents";
import ProfileSideBar from "../components/ProfileSideBar";

const ProfilePage = () => {
  const [role, setRole] = useState("Tradie");
  return (
    <div>
      <Header />
      <div className="profile">
        <ProfileSideBar role={role} />
        <ProfileContents role={role} />
      </div>
    </div>
  );
};

export default ProfilePage;
