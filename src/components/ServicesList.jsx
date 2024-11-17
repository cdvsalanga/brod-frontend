import React, { useEffect, useState } from "react";
import "../styles/Services.css";
import Card from "./Card";
import { ArrowRight } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const ServicesList = ({ content, services, bookmarks }) => {
  const isMobile = useMediaQuery({ query: "(max-width:768px)" });

  const [userInfo] = useState(JSON.parse(localStorage.getItem("userInfo")));
  const [recommendedServices, setRecommendedServices] = useState([]);
  const [nearServices, setNearServices] = useState([]);
  const [nearLimit, setNearLimit] = useState([]);
  const [searchServices, setSearchServices] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [seeMore, setSeeMore] = useState(
    services && services.length > 12 ? true : false
  );
  const [seeAll, setSeeAll] = useState(false);

  const { search } = useLocation();

  const searchSplit = search.split("=");

  const searchResult = searchSplit[1];

  useEffect(() => {
    if (services) {
      console.log(services);
      if (content === "recommend") {
        const randomServices = [...recommendedServices];
        for (let i = 0; i < 8; i++) {
          const random = Math.floor(Math.random() * services.length);
          if (!randomServices.includes(services[random])) {
            randomServices.push(services[random]);
          }
        }
        console.log(randomServices);
        setRecommendedServices(randomServices);
      } else if (content === "near") {
        let array = services.filter(
          (service) => service.businessPostcode === userInfo.postalCode
        );

        console.log(array);
        if (array.length > 8) {
          setSeeAll(true);
        }
        setNearServices(array);

        const arrayLimit = [...nearLimit];
        for (let i = 0; i < 8; i++) {
          if (!arrayLimit.includes(array[i])) {
            arrayLimit.push(array[i]);
          }
        }
        console.log(arrayLimit);
        setNearLimit(arrayLimit);
      } else if (content === "search") {
        const lessSearch = [...searchServices];
        for (let i = 0; i < 12; i++) {
          if (!lessSearch.includes(services[i])) {
            lessSearch.push(services[i]);
          }
        }
        console.log(lessSearch);
        setSearchServices(lessSearch);
      }
    }
  }, []);

  if (services || bookmarks) {
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
              <span className="services-search-results">
                {services && services.length + " results"}
              </span>
            )}
          </div>
          <div className="services-cards">
            {content === "recommend"
              ? recommendedServices &&
                recommendedServices.map((service) => (
                  <Card
                    width={content === "search" ? "search" : ""}
                    service={service && service}
                    key={service && service._id}
                    bookmarks={bookmarks}
                  />
                ))
              : content === "near"
              ? seeAll
                ? nearLimit &&
                  nearLimit.map((service) => (
                    <Card
                      width={content === "search" ? "search" : ""}
                      service={service && service}
                      key={service && service._id}
                      bookmarks={bookmarks}
                    />
                  ))
                : nearServices &&
                  nearServices.map((service) => (
                    <Card
                      width={content === "search" ? "search" : ""}
                      service={service && service}
                      key={service && service._id}
                      bookmarks={bookmarks}
                    />
                  ))
              : content === "search"
              ? searchServices && !showMore && seeMore && !isMobile
                ? searchServices.map((service) => (
                    <Card
                      width={content === "search" ? "search" : ""}
                      service={service && service}
                      key={service && service._id}
                      bookmarks={bookmarks && bookmarks}
                    />
                  ))
                : services &&
                  services.map((service) => (
                    <Card
                      width={content === "search" ? "search" : ""}
                      service={service && service}
                      key={service && service._id}
                      bookmarks={bookmarks && bookmarks}
                    />
                  ))
              : services &&
                services.map((service) => (
                  <Card
                    width={
                      content === "search"
                        ? "search"
                        : content === "favorites"
                        ? "favorites"
                        : ""
                    }
                    service={service && service}
                    key={service && service.service._id}
                    bookmarks={bookmarks}
                  />
                ))}
          </div>
          {content === "near" && seeAll && (
            <button
              type="button"
              className="services-near-btn flex-center gap-4 pointer"
              onClick={() => setSeeAll(false)}
            >
              See all
              <ArrowRight color="#1F1F23" className="services-near-icon" />
            </button>
          )}
          {content === "search" &&
            seeMore &&
            !isMobile &&
            (showMore ? (
              <button
                className="services-search-btn pointer"
                onClick={() => setShowMore(false)}
              >
                See less
              </button>
            ) : (
              <button
                className="services-search-btn pointer"
                onClick={() => setShowMore(true)}
              >
                See more
              </button>
            ))}
        </div>
      </div>
    );
  }
};

export default ServicesList;
