import React from "react";
import "../styles/JobAd.css";
import CardImage from "../assets/images/card-image.png";
import Briefcase from "../assets/icons/briefcase.svg";
import Phone from "../assets/icons/phone.svg";
import Facebook from "../assets/icons/facebook.svg";
import Instagram from "../assets/icons/instagram.svg";
import { ArrowUpRight, MapPin, Navigation, Mail } from "lucide-react";

const JobAdSidebar = () => {
  return (
    <div className="tradie-details gray-bg">
      <div className="mb-32 gray-bg">
        <div className="mb-24 gray-bg flex-center">
          <img src={CardImage} className="tradie-img gray-bg" />
          <div className="gray-bg">
            <div className="gray-bg tradie-status flex-center">
              <div className="gray-bg tradie-dot" />
              Available for work
            </div>
            <div className="gray-bg flex-center">
              <span className="gray-bg tradie-rate-num">$18</span>
              <span className="gray-bg tradie-rate-text">Call out rate</span>
            </div>
          </div>
        </div>
        <div className="mb-24 gray-bg">
          <div className="flex-center gray-bg">
            <span className="gray-bg tradie-name">Yves Vergara</span>
            <span className="gray-bg tradie-view">View profile</span>
            <ArrowUpRight className="gray-bg tradie-arrow" />
          </div>
          <div className="gray-bg tradie-location flex-center tradie-my-8">
            <MapPin className="gray-bg" color="#8C8C8C" />
            <span className="gray-bg">Sydney, NSW 2000</span>
          </div>
          <div className="gray-bg tradie-location flex-center">
            <Navigation className="gray-bg" color="#8C8C8C" />
            <span className="gray-bg">Can work within 50km</span>
          </div>
        </div>

        <div className="gray-bg mb-32">
          <button className="tradie-btn tradie-btn-hire flex-center">
            <img src={Briefcase} className="icon-bg-black" />
            Hire
          </button>
          <button className="tradie-btn tradie-btn-chat flex-center">
            <Mail />
            Chat
          </button>
        </div>
      </div>
      <div className="gray-bg">
        <div className="gray-bg mb-32">
          <h2 className="gray-bg tradie-h2">About me</h2>
          <div className="gray-bg tradie-about">
            Skilled in painting and carpentry with 7 years of experience, I
            deliver quality craftsmanship in every project, from custom woodwork
            to flawless finishes. Your vision, brought to life with precision
            and care.
          </div>
        </div>
        <div className="gray-bg mb-32">
          <h2 className="gray-bg tradie-h2">Services</h2>
          <div className="gray-bg tradie-services">
            <span className="tradie-service">Painting</span>
            <span className="tradie-service">Lighting Expert</span>
            <span className="tradie-service">Floor Coating</span>
            <span className="tradie-service">Carpenter</span>
            <span className="tradie-service">Handyman</span>
          </div>
        </div>
        <div className="gray-bg">
          <h2 className="gray-bg tradie-h2">Contact and Socials</h2>
          <div className="gray-bg tradie-contact flex-center">
            <img src={Phone} className="tradie-contact-icon" />
            <span className="gray-bg">+61 412 456 789</span>
          </div>
          <div className="gray-bg tradie-contact flex-center">
            <Mail className="tradie-contact-icon" />
            <span className="gray-bg">vergaraservices@gmail.com</span>
          </div>
          <div className="gray-bg tradie-contact flex-center">
            <img src={Facebook} className="tradie-contact-icon" />
            <span className="gray-bg">yvesvergservices</span>
          </div>
          <div className="gray-bg tradie-contact flex-center">
            <img src={Instagram} className="tradie-contact-icon" />
            <span className="gray-bg">yvesvergservices</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobAdSidebar;
