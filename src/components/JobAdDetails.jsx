import React, { useState } from "react";
import "../styles/JobAd.css";
import { Heart, MapPin, Star } from "lucide-react";
import { bookmarkJob, unBookmarkJob } from "../action/clientActions";
import { useMediaQuery } from "react-responsive";

const JobAdDetails = ({ jobAdDetails, userDetails, userInfo, bookmarks }) => {
  const isMobile = useMediaQuery({ query: "(max-width:768px)" });
  const [favorite, setFavorite] = useState(() => {
    if (jobAdDetails && bookmarks) {
      if (
        bookmarks.some((bookmark) => bookmark.serviceID === jobAdDetails._id)
      ) {
        return true;
      } else {
        return false;
      }
    }
  });
  const [previewImg, setPreviewImg] = useState(
    jobAdDetails && jobAdDetails.projectGallery[0]
  );

  const favoriteOnChangeHandler = async () => {
    if (favorite) {
      const bookmarkedJob = bookmarks.find(
        (bookmark) => bookmark.serviceID === jobAdDetails._id
      );

      await unBookmarkJob(bookmarkedJob._id, userInfo.token).then(() => {
        setFavorite(false);
      });
    } else {
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
        setFavorite(true);
      });
    }
  };

  if (jobAdDetails && userDetails && bookmarks) {
    return (
      <div className="job-details">
        <div className={isMobile ? "mb-24" : "mb-40"}>
          <div className={isMobile ? "mb-12" : "mb-24"}>
            <div className="flex-between mb-12">
              <div className="job-type">{jobAdDetails.jobCategory}</div>
              {userInfo && (
                <div className="flex-center">
                  <Heart
                    width={isMobile ? 28 : 32}
                    height={isMobile ? 28 : 32}
                    className="job-heart pointer"
                    fill={favorite ? "#1F1F23" : "none"}
                    color={favorite ? "#1F1F23" : "#D9D9D9"}
                    onClick={favoriteOnChangeHandler}
                  />
                  <span className="job-fav">Favorite</span>
                </div>
              )}
            </div>
            <h1 className="job-h1">{jobAdDetails.jobAdTitle}</h1>
          </div>
          <div>{jobAdDetails.descriptionOfService}</div>
        </div>
        {jobAdDetails.projectGallery.length > 0 && (
          <>
            <div className="job-line" />
            <div className={!isMobile && "mb-40"}>
              <h1 className={isMobile ? "job-h1 mb-24" : "job-h1"}>
                Project Gallery
              </h1>
              <img src={previewImg} className="job-big-img" />
              <div className="job-sm-images">
                {jobAdDetails.projectGallery.map((image, i) => (
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
          </>
        )}
        {!isMobile && (
          <>
            <div className="job-line" />
            <div className="mb-24">
              <h1 className="job-h1">Reviews</h1>
              {jobAdDetails.clientReviews.map(
                (review, i) =>
                  i !== 0 && (
                    <div className="job-review" key={review.clientID}>
                      <div className="flex-between mb-8">
                        <div className="flex-center">
                          <div className="job-review-avatar">
                            {Array.from(review.clientName.split(" ")[0])[0] +
                              Array.from(
                                review.clientName.split(" ")[
                                  review.clientName.split(" ").length - 1
                                ]
                              )[0]}
                          </div>
                          <div className="job-review-name">
                            {review.clientName}
                          </div>
                        </div>
                        <div className="job-review-stars">
                          <Star
                            color="#1F1F23"
                            fill={review.rating > 0 ? "#1F1F23" : "#FFFFFF"}
                          />
                          <Star
                            color="#1F1F23"
                            fill={review.rating > 1 ? "#1F1F23" : "#FFFFFF"}
                          />
                          <Star
                            color="#1F1F23"
                            fill={review.rating > 2 ? "#1F1F23" : "#FFFFFF"}
                          />
                          <Star
                            color="#1F1F23"
                            fill={review.rating > 3 ? "#1F1F23" : "#FFFFFF"}
                          />
                          <Star
                            color="#1F1F23"
                            fill={review.rating > 4 ? "#1F1F23" : "#FFFFFF"}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="job-review-type mb-8">
                          {jobAdDetails.jobAdTitle}
                        </div>
                        <div className="flex-center job-review-location mb-12">
                          <MapPin width={20} height={20} color="#8C8C8C" />
                          {review.clientLocation}
                        </div>
                        <div className="job-review-text">
                          {review.ratingDescription}
                        </div>
                      </div>
                    </div>
                  )
              )}
            </div>
          </>
        )}
      </div>
    );
  }
};

export default JobAdDetails;
