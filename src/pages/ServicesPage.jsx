import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ServicesHeader from "../components/ServicesHeader";
import ServicesList from "../components/ServicesList";
import { getAllServices } from "../action/userActions";

const ServicesPage = () => {
  const [allServices, setAllServices] = useState([]);

  useEffect(() => {
    const getServices = getAllServices();
    getServices.then((res) => {
      setAllServices(res);
    });
  }, []);
  return (
    <>
      <Header />
      <ServicesHeader />
      <ServicesList content="recommend" services={allServices} />
      <ServicesList content="near" />
      <Footer />
    </>
  );
};

export default ServicesPage;
