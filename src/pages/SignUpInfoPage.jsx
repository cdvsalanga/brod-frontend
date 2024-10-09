import React from "react";
import "../styles/SignUpInfo.css";
import Header from "../components/Header";
import TradespersonInfoForm from "../components/TradespersonInfoForm";

const SignUpInfoPage = () => {
  return (
    <>
      <Header notHidden={false} />
      <TradespersonInfoForm page="signup" />
    </>
  );
};

export default SignUpInfoPage;
