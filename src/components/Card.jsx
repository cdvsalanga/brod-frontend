import React, { useEffect, useState } from "react";
import "../styles/Card.css";
import Location from "../assets/icons/location.svg";
import { Heart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../action/userActions";
import { useMediaQuery } from "react-responsive";
import { bookmarkJob, unBookmarkJob } from "../action/clientActions";

const Card = ({ width, service, bookmarks }) => {
  const isMobile = useMediaQuery({ query: "(max-width:768px)" });

  const [userInfo] = useState(JSON.parse(localStorage.getItem("userInfo")));
  const [loading, setLoading] = useState(false);
  const [favorite, setFavorite] = useState(() => {
    if (service && bookmarks) {
      if (width === "favorites") {
        if (
          bookmarks.some(
            (bookmark) => bookmark.serviceID === service.service._id
          )
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        if (bookmarks.some((bookmark) => bookmark.serviceID === service._id)) {
          return true;
        } else {
          return false;
        }
      }
    }
  });
  const [tradieDetails, setTradieDetails] = useState();
  const [totalStarRating, setTotalStarRating] = useState(0);

  const navigate = useNavigate();

  const getTradieDetails = async () => {
    if (width === "favorites") {
      await getUserDetails(service.service.userID).then((res) => {
        setTradieDetails(res);
        console.log(res);
      });
    } else {
      await getUserDetails(service.userID).then((res) => {
        setTradieDetails(res);
        console.log(res);
      });
    }
  };

  useEffect(() => {
    if (service || bookmarks) {
      console.log({ service, bookmarks });
      if (width === "favorites") {
        let newTotal = 0;
        service.service.clientReviews.forEach((review) => {
          newTotal = review.rating + newTotal;
        });
        if (newTotal === 0) {
          setTotalStarRating(0);
        } else {
          setTotalStarRating(
            (newTotal / (service.service.clientReviews.length - 1)).toFixed(2)
          );
        }
      } else {
        let newTotal = 0;
        service.clientReviews.forEach((review) => {
          newTotal = review.rating + newTotal;
        });
        if (newTotal === 0) {
          setTotalStarRating(0);
        } else {
          setTotalStarRating(
            (newTotal / (service.clientReviews.length - 1)).toFixed(2)
          );
        }
      }
      getTradieDetails();
    }
  }, []);

  const favoriteOnChangeHandler = async (e) => {
    e.stopPropagation();
    setLoading(true);

    const status = "Bookmarked";

    if (width === "favorites") {
      if (favorite) {
        const bookmarkedJob = bookmarks.find(
          (bookmark) => bookmark.serviceID === service.service._id
        );

        await unBookmarkJob(bookmarkedJob._id, userInfo.token).then((res) => {
          if (res && res.status === 401) {
            alert("Your session expired, please login again.");
            localStorage.removeItem("userInfo");
            navigate("/login");
            return;
          }
          setFavorite(false);
          setLoading(false);
        });
      } else {
        const date = new Date();

        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        // This arrangement can be altered based on how we want the date's format to appear.
        const currentDate = `${year}-${month}-${day}`;
        console.log(currentDate);

        await bookmarkJob(
          userInfo.userId,
          tradieDetails._id,
          service.service.jobAdTitle,
          service.service._id,
          status,
          service.service.descriptionOfService,
          userInfo.contactNumber,
          userInfo.postalCode,
          currentDate,
          userInfo.token
        ).then((res) => {
          if (res && res.status === 401) {
            alert("Your session expired, please login again.");
            localStorage.removeItem("userInfo");
            navigate("/login");
            return;
          }
          setFavorite(true);
          setLoading(false);
        });
      }
    } else {
      if (favorite) {
        const bookmarkedJob = bookmarks.find(
          (bookmark) => bookmark.serviceID === service._id
        );

        await unBookmarkJob(bookmarkedJob._id, userInfo.token).then((res) => {
          if (res && res.status === 401) {
            alert("Your session expired, please login again.");
            localStorage.removeItem("userInfo");
            navigate("/login");
            return;
          }
          setFavorite(false);
          setLoading(false);
        });
      } else {
        const date = new Date();

        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        // This arrangement can be altered based on how we want the date's format to appear.
        const currentDate = `${year}-${month}-${day}`;
        console.log(currentDate);

        await bookmarkJob(
          userInfo.userId,
          tradieDetails._id,
          service.jobAdTitle,
          service._id,
          status,
          service.descriptionOfService,
          userInfo.contactNumber,
          userInfo.postalCode,
          currentDate,
          userInfo.token
        ).then((res) => {
          if (res && res.status === 401) {
            alert("Your session expired, please login again.");
            localStorage.removeItem("userInfo");
            navigate("/login");
            return;
          }
          setFavorite(true);
          setLoading(false);
        });
      }
    }
  };

  if (width === "favorites" && service) {
    return (
      <div
        className={width === "search" ? "card w-352 pointer" : "card pointer"}
        onClick={() => navigate(`/job-ad/${service.service._id}`)}
      >
        <img
          src={service && service.service.thumbnailImage}
          className="card-img"
        />
        <div className="card-contents">
          <h1 className="card-h1">{service && service.service.jobAdTitle}</h1>
          <div className="card-text">
            Job ad by{" "}
            <span className="card-name">
              {tradieDetails &&
                tradieDetails.firstName + " " + tradieDetails.lastName}
            </span>
          </div>
          <div className="card-loc flex-center gap-4">
            <img src={Location} className="card-loc-icon" />
            <span>{service && service.service.businessPostcode}</span>
          </div>
          <div className="card-review flex-center gap-4">
            <Star fill="#1F1F23" className="card-review-icon" />
            <span className="card-review-rating">
              {service && totalStarRating}
            </span>
            <span>
              {" "}
              ({service && service.service.clientReviews.length - 1}
              {service && service.service.clientReviews.length < 3
                ? " review"
                : service.service.clientReviews.length === 1
                ? " no review"
                : " reviews"}
              )
            </span>
          </div>
          <div className={isMobile && "flex-between flex-center"}>
            <div className="card-rate">
              {service && "$" + service.service.pricingStartsAt + "/"}
              {service && service.service.pricingOption === "Per hour"
                ? "hr"
                : "day"}
            </div>

            <Heart
              fill={favorite ? "#1F1F23" : "none"}
              color={favorite ? "#1F1F23" : "#D9D9D9"}
              className="card-heart"
              onClick={favoriteOnChangeHandler}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={width === "search" ? "card w-352 pointer" : "card pointer"}
        onClick={() => navigate(`/job-ad/${service._id}`)}
      >
        <img src={service && service.thumbnailImage} className="card-img" />
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
              ({service && service.clientReviews.length - 1}
              {service && service.clientReviews.length < 3
                ? " review"
                : service.clientReviews.length === 1
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
            {userInfo && !loading && (
              <Heart
                fill={favorite ? "#1F1F23" : "none"}
                color={favorite ? "#1F1F23" : "#D9D9D9"}
                className="card-heart"
                onClick={favoriteOnChangeHandler}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default Card;
