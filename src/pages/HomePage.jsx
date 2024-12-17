import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Cookies from "../components/Cookies";

const HomePage = () => {
  const acceptedCookies = document.cookie.includes("Brod");
  return (
    <>
      <Header />
      <Hero />
      <Footer />
      {!acceptedCookies && <Cookies showCookies={true} />}
    </>
  );
};

export default HomePage;
