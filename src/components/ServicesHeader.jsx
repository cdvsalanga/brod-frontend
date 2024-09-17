import React from "react";
import "../styles/Services.css";

const ServicesHeader = () => {
  return (
    <div className="services-header">
      <h1 className="services-header-h1">
        Find Skilled Tradespeople for Your Needs
      </h1>
      <form className="services-header-form">
        <input
          type="text"
          className="services-header-input"
          placeholder="Search for a service (e.g., Electrician)"
        />
        <button className="services-header-btn">Search</button>
      </form>
    </div>
  );
};

export default ServicesHeader;
