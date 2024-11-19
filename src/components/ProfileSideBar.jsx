import React, { useEffect } from "react";
import "../styles/Profile.css";
import DefaultProfilePicture from "../assets/images/default-profile-picture.png";
import Facebook from "../assets/icons/facebook.svg";
import Instagram from "../assets/icons/instagram.svg";
import {
  Briefcase,
  Mail,
  MapPin,
  Navigation,
  Pencil,
  Phone,
  Star,
  UserRoundSearch,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const ProfileSideBar = ({ role, profile }) => {
  const isMobile = useMediaQuery({ query: "(max-width:768px)" });

  useEffect(() => {
    if (profile) {
    }
  }, []);

  if (role === "Client" && profile) {
    return (
      <div className="profile-sidebar gray-bg">
        <div
          className={
            isMobile ? "profile-sidebar-details gray-bg mb-24" : "gray-bg"
          }
        >
          {profile.profilePicture ? (
            <img
              src={profile.profilePicture}
              width={isMobile ? 60 : 100}
              height={isMobile ? 60 : 100}
              className="profile-img mb-24"
            />
          ) : (
            <img
              src={DefaultProfilePicture}
              width={isMobile ? 60 : 100}
              height={isMobile ? 60 : 100}
              className="profile-img mb-24"
            />
          )}

          <div className={isMobile ? "gray-bg" : "mb-24 gray-bg"}>
            <h1 className="profile-name mb-8 gray-bg">
              {profile.firstName} {profile.lastName}
            </h1>
            <div className="flex-center mb-8 profile-info gray-bg">
              <Phone
                width={isMobile ? 20 : 24}
                height={isMobile ? 20 : 24}
                color="#8C8C8C"
                className="gray-bg"
              />
              {profile.contactNumber}
            </div>
            <div className="flex-center mb-8 profile-info gray-bg">
              <Mail
                width={isMobile ? 20 : 24}
                height={isMobile ? 20 : 24}
                color="#8C8C8C"
                className="gray-bg"
              />
              {profile.email}
            </div>
            <div className="flex-center profile-info gray-bg">
              <MapPin
                width={isMobile ? 20 : 24}
                height={isMobile ? 20 : 24}
                color="#8C8C8C"
                className="gray-bg"
              />
              {profile.city + ","} {profile.state} {profile.postalCode}
            </div>
          </div>
        </div>
        <div className="mb-24">
          <Link to={`/profile/${profile._id}/edit`} className="link-none">
            <button className="mb-12 flex-center profile-btn profile-sidebar-edit pointer">
              <Pencil color="#8C8C8C" className="gray-bg" />
              Edit profile
            </button>
          </Link>
          {/* <button className="mb-12 flex-center profile-btn profile-trade">
            <Briefcase color="#FFFFFF" className="profile-trade" />
            Become a tradesperson
          </button> */}
        </div>
        {/* <div className="flex-center flex-between gray-bg">
          <div className="profile-review-text profile-font-w-500 gray-bg">
            Tradesperson Reviews
          </div>
          <div className="flex-center gray-bg">
            <Star color="#1F1F23" fill="#1F1F23" className="gray-bg" />
            <div className="profile-review-num gray-bg">
              4.5{" "}
              <span className="profile-review-total gray-bg">(5 reviews)</span>
            </div>
          </div>
        </div> */}
      </div>
    );
  } else if (role === "Tradie" && profile) {
    return (
      <div className="profile-sidebar gray-bg">
        <div className="mb-32 gray-bg">
          <div className="flex-center gray-bg mb-24">
            {profile.profilePicture ? (
              <img
                src={profile.profilePicture}
                width={100}
                height={100}
                className="profile-img"
              />
            ) : (
              <img
                src={DefaultProfilePicture}
                width={100}
                height={100}
                className="profile-img"
              />
            )}
            {/* <div className="profile-status gray-bg">
              {profile.publishedAds > 0 ? (
                <div className="status-available flex-center mb-16">
                  <div className="green-dot" />
                  Available for work
                </div>
              ) : (
                <div className="status-not-available mb-16">
                  Not available for work
                </div>
              )}
              <div className="profile-review flex-center gray-bg">
                <Star
                  width={20}
                  height={20}
                  color="#1F1F23"
                  fill="#1F1F23"
                  className="profile-star gray-bg"
                />
                5{" "}
                <span className="profile-reviews gray-bg">
                  ({profile.clientReviews.length - 1} reviews)
                </span>
              </div>
            </div> */}
          </div>
          <div className="gray-bg">
            <h1 className="profile-name gray-bg mb-8">
              {profile.firstName + " " + profile.lastName}
            </h1>
            <div className="profile-info flex-center gray-bg mb-8">
              <MapPin color="#8C8C8C" className="gray-bg" />
              {profile.businessPostCode}
            </div>
            <div className="profile-info flex-center gray-bg">
              <Navigation color="#8C8C8C" className="gray-bg" />
              {profile.proximityToWork}
            </div>
          </div>
        </div>
        <div className="mb-32 gray-bg">
          <div className="gray-bg mb-32">
            <h2 className="profile-font-w-500 gray-bg mb-12">About me</h2>
            <div className="profile-about-text gray-bg">
              {profile.aboutMeDescription}
            </div>
          </div>
          <div className="gray-bg mb-32">
            <h2 className="profile-font-w-500 gray-bg mb-12">Services</h2>
            <div className="profile-services gray-bg">
              {profile.services.map((service, i) => (
                <span className="profile-service" key={i}>
                  {service}
                </span>
              ))}
            </div>
          </div>
          <div className="gray-bg">
            <h2 className="profile-font-w-500 gray-bg mb-12">
              Contact and Socials
            </h2>
            <div className="profile-contacts flex-center gray-bg mb-8">
              <Phone color="#595959" className="gray-bg" />
              {profile.contactNumber}
            </div>
            <div className="profile-contacts flex-center gray-bg mb-8">
              <Mail color="#595959" className="gray-bg" />
              {profile.email}
            </div>
            {profile.facebookAccount && (
              <div className="profile-contacts flex-center gray-bg mb-8">
                <img
                  width={24}
                  height={24}
                  src={Facebook}
                  className="gray-bg"
                />
                {profile.facebookAccount}
              </div>
            )}
            {profile.igAccount && (
              <div className="profile-contacts flex-center gray-bg">
                <img
                  width={24}
                  height={24}
                  src={Instagram}
                  className="gray-bg"
                />
                {profile.igAccount}
              </div>
            )}
          </div>
        </div>
        <div className="gray-bg">
          <Link to={`/profile/${profile._id}/edit`} className="link-none">
            <button className="mb-12 flex-center profile-btn profile-sidebar-edit pointer">
              <Pencil color="#8C8C8C" className="gray-bg" />
              Edit profile
            </button>
          </Link>
          {/* <button className="profile-btn profile-trade flex-center">
            <UserRoundSearch color="#FFFFFF" className="icon-bg-black" />
            Switch to hiring someone
          </button> */}
        </div>
      </div>
    );
  }
};

export default ProfileSideBar;
