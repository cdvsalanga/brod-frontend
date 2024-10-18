import React, { useEffect, useState } from "react";
import "../styles/SignUpInfo.css";
import Header from "../components/Header";
import TradespersonInfoForm from "../components/TradespersonInfoForm";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../action/userActions";

const SignUpInfoPage = () => {
  return (
    <>
      <Header notHidden={false} />
      <TradespersonInfoForm page="signup" />
    </>
  );
};

export default SignUpInfoPage;
