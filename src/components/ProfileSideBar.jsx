import React from "react";
import "../styles/Profile.css";
import CardImage from "../assets/images/card-image.png";
import { Briefcase, Mail, MapPin, Pencil, Phone, Star } from "lucide-react";

const ProfileSideBar = () => {
  return (
    <div className="profile-sidebar gray-bg">
      <img
        src={CardImage}
        width={100}
        height={100}
        className="profile-img mb-24"
      />
      <div className="mb-24 gray-bg">
        <h1 className="profile-name mb-8 gray-bg">Ian Arceta</h1>
        <div className="flex-center mb-8 profile-info gray-bg">
          <Phone color="#8C8C8C" className="gray-bg" />
          +61 234 567 890
        </div>
        <div className="flex-center mb-8 profile-info gray-bg">
          <Mail color="#8C8C8C" className="gray-bg" />
          ianarceta@gmail.com
        </div>
        <div className="flex-center profile-info gray-bg">
          <MapPin color="#8C8C8C" className="gray-bg" />
          Fremantle, WA 6160
        </div>
      </div>
      <div className="mb-24">
        <button className="mb-12 flex-center profile-btn profile-edit">
          <Pencil color="#8C8C8C" className="gray-bg" />
          Edit profile
        </button>
        <button className="mb-12 flex-center profile-btn profile-trade">
          <Briefcase color="#FFFFFF" className="profile-trade" />
          Become a tradesperson
        </button>
      </div>
      <div className="flex-center flex-between gray-bg">
        <div className="profile-review-text gray-bg">Tradesperson Reviews</div>
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
};

export default ProfileSideBar;
