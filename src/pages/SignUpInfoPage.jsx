import React, { useEffect, useState } from "react";
import "../styles/SignUpInfo.css";
import Header from "../components/Header";
import TradespersonInfoForm from "../components/TradespersonInfoForm";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../action/userActions";
import Cookies from "../components/Cookies";

const SignUpInfoPage = () => {
  const acceptedCookies = document.cookie.includes("Brod");
  return (
    <>
      <Header notHidden={false} />
      <TradespersonInfoForm page="signup" />
      {!acceptedCookies && <Cookies showCookies={true} />}
    </>
  );
};

export default SignUpInfoPage;
