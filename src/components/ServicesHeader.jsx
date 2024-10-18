import React, { useEffect, useState } from "react";
import "../styles/Services.css";
import { useLocation, useNavigate } from "react-router-dom";

const ServicesHeader = () => {
  const [searchService, setSearchService] = useState("");
  const [searchResult, setSearchResult] = useState("");

  const navigate = useNavigate();

  const { search } = useLocation();

  useEffect(() => {
    const searchSplit = search.split("=");

    setSearchResult(searchSplit[1]);
  }, [search]);

  return (
    <div className="services-header">
      <h1 className="services-header-h1">
        Find Skilled Tradespeople for Your Needs
      </h1>
      <form
        className="services-header-form"
        onSubmit={(e) => {
          e.preventDefault();
          navigate(`/services/search?search=${searchService}`);
        }}
      >
        <input
          type="text"
          className="services-header-input"
          placeholder="Search for a service (e.g., Electrician)"
          defaultValue={searchResult}
          onChange={(e) => setSearchService(e.target.value)}
        />
        <button className="services-header-btn pointer" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default ServicesHeader;
