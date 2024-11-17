import React from "react";
import Header from "../components/Header";
import LoginBox from "../components/LoginBox";
import { useMediaQuery } from "react-responsive";

const LoginPage = () => {
  const isMobile = useMediaQuery({ query: "(max-width:768px)" });

  return (
    <>
      <Header notHidden={isMobile && false} />
      <LoginBox />
    </>
  );
};

export default LoginPage;
