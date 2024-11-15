import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import ProfileContents from "../components/ProfileContents";
import ProfileSideBar from "../components/ProfileSideBar";
import { getUserDetails } from "../action/userActions";
import { useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { TailSpin } from "react-loading-icons";

const ProfilePage = () => {
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
      console.log(res);

      setRole(res.role);
      setProfileDetails(res);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (userInfo) {
      getProfileDetails();
      console.log(isMobile);
    } else {
      navigate("/login");
    }
  }, [isMobile]);

  return (
    <div>
      <Header headerText={"My Account"} />
      {loading ? (
        <div className="loading loading-page">
          <TailSpin
            stroke="#1f1f23"
            speed={1}
            className={isMobile && "gray-bg"}
          />
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
    </div>
  );
};

export default ProfilePage;
