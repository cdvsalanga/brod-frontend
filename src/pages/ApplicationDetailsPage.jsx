import React from "react";
import Header from "../components/Header";
import TradespersonInfoForm from "../components/TradespersonInfoForm";
import { useMediaQuery } from "react-responsive";

const ApplicationDetailsPage = () => {
  const isMobile = useMediaQuery({ query: "(max-width:768px)" });

  return (
    <div>
      {!isMobile && <Header />}
      <TradespersonInfoForm page="admin" />
    </div>
  );
};

export default ApplicationDetailsPage;
