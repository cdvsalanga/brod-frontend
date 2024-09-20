import React from "react";
import "../styles/Services.css";
import Card from "./Card";
import { ArrowRight } from "lucide-react";

const ServicesList = ({ content }) => {
  return (
    <div className="services">
      <div
        className={
          content === "near"
            ? "services-near"
            : content === "recommend"
            ? "services-recommend"
            : content === "favorites"
            ? "services-favorites"
            : ""
        }
      >
        <div className="services-flex-h1">
          <h1 className="services-h1">
            {content === "near"
              ? "Services Near You"
              : content === "recommend"
              ? "Recommend"
              : content === "search"
              ? "Results for"
              : content === "favorites"
              ? "My Favorites"
              : ""}
          </h1>
          {content === "search" && (
            <span className="services-search-results">results</span>
          )}
        </div>
        <div className="services-cards">
          <Card width={content === "search" ? "search" : ""} />
          <Card width={content === "search" ? "search" : ""} />
          <Card width={content === "search" ? "search" : ""} />
          <Card width={content === "search" ? "search" : ""} />
          <Card width={content === "search" ? "search" : ""} />
          <Card width={content === "search" ? "search" : ""} />
        </div>
        {content === "near" && (
          <button className="services-near-btn flex-center">
            <span>See all</span>
            <ArrowRight className="services-near-icon" />
          </button>
        )}
        {content === "search" && (
          <button className="services-search-btn">See more</button>
        )}
      </div>
    </div>
  );
};

export default ServicesList;
