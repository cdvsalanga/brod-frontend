import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import "../styles/JobAd.css";
import JobAdSidebar from "../components/JobAdSidebar";
import JobAdDetails from "../components/JobAdDetails";
import { useNavigate, useParams } from "react-router-dom";
import { getJobPostDetails, getUserDetails } from "../action/userActions";
import { useMediaQuery } from "react-responsive";
import { MapPin, Star } from "lucide-react";
import { TailSpin } from "react-loading-icons";
import { getJobsByStatusClient } from "../action/clientActions";
import Cookies from "../components/Cookies";

const JobAdPage = () => {
  const acceptedCookies = document.cookie.includes("Brod");
  const isMobile = useMediaQuery({ query: "(max-width:768px)" });

  const [userInfo] = useState(JSON.parse(localStorage.getItem("userInfo")));
  const [loading, setLoading] = useState(false);
  const [jobAdDetails, setJobAdDetails] = useState();
  const [userDetails, setUserDetails] = useState();
  const [bookmarks, setBookmarks] = useState([]);

  const navigate = useNavigate();

  const { id } = useParams();

  const getJobAdDetails = async () => {
    setLoading(true);
    await getJobPostDetails(id).then(async (res) => {
      setJobAdDetails(res.service);
      await getUserDetails(res.service.userID).then(async (user) => {
        setUserDetails(user);
        const status = "Bookmarked";
        await getJobsByStatusClient(
          userInfo.userId,
          status,
          userInfo.token
        ).then((jobs) => {
          if (jobs && jobs.status === 401) {
            alert("Your session expired, please login again.");
            localStorage.removeItem("userInfo");
            navigate("/login");
            return;
          }

          setBookmarks(jobs);
          setLoading(false);
        });
      });
    });
  };

  const getJobAdDetailsNoUserInfo = async () => {
    setLoading(true);
    await getJobPostDetails(id).then(async (res) => {
      setJobAdDetails(res.service);
      await getUserDetails(res.service.userID).then(async (user) => {
        setUserDetails(user);
        setLoading(false);
      });
    });
  };

  useEffect(() => {
    if (userInfo) {
      getJobAdDetails();
    } else {
      getJobAdDetailsNoUserInfo();
    }
  }, []);
  return (
    <div>
      <Header />
      {loading ? (
        <div className="loading loading-page">
          <TailSpin stroke="#1f1f23" speed={1} />
        </div>
      ) : isMobile ? (
        <div className="job-ad-contents">
          <JobAdDetails
            jobAdDetails={jobAdDetails}
            userDetails={userDetails}
            userInfo={userInfo}
            bookmarks={bookmarks}
          />
          <JobAdSidebar
            userDetails={userDetails}
            jobAdDetails={jobAdDetails}
            userInfo={userInfo}
          />
          <div className="job-review-container">
            <h1 className="job-h1 mb-16">Reviews</h1>
            {jobAdDetails &&
              jobAdDetails.clientReviews.map(
                (review, i) =>
                  i !== 0 && (
                    <div className="job-review" key={review.clientID}>
                      <div
                        className={
                          isMobile ? "flex-between mb-4" : "flex-between mb-8"
                        }
                      >
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
                            width={isMobile ? 20 : 24}
                            height={isMobile ? 20 : 24}
                            color="#1F1F23"
                            fill={review.rating > 0 ? "#1F1F23" : "#FFFFFF"}
                          />
                          <Star
                            width={isMobile ? 20 : 24}
                            height={isMobile ? 20 : 24}
                            color="#1F1F23"
                            fill={review.rating > 1 ? "#1F1F23" : "#FFFFFF"}
                          />
                          <Star
                            width={isMobile ? 20 : 24}
                            height={isMobile ? 20 : 24}
                            color="#1F1F23"
                            fill={review.rating > 2 ? "#1F1F23" : "#FFFFFF"}
                          />
                          <Star
                            width={isMobile ? 20 : 24}
                            height={isMobile ? 20 : 24}
                            color="#1F1F23"
                            fill={review.rating > 3 ? "#1F1F23" : "#FFFFFF"}
                          />
                          <Star
                            width={isMobile ? 20 : 24}
                            height={isMobile ? 20 : 24}
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
            bookmarks={bookmarks}
          />
        </div>
      )}
      {!acceptedCookies && <Cookies showCookies={true} />}
    </div>
  );
};

export default JobAdPage;
