import React, { useState } from "react";
import "../styles/DashboardTradie.css";
import DashboardContentItem from "./DashboardContentItem";

const DashboardContents = () => {
  const [item, setItem] = useState("job");
  return (
    <div className="dashboard-contents">
      <div className="mb-16">
        <div className="flex-between mb-16">
          <h1 className="dashboard-content-h1">Dashboard</h1>
          <button className="dashboard-content-btn">Post a job ad</button>
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
            In Progress Jobs (1)
          </div>
          <div
            className={
              item === "offer"
                ? "dashboard-content-nav-active pointer"
                : "dashboard-content-nav pointer"
            }
            onClick={() => setItem("offer")}
          >
            Pending Offers (1)
          </div>
        </div>
      </div>
      <DashboardContentItem item={item} />
    </div>
  );
};

export default DashboardContents;
