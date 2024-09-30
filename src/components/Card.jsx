import React, { useState } from "react";
import "../styles/Card.css";
import CardImage from "../assets/images/card-image.png";
import Location from "../assets/icons/location.svg";
import { Heart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Card = ({ width }) => {
  const [favorite, setFavorite] = useState(false);

  const navigate = useNavigate();

  const addFavorite = (e) => {
    e.stopPropagation();
    setFavorite(!favorite);
  };
  return (
    <div
      className={width === "search" ? "card w-352 pointer" : "card pointer"}
      onClick={() => navigate("/job-ad/1")}
    >
      <img src={CardImage} className="card-img" />
      <div className="card-contents">
        <h1 className="card-h1">House Cleaning Service</h1>
        <div className="card-text">
          Job ad by <span className="card-name">Jane Doe</span>
        </div>
        <div className="card-loc flex-center">
          <img src={Location} className="card-loc-icon" />
          <span>Sydney, NSW 2000</span>
        </div>
        <div className="card-review flex-center">
          <Star fill="#1F1F23" className="card-review-icon" />
          <span className="card-review-rating">4.5</span>
          <span> (34 reviews)</span>
        </div>

        <Heart
          fill={favorite ? "#1F1F23" : "none"}
          color={favorite ? "#1F1F23" : "#D9D9D9"}
          className="card-heart pointer"
          onClick={addFavorite}
        />
        <div className="card-rate">$15/hr</div>
      </div>
    </div>
  );
};

export default Card;
