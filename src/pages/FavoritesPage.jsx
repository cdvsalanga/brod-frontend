import React from "react";
import Header from "../components/Header";
import ServicesList from "../components/ServicesList";
import Footer from "../components/Footer";

const FavoritesPage = () => {
  return (
    <div>
      <Header />
      <ServicesList content="favorites" />
      <Footer />
    </div>
  );
};

export default FavoritesPage;
