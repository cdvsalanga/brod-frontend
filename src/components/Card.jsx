import React, { useEffect, useState } from "react";
import "../styles/Card.css";
import CardImage from "../assets/images/card-image.png";
import Location from "../assets/icons/location.svg";
import { Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { getUserDetails } from "../action/userActions";
import { useMediaQuery } from "react-responsive";

const Card = ({ width, service }) => {
  const isMobile = useMediaQuery({ query: "(max-width:768px)" });

  const [favorite, setFavorite] = useState(false);
  const [tradieDetails, setTradieDetails] = useState();
  const [totalStarRating, setTotalStarRating] = useState(0);

  const getTradieDetails = async () => {
    await getUserDetails(service.userID).then((res) => {
      setTradieDetails(res);
      console.log(res);
    });
  };

  useEffect(() => {
    if (service) {
      service.clientReviews.forEach((review) => {
        setTotalStarRating(review.starRating + totalStarRating);
      });
      getTradieDetails();
    }
  }, []);

  const addFavorite = (e) => {
    e.stopPropagation();
    setFavorite(!favorite);
  };
  return (
    <Link to={service && `/job-ad/${service._id}`} className="link-none">
      <div
        className={width === "search" ? "card w-352 pointer" : "card pointer"}
      >
        <img src={CardImage} className="card-img" />
        <div className="card-contents">
          <h1 className="card-h1">{service && service.jobAdTitle}</h1>
          <div className="card-text">
            Job ad by{" "}
            <span className="card-name">
              {tradieDetails &&
                tradieDetails.firstName + " " + tradieDetails.lastName}
            </span>
          </div>
          <div className="card-loc flex-center gap-4">
            <img src={Location} className="card-loc-icon" />
            <span>{service && service.businessPostcode}</span>
          </div>
          <div className="card-review flex-center gap-4">
            <Star fill="#1F1F23" className="card-review-icon" />
            <span className="card-review-rating">
              {service && totalStarRating}
            </span>
            <span>
              {" "}
              ({service && service.clientReviews.length}
              {service && service.clientReviews.length < 2
                ? " review"
                : service.clientReviews.length === 0
                ? " no review"
                : " reviews"}
              )
            </span>
          </div>
          <div className={isMobile && "flex-between flex-center"}>
            <div className="card-rate">
              {service && "$" + service.pricingStartsAt + "/"}
              {service && service.pricingOption === "Per hour" ? "hr" : "day"}
            </div>
            <Heart
              fill={favorite ? "#1F1F23" : "none"}
              color={favorite ? "#1F1F23" : "#D9D9D9"}
              className="card-heart"
              onClick={addFavorite}
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
