import React from "react";
import "../styles/Profile.css";
import {
  User,
  MapPin,
  Navigation,
  CircleX,
  Check,
  FileText,
  Mail,
  Star,
  Bookmark,
} from "lucide-react";

const ProfileContentItem = ({ item }) => {
  return (
    <>
      <div className="profile-item mb-16">
        <div className="mb-24">
          <div className="flex-between flex-center mb-12">
            <h2 className="profile-item-name">All-Around Painting Services</h2>
            <div className="profile-item-date-text">
              {item === "job" || item === "bookmark"
                ? "Job accepted on"
                : item === "offer"
                ? "Inquiry Sent on"
                : "Job completed on"}{" "}
              <span className="profile-item-date">22 August 2024</span>
            </div>
          </div>
          <div className="mb-12 profile-job-details">
            <div className="flex-center profile-job-detail">
              <User width={20} height={20} color="#8C8C8C" />
              Yves Vergara
            </div>
            <div className="flex-center profile-job-detail">
              <MapPin width={20} height={20} color="#8C8C8C" />
              Sydney, NSW 2000
            </div>
            <div className="flex-center profile-job-detail">
              <Navigation width={20} height={20} color="#8C8C8C" />
              Can work within 50km
            </div>
          </div>
          <div className="profile-item-details">
            Transform your home with the touch of a dedicated and skilled
            painter. I’m Yves, a professional painter with 7 years of
            experience, offering personalized house painting services tailored
            to your unique needs. Whether you're looking to refresh a single
            room or update the entire exterior, I bring all-aroun...
          </div>
        </div>
        <div
          className={
            item === "complete" || item === "bookmark"
              ? "flex-end"
              : "flex-between"
          }
        >
          {item === "job" || item === "offer" ? (
            <button className="profile-btn-cancel flex-center">
              <CircleX />
              Cancel job
            </button>
          ) : (
            <></>
          )}
          <div>
            {item === "job" ? (
              <button className="profile-btn-black flex-center">
                <Check width={20} height={20} className="icon-bg-black" />
                Mark as completed
              </button>
            ) : item === "offer" ? (
              <div className="profile-item-offer">
                <button className="profile-btn-offer flex-center">
                  <FileText width={20} height={20} />
                  See offer details
                </button>
                <button className="profile-btn-black profile-btn-chat flex-center">
                  <Mail width={20} height={20} className="icon-bg-black" />
                  Chat
                </button>
              </div>
            ) : item === "complete" ? (
              <button className="profile-btn-black flex-center">
                <Star
                  width={20}
                  height={20}
                  fill="#FFFFFF"
                  className="icon-bg-black"
                />
                Rate the service
              </button>
            ) : (
              <div className="profile-bookmark flex-center">
                <Bookmark fill="#1F1F23" />
                Bookmarked
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="profile-item mb-16">
        <div className="mb-24">
          <div className="flex-between flex-center mb-12">
            <h2 className="profile-item-name">All-Around Painting Services</h2>
            <div className="profile-item-date-text">
              {item === "job"
                ? "Job accepted on"
                : item === "offer"
                ? "Inquiry Sent on"
                : "Job completed on"}{" "}
              <span className="profile-item-date">22 August 2024</span>
            </div>
          </div>
          <div className="mb-12 profile-job-details">
            <div className="flex-center profile-job-detail">
              <User width={20} height={20} color="#8C8C8C" />
              Yves Vergara
            </div>
            <div className="flex-center profile-job-detail">
              <MapPin width={20} height={20} color="#8C8C8C" />
              Sydney, NSW 2000
            </div>
            <div className="flex-center profile-job-detail">
              <Navigation width={20} height={20} color="#8C8C8C" />
              Can work within 50km
            </div>
          </div>
          <div className="profile-item-details">
            Transform your home with the touch of a dedicated and skilled
            painter. I’m Yves, a professional painter with 7 years of
            experience, offering personalized house painting services tailored
            to your unique needs. Whether you're looking to refresh a single
            room or update the entire exterior, I bring all-aroun...
          </div>
        </div>
        <div
          className={
            item === "complete" || item === "bookmark"
              ? "flex-end"
              : "flex-between"
          }
        >
          {item === "job" || item === "offer" ? (
            <button className="profile-btn-cancel flex-center">
              <CircleX />
              Cancel job
            </button>
          ) : (
            <></>
          )}
          <div>
            {item === "job" ? (
              <button className="profile-btn-black flex-center">
                <Check width={20} height={20} className="icon-bg-black" />
                Mark as completed
              </button>
            ) : item === "offer" ? (
              <div className="profile-item-offer">
                <button className="profile-btn-offer flex-center">
                  <FileText width={20} height={20} />
                  See offer details
                </button>
                <button className="profile-btn-black profile-btn-chat flex-center">
                  <Mail width={20} height={20} className="icon-bg-black" />
                  Chat
                </button>
              </div>
            ) : item === "complete" ? (
              <div className="profile-complete-rated">
                <div>
                  <Star fill="#1F1F23" />
                  <Star fill="#1F1F23" />
                  <Star fill="#1F1F23" />
                  <Star fill="#1F1F23" />
                  <Star fill="#1F1F23" />
                </div>
                <span className="profile-rated-text">See rating details</span>
              </div>
            ) : (
              <div className="profile-bookmark flex-center">
                <Bookmark fill="#1F1F23" />
                Bookmarked
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileContentItem;
