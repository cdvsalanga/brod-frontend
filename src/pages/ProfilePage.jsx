import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import ProfileContents from "../components/ProfileContents";
import ProfileSideBar from "../components/ProfileSideBar";
import { getUserDetails } from "../action/userActions";
import { useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { TailSpin } from "react-loading-icons";
import Cookies from "../components/Cookies";

const ProfilePage = () => {
  const acceptedCookies = document.cookie.includes("Brod");
  const isMobile = useMediaQuery({ query: "(max-width:768px)" });

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
  }, [isMobile]);

  return (
    <div>
      <Header headerText={"My Account"} />
      {loading ? (
        <div className="loading loading-page">
          <TailSpin stroke="#1f1f23" speed={1} />
        </div>
      ) : (
        <div className="profile">
          <ProfileSideBar
            role={role}
            profile={profileDetails}
            userInfo={userInfo}
          />
          {(!isMobile || role !== "Tradie") && (
            <ProfileContents
              role={role}
              userInfo={userInfo}
              profile={profileDetails}
            />
          )}
        </div>
      )}
      {!acceptedCookies && <Cookies showCookies={true} />}
    </div>
  );
};

export default ProfilePage;
