import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import ProfileContents from "../components/ProfileContents";
import { getUserDetails } from "../action/userActions";

const TradieJobAdsPage = () => {
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
      if (!isMobile) {
        navigate(`/profile/${userInfo.userId}`);
      } else {
        getProfileDetails();
      }
      console.log(isMobile);
    } else {
      navigate("/login");
    }
  }, [isMobile]);

  return (
    <div>
      <Header headerText={"My Job Ads"} />
      {loading ? (
        <div>Loading</div>
      ) : (
        <ProfileContents
          role={role}
          userInfo={userInfo}
          profile={profileDetails}
        />
      )}
    </div>
  );
};

export default TradieJobAdsPage;
