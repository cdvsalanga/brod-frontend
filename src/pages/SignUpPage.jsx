import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SignUpChoose from "../components/SignUpChoose";
import { useLocation } from "react-router-dom";
import SignUpBox from "../components/SignUpBox";

const SignupPage = () => {
  const { search } = useLocation();
  const [chosen, setChosen] = useState("");

  useEffect(() => {
    setChosen(search.split("=")[1]);
  }, [search]);
  return (
    <>
      <Header notHidden={false} />
      {chosen === "client" ? (
        <SignUpBox chosen={chosen} />
      ) : chosen === "tradesperson" ? (
        <SignUpBox chosen={chosen} />
      ) : (
        <SignUpChoose />
      )}
    </>
  );
};

export default SignupPage;
