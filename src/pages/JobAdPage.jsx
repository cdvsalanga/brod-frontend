import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import "../styles/JobAd.css";
import JobAdSidebar from "../components/JobAdSidebar";
import JobAdDetails from "../components/JobAdDetails";
import { useParams } from "react-router-dom";
import { getJobPostDetails, getUserDetails } from "../action/userActions";
import { useMediaQuery } from "react-responsive";
import { MapPin, Star } from "lucide-react";

const JobAdPage = () => {
  const isMobile = useMediaQuery({ query: "(max-width:768px)" });

  const [userInfo] = useState(JSON.parse(localStorage.getItem("userInfo")));
  const [loading, setLoading] = useState(false);
  const [jobAdDetails, setJobAdDetails] = useState();
  const [userDetails, setUserDetails] = useState();

  const { id } = useParams();

  const getJobAdDetails = async () => {
    setLoading(true);
    await getJobPostDetails(id).then(async (res) => {
      console.log(res);
      setJobAdDetails(res.service);
      await getUserDetails(res.service.userID).then((user) => {
        console.log(user);
        setUserDetails(user);
        setLoading(false);
      });
    });
  };

  useEffect(() => {
    getJobAdDetails();
  }, []);
  return (
    <div>
      <Header />
      {loading ? (
        <div>Loading</div>
      ) : isMobile ? (
        <div className="job-ad-contents">
          <JobAdDetails
            jobAdDetails={jobAdDetails}
            userDetails={userDetails}
            userInfo={userInfo}
          />
          <JobAdSidebar
            userDetails={userDetails}
            jobAdDetails={jobAdDetails}
            userInfo={userInfo}
          />
          <div className="job-review-container">
            <h1 className="job-h1 mb-16">Reviews</h1>
            {jobAdDetails &&
              jobAdDetails.clientReviews.map((review) => (
                <div className="job-review" key={review.clientID}>
                  <div
                    className={
                      isMobile ? "flex-between mb-4" : "flex-between mb-8"
                    }
                  >
                    <div className="flex-center">
                      <div className="job-review-avatar">SC</div>
                      <div className="job-review-name">Sean C.</div>
                    </div>
                    <div className="job-review-stars">
                      <Star
                        width={isMobile ? 20 : 24}
                        height={isMobile ? 20 : 24}
                        color="#1F1F23"
                        fill={review.starRating > 0 ? "#1F1F23" : "#FFFFFF"}
                      />
                      <Star
                        width={isMobile ? 20 : 24}
                        height={isMobile ? 20 : 24}
                        color="#1F1F23"
                        fill={review.starRating > 1 ? "#1F1F23" : "#FFFFFF"}
                      />
                      <Star
                        width={isMobile ? 20 : 24}
                        height={isMobile ? 20 : 24}
                        color="#1F1F23"
                        fill={review.starRating > 2 ? "#1F1F23" : "#FFFFFF"}
                      />
                      <Star
                        width={isMobile ? 20 : 24}
                        height={isMobile ? 20 : 24}
                        color="#1F1F23"
                        fill={review.starRating > 3 ? "#1F1F23" : "#FFFFFF"}
                      />
                      <Star
                        width={isMobile ? 20 : 24}
                        height={isMobile ? 20 : 24}
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
      ) : (
        <div className="job-ad-contents">
          <JobAdSidebar
            userDetails={userDetails}
            jobAdDetails={jobAdDetails}
            userInfo={userInfo}
          />
          <JobAdDetails
            jobAdDetails={jobAdDetails}
            userDetails={userDetails}
            userInfo={userInfo}
          />
        </div>
      )}
    </div>
  );
};

export default JobAdPage;
