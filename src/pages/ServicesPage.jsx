import React from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ServicesHeader from "../components/ServicesHeader";
import { ArrowRight } from "lucide-react";

const ServicesPage = () => {
  return (
    <>
      <Header />
      <ServicesHeader />
      <div className="services">
        <div className="services-near">
          <h1 className="services-h1">Services Near You</h1>
          <button className="services-btn">
            <span>See all</span>
            <ArrowRight className="services-icon" />
          </button>
          <div className="services-cards">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
        <div className="services-recommend">
          <h1 className="services-h1">Recommended</h1>
          <div className="services-cards">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ServicesPage;
