import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ServicesHeader from "../components/ServicesHeader";
import ServicesList from "../components/ServicesList";
import { getAllServices } from "../action/userActions";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loading-icons";
import { getJobsByStatusClient } from "../action/clientActions";

const ServicesPage = () => {
  const [userInfo] = useState(JSON.parse(localStorage.getItem("userInfo")));
  const [allServices, setAllServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);

  const navigate = useNavigate();

  const getServicesData = async () => {
    await getAllServices().then(async (res) => {
      setAllServices(res);
      const status = "Bookmarked";
      await getJobsByStatusClient(userInfo.userId, status, userInfo.token).then(
        (jobs) => {
          setBookmarks(jobs);
          setLoading(false);
        }
      );
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
        <div className="loading loading-page">
          <TailSpin stroke="#1f1f23" speed={1} />
        </div>
      ) : (
        <>
          <ServicesHeader />
          <ServicesList
            content="recommend"
            services={allServices}
            bookmarks={bookmarks}
          />
          <ServicesList
            content="near"
            services={allServices}
            bookmarks={bookmarks}
          />
        </>
      )}
      <Footer />
    </>
  );
};

export default ServicesPage;
