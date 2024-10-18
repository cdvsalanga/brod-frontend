import React from "react";
import "../styles/Profile.css";
import DefaultProfilePicture from "../assets/images/default-profile-picture.png";
import CardImage from "../assets/images/card-image.png";
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

const ProfileSideBar = ({ role, profile }) => {
  if (role === "Client") {
    return (
      <div className="profile-sidebar gray-bg">
        {profile.profilePicture ? (
          <img
            src={CardImage}
            width={100}
            height={100}
            className="profile-img mb-24"
          />
        ) : (
          <img
            src={DefaultProfilePicture}
            width={100}
            height={100}
            className="profile-img mb-24"
          />
        )}
        <div className="mb-24 gray-bg">
          <h1 className="profile-name mb-8 gray-bg">
            {profile.firstName} {profile.lastName}
          </h1>
          <div className="flex-center mb-8 profile-info gray-bg">
            <Phone color="#8C8C8C" className="gray-bg" />
            {profile.contactNumber}
          </div>
          <div className="flex-center mb-8 profile-info gray-bg">
            <Mail color="#8C8C8C" className="gray-bg" />
            {profile.email}
          </div>
          <div className="flex-center profile-info gray-bg">
            <MapPin color="#8C8C8C" className="gray-bg" />
            {profile.city && profile.city + ","} {profile.state}{" "}
            {profile.postalCode}
          </div>
        </div>
        <div className="mb-24">
          <Link
            to={profile && `/profile/${profile._id}/edit`}
            className="link-none"
          >
            <button className="mb-12 flex-center profile-btn profile-sidebar-edit pointer">
              <Pencil color="#8C8C8C" className="gray-bg" />
              Edit profile
            </button>
          </Link>
          <button className="mb-12 flex-center profile-btn profile-trade">
            <Briefcase color="#FFFFFF" className="profile-trade" />
            Become a tradesperson
          </button>
        </div>
        <div className="flex-center flex-between gray-bg">
          <div className="profile-font-w-500 gray-bg">Tradesperson Reviews</div>
          <div className="flex-center gray-bg">
            <Star color="#1F1F23" fill="#1F1F23" className="gray-bg" />
            <div className="profile-review-num gray-bg">
              4.5{" "}
              <span className="profile-review-total gray-bg">(5 reviews)</span>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="profile-sidebar gray-bg">
        <div className="mb-32 gray-bg">
          <div className="flex-center gray-bg mb-24">
            <img
              src={DefaultProfilePicture}
              width={100}
              height={100}
              className="profile-img"
            />
            <div className="profile-status gray-bg">
              <div className="gray-bg status-available flex-center mb-16">
                <div className="gray-bg green-dot" />
                Available for work
              </div>
              <div className="profile-review flex-center gray-bg">
                <Star
                  width={20}
                  height={20}
                  color="#1F1F23"
                  fill="#1F1F23"
                  className="profile-star gray-bg"
                />
                4.5 <span className="profile-reviews gray-bg">(5 reviews)</span>
              </div>
            </div>
          </div>
          <div className="gray-bg">
            <h1 className="profile-name gray-bg mb-8">Yves Vergara</h1>
            <div className="profile-info flex-center gray-bg mb-8">
              <MapPin color="#8C8C8C" className="gray-bg" />
              Sydney, NSW 2000
            </div>
            <div className="profile-info flex-center gray-bg">
              <Navigation color="#8C8C8C" className="gray-bg" />
              Can work within 50km
            </div>
          </div>
        </div>
        <div className="mb-32 gray-bg">
          <div className="gray-bg mb-32">
            <h2 className="profile-font-w-500 gray-bg mb-12">About me</h2>
            <div className="profile-about-text gray-bg">
              Skilled in painting and carpentry with 7 years of experience, I
              deliver quality craftsmanship in every project, from custom
              woodwork to flawless finishes. Your vision, brought to life with
              precision and care.
            </div>
          </div>
          <div className="gray-bg mb-32">
            <h2 className="profile-font-w-500 gray-bg mb-12">Services</h2>
            <div className="profile-services gray-bg">
              <span className="profile-service">Painting</span>
              <span className="profile-service">Lighting Expert</span>
              <span className="profile-service">Floor Coating</span>
              <span className="profile-service">Carpenter</span>
              <span className="profile-service">Handyman</span>
            </div>
          </div>
          <div className="gray-bg">
            <h2 className="profile-font-w-500 gray-bg mb-12">
              Contact and Socials
            </h2>
            <div className="profile-contacts flex-center gray-bg mb-8">
              <Phone color="#595959" className="gray-bg" />
              +61 412 456 789
            </div>
            <div className="profile-contacts flex-center gray-bg mb-8">
              <Mail color="#595959" className="gray-bg" />
              vergaraservices@gmail.com
            </div>
            <div className="profile-contacts flex-center gray-bg mb-8">
              <img width={24} height={24} src={Facebook} className="gray-bg" />
              yvesvergservices
            </div>
            <div className="profile-contacts flex-center gray-bg">
              <img width={24} height={24} src={Instagram} className="gray-bg" />
              yvesvergservices
            </div>
          </div>
        </div>
        <div className="gray-bg">
          <Link
            to={profile && `/profile/${profile._id}/edit`}
            className="link-none"
          >
            <button className="mb-12 flex-center profile-btn profile-sidebar-edit pointer">
              <Pencil color="#8C8C8C" className="gray-bg" />
              Edit profile
            </button>
          </Link>
          <button className="profile-btn profile-trade flex-center">
            <UserRoundSearch color="#FFFFFF" className="icon-bg-black" />
            Switch to hiring someone
          </button>
        </div>
      </div>
    );
  }
};

export default ProfileSideBar;
