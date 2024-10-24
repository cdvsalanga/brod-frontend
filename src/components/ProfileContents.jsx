import React, { useEffect, useState } from "react";
import "../styles/Profile.css";
import ProfileContentItem from "./ProfileContentItem";
import { Link } from "react-router-dom";
import { getPublishedAds, getUnPublishedAds } from "../action/tradieActions";

const ProfileContents = ({ role, userInfo, profile }) => {
  const [item, setItem] = useState(role === "Client" ? "job" : "publish");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(userInfo.token);
  const [userId, setUserId] = useState(userInfo.userId);
  const [publishedData, setPublishedData] = useState();
  const [unpublishedData, setUnpublishedData] = useState();

  const getJobAdData = async () => {
    await getPublishedAds(userId, token).then((res) => {
      setPublishedData(res);
    });

    await getUnPublishedAds(userId, token).then((res) => {
      setUnpublishedData(res);
    });

    setLoading(false);
  };

  // const getPublishedAdsData = async () => {
  //   await getPublishedAds(userId, token).then((res) => {
  //     setData(res);
  //     setLoading(false);
  //   });
  // };

  // const getUnPublishedAdsData = async () => {
  //   await getUnPublishedAds(userId, token).then((res) => {
  //     setData(res);
  //     setLoading(false);
  //   });
  // };

  useEffect(() => {
    if (role === "Tradie") {
      setLoading(true);
      getJobAdData();
    }
  }, []);
  return (
    <div className="profile-contents">
      {role === "Client" ? (
        <div className="mb-16">
          <h1 className="profile-content-h1 mb-16">My Account</h1>
          <div className="profile-navs">
            <div
              className={item === "job" ? "profile-nav-active" : "profile-nav"}
              onClick={() => setItem("job")}
            >
              In Progress Jobs (2)
            </div>
            <div
              className={
                item === "offer" ? "profile-nav-active" : "profile-nav"
              }
              onClick={() => setItem("offer")}
            >
              Sent Offers (2)
            </div>
            <div
              className={
                item === "complete" ? "profile-nav-active" : "profile-nav"
              }
              onClick={() => setItem("complete")}
            >
              Completed (2)
            </div>
            <div
              className={
                item === "bookmark" ? "profile-nav-active" : "profile-nav"
              }
              onClick={() => setItem("bookmark")}
            >
              Bookmarked (2)
            </div>
          </div>
        </div>
      ) : loading ? (
        <div>Loading</div>
      ) : (
        <div className="mb-16">
          <div className="flex-between mb-16">
            <h1 className="profile-content-h1">My Account</h1>
            <Link to={"/tradesperson/post-job-ad"} className="link-none">
              <button className="profile-post-btn pointer">
                Post a job ad
              </button>
            </Link>
          </div>
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
              Completed Jobs (1)
            </div>
          </div>
        </div>
      )}
      {loading ? (
        <div>Loading</div>
      ) : (
        <ProfileContentItem
          item={item}
          role={role}
          data={item === "publish" ? publishedData : unpublishedData}
          profile={profile}
        />
      )}
    </div>
  );
};

export default ProfileContents;
