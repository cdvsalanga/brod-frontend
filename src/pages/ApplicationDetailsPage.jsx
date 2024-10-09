import React from "react";
import Header from "../components/Header";
import TradespersonInfoForm from "../components/TradespersonInfoForm";

const ApplicationDetailsPage = () => {
  return (
    <div>
      <Header />
      <TradespersonInfoForm page="admin" />
    </div>
  );
};

export default ApplicationDetailsPage;
