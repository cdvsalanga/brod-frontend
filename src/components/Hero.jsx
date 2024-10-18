import React, { useState } from "react";
import "../styles/Hero.css";
import HeroImage from "../assets/images/hero-image.png";
import "@fontsource-variable/instrument-sans";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [select, setSelect] = useState(1);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  return (
    <div className="hero">
      <h1 className="hero-h1">Hire Skilled Tradespeople in Your Area</h1>
      <div className="hero-content">
        {select == 1 ? (
          <div className="hero-interact">
            <div className="hero-interact-btn">
              <div className="hire active" onClick={() => setSelect(1)}>
                Hire Someone
              </div>

              <div
                className="trades-person inactive"
                onClick={() => setSelect(2)}
              >
                Become a Tradeperson
              </div>
            </div>
            <div className="hero-interact-content">
              <div className="text-1">What do you need help with?</div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  navigate(`/services/search?search=${search}`);
                }}
                className="search"
              >
                <input
                  type="text"
                  className="search-bar"
                  placeholder="Search for a service (e.g., Electrician)"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button className="search-btn pointer" type="submit">
                  Search
                </button>
              </form>
              <div className="text-2">
                Hire the best trade people in your area. We connect homeowners
                and businesses with reliable, experienced professionals. From
                plumbing and electrical work to carpentry and renovations, we
                have you covered.
              </div>
            </div>
          </div>
        ) : (
          <div className="hero-interact">
            <div className="hero-interact-btn">
              <div className="hire inactive" onClick={() => setSelect(1)}>
                Hire Someone
              </div>

              <div
                className="trades-person active"
                onClick={() => setSelect(2)}
              >
                Become a Tradeperson
              </div>
            </div>
            <div className="hero-interact-content">
              <div className="text-1">Enter your business postcode</div>
              <form className="search">
                <input
                  type="text"
                  className="search-bar location-bar"
                  placeholder="(e.g., 4000)"
                />
                <button className="search-btn">Get Started</button>
              </form>
              <div className="text-2">
                Are you a skilled trade professional looking to expand your
                customer base? Our platform is the perfect place to showcase
                your expertise and attract new clients.
              </div>
            </div>
          </div>
        )}
        <img src={HeroImage} className="hero-img" />
      </div>
    </div>
  );
};

export default Hero;
