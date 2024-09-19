import React from "react";
import Header from "../components/Header";
import "../styles/JobAd.css";
import JobAdSidebar from "../components/JobAdSidebar";
import JobAdDetails from "../components/JobAdDetails";

const JobAdPage = () => {
  return (
    <div>
      <Header />
      <div className="job-ad-contents">
        <JobAdSidebar />
        <JobAdDetails />
      </div>
    </div>
  );
};

export default JobAdPage;
