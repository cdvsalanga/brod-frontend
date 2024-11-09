import React, { useEffect, useState } from "react";
import "../styles/Services.css";
import Card from "./Card";
import { ArrowRight } from "lucide-react";
import { useLocation } from "react-router-dom";

const ServicesList = ({ content, services, userInfo }) => {
  const [loading, setLoading] = useState(false);
  const [recommendedServices, setRecommendedServices] = useState([]);
  const [nearServices, setNearServices] = useState([]);

  const { search } = useLocation();

  const searchSplit = search.split("=");

  const searchResult = searchSplit[1];

  useEffect(() => {
    if (services) {
      console.log(services);
      if (content === "recommend") {
        setLoading(true);
        const randomServices = [...recommendedServices];
        for (let i = 0; i < 8; i++) {
          const random = Math.floor(Math.random() * services.length);
          if (!randomServices.includes(services[random])) {
            randomServices.push(services[random]);
          }
        }
        console.log(randomServices);
        setRecommendedServices(randomServices);
        setLoading(false);
      } else if (content === "near") {
        setNearServices(
          services.filter(
            (service) => service.businessPostcode === userInfo.postCode
          )
        );
      }
    }
  }, []);
  return loading ? (
    <div>Loading</div>
  ) : (
    <div className="services">
      <div
        className={
          content === "near"
            ? "services-near"
            : content === "recommend"
            ? "services-recommend"
            : content === "favorites"
            ? "services-favorites"
            : "services-search"
        }
      >
        <div className="services-flex-h1">
          <h1 className="services-h1">
            {content === "near"
              ? "Services Near You"
              : content === "recommend"
              ? "Recommend"
              : content === "search"
              ? `Results for "${searchResult}"`
              : content === "favorites"
              ? "My Favorites"
              : ""}
          </h1>
          {content === "search" && (
            <span className="services-search-results">results</span>
          )}
        </div>
        <div className="services-cards">
          {content === "recommend"
            ? recommendedServices &&
              recommendedServices.map((service) => (
                <Card
                  width={content === "search" ? "search" : ""}
                  service={service}
                  key={service._id}
                />
              ))
            : content === "near"
            ? nearServices &&
              nearServices.map((service) => (
                <Card
                  width={content === "search" ? "search" : ""}
                  service={service}
                  key={service._id}
                />
              ))
            : services &&
              services.map((service) => (
                <Card
                  width={content === "search" ? "search" : ""}
                  service={service}
                  key={service._id}
                />
              ))}
        </div>
        {content === "near" && (
          <button className="services-near-btn flex-center gap-4 pointer">
            See all
            <ArrowRight color="#1F1F23" className="services-near-icon" />
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
