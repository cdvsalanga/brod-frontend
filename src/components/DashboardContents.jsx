import React, { useEffect, useState } from "react";
import "../styles/DashboardTradie.css";
import DashboardContentItem from "./DashboardContentItem";
import { Link } from "react-router-dom";
import { getJobsByStatus } from "../action/tradieActions";

const DashboardContents = ({ userInfo }) => {
  const [item, setItem] = useState("job");
  const [loading, setLoading] = useState(false);
  const [token] = useState(userInfo && userInfo.token);
  const [userId] = useState(userInfo && userInfo.userId);
  const [inProgressJobs, setInProgressJobs] = useState();
  const [pendingOffers, setPendingOffers] = useState();

  const getJobData = async () => {
    let status;
    await getJobsByStatus(userId, (status = "In Progress"), token).then(
      (res) => {
        setInProgressJobs(res);
      }
    );

    await getJobsByStatus(userId, (status = "Pending"), token).then((res) => {
      setPendingOffers(res);
    });
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getJobData();
  }, []);

  return loading ? (
    <div>Loading</div>
  ) : (
    <div className="dashboard-contents">
      <div className="mb-16">
        <div className="flex-between mb-16">
          <h1 className="dashboard-content-h1">Dashboard</h1>
          <Link to={"/tradesperson/post-job-ad"} className="link-none">
            <button className="dashboard-content-btn pointer">
              Post a job ad
            </button>
          </Link>
        </div>
        <div className="flex-center">
          <div
            className={
              item === "job"
                ? "dashboard-content-nav-active pointer"
                : "dashboard-content-nav pointer"
            }
            onClick={() => setItem("job")}
          >
            In Progress Jobs ({inProgressJobs && inProgressJobs.length})
          </div>
          <div
            className={
              item === "offer"
                ? "dashboard-content-nav-active pointer"
                : "dashboard-content-nav pointer"
            }
            onClick={() => setItem("offer")}
          >
            Pending Offers ({pendingOffers && pendingOffers.length})
          </div>
        </div>
      </div>
      <DashboardContentItem
        item={item}
        data={item === "job" ? inProgressJobs : pendingOffers}
        userInfo={userInfo}
      />
    </div>
  );
};

export default DashboardContents;
