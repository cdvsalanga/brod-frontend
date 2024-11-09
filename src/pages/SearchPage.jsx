import React from "react";
import Header from "../components/Header";
import ServicesHeader from "../components/ServicesHeader";
import SearchSideBar from "../components/SearchSideBar";
import ServicesList from "../components/ServicesList";
import Footer from "../components/Footer";
import "../styles/Search.css";

const SearchPage = () => {
  return (
    <>
      <Header />
      <ServicesHeader />
      <div className="search-body-container">
        <div className="search-body">
          <SearchSideBar />
          <ServicesList content="search" />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SearchPage;
