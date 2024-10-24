import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import ProfileContents from "../components/ProfileContents";
import ProfileSideBar from "../components/ProfileSideBar";
import { getUserDetails } from "../action/userActions";
import { useNavigate, useParams } from "react-router-dom";

const ProfilePage = () => {
  const [userInfo] = useState(JSON.parse(localStorage.getItem("userInfo")));
  const [role, setRole] = useState();
  const [profileDetails, setProfileDetails] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  const getProfileDetails = async () => {
    setLoading(true);
    await getUserDetails(id).then((res) => {
      setRole(res.role);
      setProfileDetails(res);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (userInfo) {
      getProfileDetails();
    } else {
      navigate("/login");
    }
  }, [userInfo]);

  return (
    <div>
      <Header />
      {loading ? (
        <div>Loading</div>
      ) : (
        <div className="profile">
          <ProfileSideBar role={role} profile={profileDetails} />
          <ProfileContents
            role={role}
            userInfo={userInfo}
            profile={profileDetails}
          />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
