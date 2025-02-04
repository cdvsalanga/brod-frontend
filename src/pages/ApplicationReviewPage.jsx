import React from "react";
import "../styles/LogIn.css";
import Header from "../components/Header";
import UnderReview from "../assets/images/under-review.svg";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Cookies from "../components/Cookies";

const ApplicationReviewPage = () => {
  const acceptedCookies = document.cookie.includes("Brod");
  const isMobile = useMediaQuery({ query: "(max-width:768px)" });

  const navigate = useNavigate();

  const logOutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };
  return (
    <>
      <Header />
      <div className="under-review">
        <div>
          <div className={isMobile ? "mb-40" : "mb-48"}>
            <img src={UnderReview} className="mb-24" />
            <h1 className="under-review-h1 mb-24">Application Under Review</h1>
            <div className="under-review-text">
              Your application is still under review. We will contact you if we
              need further clarification.
            </div>
          </div>
          <button className="under-review-btn pointer" onClick={logOutHandler}>
            Close
          </button>
        </div>
      </div>
      {!acceptedCookies && <Cookies showCookies={true} />}
    </>
  );
};

export default ApplicationReviewPage;
