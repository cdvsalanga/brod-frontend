import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ServicesHeader from "../components/ServicesHeader";
import ServicesList from "../components/ServicesList";

const ServicesPage = () => {
  return (
    <>
      <Header />
      <ServicesHeader />
      <ServicesList content="near" />
      <ServicesList content="recommend" />
      <Footer />
    </>
  );
};

export default ServicesPage;
