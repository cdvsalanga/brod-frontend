import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ServicesHeader from "../components/ServicesHeader";
import ServicesList from "../components/ServicesList";
import { getAllServices } from "../action/userActions";
import { useNavigate } from "react-router-dom";

const ServicesPage = () => {
  const [userInfo] = useState(JSON.parse(localStorage.getItem("userInfo")));
  const [allServices, setAllServices] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const getServicesData = async () => {
    await getAllServices().then((res) => {
      setAllServices(res);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (userInfo) {
      setLoading(true);
      getServicesData();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <Header />
      {loading ? (
        <div>Loading</div>
      ) : (
        <>
          <ServicesHeader />
          <ServicesList content="recommend" services={allServices} />
          <ServicesList content="near" userInfo={userInfo} />
        </>
      )}
      <Footer />
    </>
  );
};

export default ServicesPage;
