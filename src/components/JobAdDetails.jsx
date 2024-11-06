import React, { useState } from "react";
import "../styles/JobAd.css";
import { Heart, MapPin, Star } from "lucide-react";
import CardImage from "../assets/images/card-image.png";
import HeroImage from "../assets/images/hero-image.png";
import Services from "../assets/images/services-header-background.png";
import { bookmarkJob } from "../action/clientActions";

const JobAdDetails = ({ jobAdDetails, userDetails, userInfo }) => {
  const [favorite, setFavorite] = useState(false);
  const [previewImg, setPreviewImg] = useState();

  const addJobFavorite = async () => {
    const status = "Bookmarked";
    const date = new Date();

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    // This arrangement can be altered based on how we want the date's format to appear.
    const currentDate = `${year}-${month}-${day}`;
    console.log(currentDate);

    await bookmarkJob(
      userInfo.userId,
      userDetails._id,
      jobAdDetails.jobAdTitle,
      jobAdDetails._id,
      status,
      jobAdDetails.descriptionOfService,
      userInfo.contactNumber,
      userInfo.postalCode,
      currentDate,
      userInfo.token
    ).then(() => {
      setFavorite(!favorite);
    });
  };

  if (jobAdDetails && userDetails) {
    if (!previewImg) {
      setPreviewImg(jobAdDetails.thumbnailImage);
    }
    const images = [];

    images.push(jobAdDetails.thumbnailImage);

    jobAdDetails.projectGallery.forEach((img) => {
      if (!images.includes(img)) {
        images.push(img);
      }
    });

    return (
      <div className="job-details">
        <div className="mb-40">
          <div className="mb-24">
            <div className="flex-between mb-12">
              <div className="job-type">{jobAdDetails.jobCategory}</div>
              <div className="flex-center">
                <Heart
                  className="job-heart pointer"
                  fill={favorite ? "#1F1F23" : "none"}
                  color={favorite ? "#1F1F23" : "#D9D9D9"}
                  onClick={addJobFavorite}
                />
                <span className="job-fav">Favorite</span>
              </div>
            </div>
            <h1 className="job-h1 mb-24">{jobAdDetails.jobAdTitle}</h1>
          </div>
          <div>{jobAdDetails.descriptionOfService}</div>
        </div>
        <div className="mb-40 job-line" />
        <div className="mb-40">
          <h1 className="job-h1 mb-24">Project Gallery</h1>
          <img src={previewImg} className="job-big-img mb-24" />
          <div className="job-sm-images">
            {images.map((image, i) => (
              <img
                src={image}
                className={
                  previewImg === image
                    ? "job-sm-img job-selected-img pointer"
                    : "job-sm-img pointer"
                }
                key={i}
                onClick={() => setPreviewImg(image)}
              />
            ))}
          </div>
        </div>
        <div className="mb-40 job-line" />
        <div className="mb-24">
          <h1 className="job-h1 mb-24">Reviews</h1>
          {jobAdDetails.clientReviews.map((review) => (
            <div className="job-review" key={review.clientID}>
              <div className="flex-between mb-8">
                <div className="flex-center">
                  <div className="job-review-avatar">SC</div>
                  <div className="job-review-name">Sean C.</div>
                </div>
                <div className="job-review-stars">
                  <Star
                    color="#1F1F23"
                    fill={review.starRating > 0 ? "#1F1F23" : "#FFFFFF"}
                  />
                  <Star
                    color="#1F1F23"
                    fill={review.starRating > 1 ? "#1F1F23" : "#FFFFFF"}
                  />
                  <Star
                    color="#1F1F23"
                    fill={review.starRating > 2 ? "#1F1F23" : "#FFFFFF"}
                  />
                  <Star
                    color="#1F1F23"
                    fill={review.starRating > 3 ? "#1F1F23" : "#FFFFFF"}
                  />
                  <Star
                    color="#1F1F23"
                    fill={review.starRating > 4 ? "#1F1F23" : "#FFFFFF"}
                  />
                </div>
              </div>
              <div>
                <div className="job-review-type mb-8">
                  {jobAdDetails.jobAdTitle}
                </div>
                <div className="flex-center job-review-location mb-12">
                  <MapPin width={20} height={20} color="#8C8C8C" />
                  {review.clientPostalCode}
                </div>
                <div className="job-review-text">
                  {review.reviewDescription}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default JobAdDetails;
