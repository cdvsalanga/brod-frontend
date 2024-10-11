import React from "react";
import "../styles/LogIn.css";
import Header from "../components/Header";
import UnderReview from "../assets/images/under-review.svg";
import { useNavigate } from "react-router-dom";

const ApplicationReviewPage = () => {
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
          <div className="mb-48">
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
    </>
  );
};

export default ApplicationReviewPage;
