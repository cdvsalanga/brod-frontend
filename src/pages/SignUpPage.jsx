import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SignUpChoose from "../components/SignUpChoose";
import { useLocation } from "react-router-dom";
import SignUpBox from "../components/SignUpBox";

const SignupPage = () => {
  const { search } = useLocation();
  const [chosen, setChosen] = useState("");

  useEffect(() => {
    setChosen(search);
  }, [search]);
  return (
    <>
      <Header notHidden={false} />
      {chosen === "?client" ? (
        <SignUpBox chosen="client" />
      ) : chosen === "?tradesperson" ? (
        <SignUpBox chosen="tradesperson" />
      ) : (
        <SignUpChoose />
      )}
    </>
  );
};

export default SignupPage;
