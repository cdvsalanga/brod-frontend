import React, { useEffect, useState } from "react";
import "../styles/DashboardTradie.css";
import DashboardContentItem from "./DashboardContentItem";
import { Link } from "react-router-dom";
import { getJobsByStatusTradie } from "../action/tradieActions";
import { useMediaQuery } from "react-responsive";
import { TailSpin } from "react-loading-icons";

const DashboardContents = ({ userInfo }) => {
  const isMobile = useMediaQuery({ query: "(max-width:768px)" });

  const [item, setItem] = useState("job");
  const [loading, setLoading] = useState(false);
  const [token] = useState(userInfo && userInfo.token);
  const [userId] = useState(userInfo && userInfo.userId);
  const [inProgressJobs, setInProgressJobs] = useState();
  const [pendingOffers, setPendingOffers] = useState();

  const getJobData = async () => {
    let status;
    await getJobsByStatusTradie(userId, (status = "In Progress"), token).then(
      (res) => {
        if (res && res.status === 401) {
          alert("Your session expired, please login again.");
          localStorage.removeItem("userInfo");
          navigate("/login");
          return;
        }
        setInProgressJobs(res);
      }
    );

    await getJobsByStatusTradie(userId, (status = "Pending"), token).then(
      (res) => {
        if (res && res.status === 401) {
          alert("Your session expired, please login again.");
          localStorage.removeItem("userInfo");
          navigate("/login");
          return;
        }
        setPendingOffers(res);
      }
    );
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getJobData();
  }, []);

  return loading ? (
    <div className="loading loading-page">
      <TailSpin stroke="#1f1f23" speed={1} />
    </div>
  ) : (
    <div className="dashboard-contents">
      <div className="mb-16">
        <div className={isMobile ? "mb-12" : "flex-between mb-16"}>
          <h1 className="dashboard-content-h1">Dashboard</h1>
          {!isMobile && (
            <Link to={"/tradesperson/post-job-ad"} className="link-none">
              <button className="dashboard-content-btn pointer">
                Post a job ad
              </button>
            </Link>
          )}
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
