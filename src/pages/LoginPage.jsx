import React from "react";
import Header from "../components/Header";
import LoginBox from "../components/LoginBox";
import { useMediaQuery } from "react-responsive";
import Cookies from "../components/Cookies";

const LoginPage = () => {
  const acceptedCookies = document.cookie.includes("Brod");
  const isMobile = useMediaQuery({ query: "(max-width:768px)" });

  return (
    <>
      <Header notHidden={isMobile && false} />
      <LoginBox />
      {!acceptedCookies && <Cookies showCookies={true} />}
    </>
  );
};

export default LoginPage;
