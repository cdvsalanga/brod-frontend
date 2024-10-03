import React from "react";
import Header from "../components/Header";
import DashboardSidebar from "../components/DashboardSidebar";
import "../styles/DashboardTradie.css";
import DashboardContents from "../components/DashboardContents";

const DashboardTradiePage = () => {
  return (
    <div>
      <Header />
      <div className="dashboard-tradie flex-between">
        <DashboardSidebar />
        <DashboardContents />
      </div>
    </div>
  );
};

export default DashboardTradiePage;
