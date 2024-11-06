import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import "../styles/JobAd.css";
import JobAdSidebar from "../components/JobAdSidebar";
import JobAdDetails from "../components/JobAdDetails";
import { useParams } from "react-router-dom";
import { getJobPostDetails, getUserDetails } from "../action/userActions";

const JobAdPage = () => {
  const [userInfo] = useState(JSON.parse(localStorage.getItem("userInfo")));
  const [loading, setLoading] = useState(false);
  const [jobAdDetails, setJobAdDetails] = useState();
  const [userDetails, setUserDetails] = useState();

  const { id } = useParams();

  const getJobAdDetails = async () => {
    setLoading(true);
    await getJobPostDetails(id).then(async (res) => {
      console.log(res);
      setJobAdDetails(res);
      await getUserDetails(res.userID).then((user) => {
        console.log(user);
        setUserDetails(user);
        setLoading(false);
      });
    });
  };

  useEffect(() => {
    getJobAdDetails();
  }, []);
  return (
    <div>
      <Header />
      {loading ? (
        <div>Loading</div>
      ) : (
        <div className="job-ad-contents">
          <JobAdSidebar
            userDetails={userDetails}
            jobAdDetails={jobAdDetails}
            userInfo={userInfo}
          />
          <JobAdDetails
            jobAdDetails={jobAdDetails}
            userDetails={userDetails}
            userInfo={userInfo}
          />
        </div>
      )}
    </div>
  );
};

export default JobAdPage;
