import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import DashboardSidebar from "../components/DashboardSidebar";
import "../styles/DashboardTradie.css";
import DashboardContents from "../components/DashboardContents";
import { getUserDetails } from "../action/userActions";
import { useNavigate, useParams } from "react-router-dom";

const DashboardTradiePage = () => {
  const [userInfo] = useState(JSON.parse(localStorage.getItem("userInfo")));
  const [loading, setLoading] = useState(false);
  const [profileDetails, setProfileDetails] = useState();

  const navigate = useNavigate();

  const { id } = useParams();

  const getProfileDetails = async () => {
    setLoading(true);
    await getUserDetails(id).then((res) => {
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
  }, []);

  return (
    <div>
      <Header />
      {loading ? (
        <div>Loading</div>
      ) : (
        <div className="dashboard-tradie">
          <DashboardSidebar profile={profileDetails} />
          <DashboardContents userInfo={userInfo} />
        </div>
      )}
    </div>
  );
};

export default DashboardTradiePage;
