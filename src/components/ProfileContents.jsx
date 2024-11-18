import React, { useEffect, useState } from "react";
import "../styles/Profile.css";
import ProfileContentItem from "./ProfileContentItem";
import { Link, useNavigate } from "react-router-dom";
import {
  getJobsByStatusTradie,
  getPublishedAds,
  getUnPublishedAds,
} from "../action/tradieActions";
import { getJobsByStatusClient } from "../action/clientActions";
import { useMediaQuery } from "react-responsive";
import { TailSpin } from "react-loading-icons";

const ProfileContents = ({ role, userInfo, profile }) => {
  const isMobile = useMediaQuery({ query: "(max-width:768px)" });

  const [item, setItem] = useState(role === "Client" ? "job" : "publish");
  const [loading, setLoading] = useState(false);
  const [token] = useState(userInfo && userInfo.token);
  const [userId] = useState(userInfo && userInfo.userId);
  const [publishedData, setPublishedData] = useState();
  const [unpublishedData, setUnpublishedData] = useState();
  const [completedJobs, setCompletedJobs] = useState();
  const [inProgressJobs, setInProgressJobs] = useState();
  const [pendingJobs, setPendingJobs] = useState();
  const [bookmarkedJobs, setBookmarkedJobs] = useState();

  const navigate = useNavigate();

  const getJobAdDataTradie = async () => {
    await getPublishedAds(userId, token).then((res) => {
      if (res && res.status === 401) {
        alert("Your session expired, please login again.");
        localStorage.removeItem("userInfo");
        navigate("/login");
        return;
      }
      setPublishedData(res);
    });

    await getUnPublishedAds(userId, token).then((res) => {
      if (res && res.status === 401) {
        alert("Your session expired, please login again.");
        localStorage.removeItem("userInfo");
        navigate("/login");
        return;
      }
      setUnpublishedData(res);
    });

    const status = "Completed";

    await getJobsByStatusTradie(userId, status, token).then((res) => {
      if (res && res.status === 401) {
        alert("Your session expired, please login again.");
        localStorage.removeItem("userInfo");
        navigate("/login");
        return;
      }
      setCompletedJobs(res);
    });

    setLoading(false);
  };

  const getJobAdDataClient = async () => {
    let status;
    await getJobsByStatusClient(userId, (status = "In Progress"), token).then(
      (res) => {
        if (res && res.status === 401) {
          alert("Your session expired, please login again.");
          localStorage.removeItem("userInfo");
          navigate("/login");
          return;
        }

        setInProgressJobs(res);
      }
    );

    await getJobsByStatusClient(userId, (status = "Pending"), token).then(
      (res) => {
        if (res && res.status === 401) {
          alert("Your session expired, please login again.");
          localStorage.removeItem("userInfo");
          navigate("/login");
          return;
        }
        setPendingJobs(res);
      }
    );

    await getJobsByStatusClient(userId, (status = "Completed"), token).then(
      (res) => {
        if (res && res.status === 401) {
          alert("Your session expired, please login again.");
          localStorage.removeItem("userInfo");
          navigate("/login");
          return;
        }
        setCompletedJobs(res);
      }
    );

    await getJobsByStatusClient(userId, (status = "Bookmarked"), token).then(
      (res) => {
        if (res && res.status === 401) {
          alert("Your session expired, please login again.");
          localStorage.removeItem("userInfo");
          navigate("/login");
          return;
        }
        setBookmarkedJobs(res);
      }
    );

    setLoading(false);
  };

  useEffect(() => {
    if (role === "Tradie") {
      setLoading(true);
      getJobAdDataTradie();
    } else {
      setLoading(true);
      getJobAdDataClient();
    }
  }, []);

  if (role && userInfo && profile) {
    return (
      <div className="profile-contents">
        {loading ? (
          <div className="loading loading-page">
            <TailSpin
              stroke="#1f1f23"
              speed={1}
              className={isMobile && "gray-bg"}
            />
          </div>
        ) : role === "Client" ? (
          <>
            <div className="mb-16">
              <h1 className="profile-content-h1">
                {isMobile ? "Job Requests" : "My Account"}
              </h1>
              <div className="profile-navs">
                <div
                  className={
                    item === "job" ? "profile-nav-active" : "profile-nav"
                  }
                  onClick={() => setItem("job")}
                >
                  In Progress Jobs ({inProgressJobs && inProgressJobs.length})
                </div>
                <div
                  className={
                    item === "offer" ? "profile-nav-active" : "profile-nav"
                  }
                  onClick={() => setItem("offer")}
                >
                  Sent Offers ({pendingJobs && pendingJobs.length})
                </div>
                <div
                  className={
                    item === "complete" ? "profile-nav-active" : "profile-nav"
                  }
                  onClick={() => setItem("complete")}
                >
                  Completed ({completedJobs && completedJobs.length})
                </div>
                <div
                  className={
                    item === "bookmark" ? "profile-nav-active" : "profile-nav"
                  }
                  onClick={() => setItem("bookmark")}
                >
                  Bookmarked ({bookmarkedJobs && bookmarkedJobs.length})
                </div>
              </div>
            </div>
            <ProfileContentItem
              item={item}
              role={role}
              data={
                item === "publish"
                  ? publishedData
                  : item === "unpublish"
                  ? unpublishedData
                  : item === "job"
                  ? inProgressJobs
                  : item === "offer"
                  ? pendingJobs
                  : item === "bookmark"
                  ? bookmarkedJobs
                  : completedJobs
              }
              profile={profile}
            />
          </>
        ) : (
          <>
            <div className="mb-16">
              {!isMobile && (
                <div className="flex-between mb-16">
                  <h1 className="profile-content-h1">My Account</h1>
                  <Link to={"/tradesperson/post-job-ad"} className="link-none">
                    <button className="profile-post-btn pointer">
                      Post a job ad
                    </button>
                  </Link>
                </div>
              )}
              <div className="profile-navs">
                <div
                  className={
                    item === "publish" ? "profile-nav-active" : "profile-nav"
                  }
                  onClick={() => setItem("publish")}
                >
                  Published Ads ({publishedData && publishedData.length})
                </div>
                <div
                  className={
                    item === "unpublish" ? "profile-nav-active" : "profile-nav"
                  }
                  onClick={() => setItem("unpublish")}
                >
                  Unpublished Ads ({unpublishedData && unpublishedData.length})
                </div>
                <div
                  className={
                    item === "complete" ? "profile-nav-active" : "profile-nav"
                  }
                  onClick={() => setItem("complete")}
                >
                  Completed Jobs ({completedJobs && completedJobs.length})
                </div>
              </div>

              {isMobile && (
                <div className="profile-post-btn-container">
                  <Link to={"/tradesperson/post-job-ad"} className="link-none">
                    <button className="profile-post-btn pointer">
                      Post a job ad
                    </button>
                  </Link>
                </div>
              )}
            </div>
            <ProfileContentItem
              item={item}
              role={role}
              data={
                item === "publish"
                  ? publishedData
                  : item === "unpublish"
                  ? unpublishedData
                  : item === "job"
                  ? inProgressJobs
                  : item === "offer"
                  ? pendingJobs
                  : item === "bookmark"
                  ? bookmarkedJobs
                  : completedJobs
              }
              profile={profile}
              userInfo={userInfo}
            />
          </>
        )}
      </div>
    );
  }
};

export default ProfileContents;
