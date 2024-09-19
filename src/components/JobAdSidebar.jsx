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
    <div className="tradie-details tradie-background">
      <div className="job-ad-mb-32 tradie-background">
        <div className="job-ad-mb-24 tradie-background flex-center">
          <img src={CardImage} className="tradie-img tradie-background" />
          <div className="tradie-background">
            <div className="tradie-background tradie-status flex-center">
              <div className="tradie-background tradie-dot" />
              Available for work
            </div>
            <div className="tradie-background flex-center">
              <span className="tradie-background tradie-rate-num">$18</span>
              <span className="tradie-background tradie-rate-text">
                Call out rate
              </span>
            </div>
          </div>
        </div>
        <div className="job-ad-mb-24 tradie-background">
          <div className="flex-center tradie-background">
            <span className="tradie-background tradie-name">Yves Vergara</span>
            <span className="tradie-background tradie-view">View profile</span>
            <ArrowUpRight className="tradie-background tradie-arrow" />
          </div>
          <div className="tradie-background tradie-location flex-center tradie-my-8">
            <MapPin className="tradie-background" color="#8C8C8C" />
            <span className="tradie-background">Sydney, NSW 2000</span>
          </div>
          <div className="tradie-background tradie-location flex-center">
            <Navigation className="tradie-background" color="#8C8C8C" />
            <span className="tradie-background">Can work within 50km</span>
          </div>
        </div>

        <div className="tradie-background job-ad-mb-32">
          <button className="tradie-btn tradie-btn-hire flex-center">
            <img src={Briefcase} className="tradie-icon-case" />
            Hire
          </button>
          <button className="tradie-btn tradie-btn-chat flex-center">
            <Mail />
            Chat
          </button>
        </div>
      </div>
      <div className="tradie-background">
        <div className="tradie-background job-ad-mb-32">
          <h2 className="tradie-background tradie-h2">About me</h2>
          <div className="tradie-background tradie-about">
            Skilled in painting and carpentry with 7 years of experience, I
            deliver quality craftsmanship in every project, from custom woodwork
            to flawless finishes. Your vision, brought to life with precision
            and care.
          </div>
        </div>
        <div className="tradie-background job-ad-mb-32">
          <h2 className="tradie-background tradie-h2">Services</h2>
          <div className="tradie-background tradie-services">
            <span className="tradie-service">Painting</span>
            <span className="tradie-service">Lighting Expert</span>
            <span className="tradie-service">Floor Coating</span>
            <span className="tradie-service">Carpenter</span>
            <span className="tradie-service">Handyman</span>
          </div>
        </div>
        <div className="tradie-background">
          <h2 className="tradie-background tradie-h2">Contact and Socials</h2>
          <div className="tradie-background tradie-contact flex-center">
            <img src={Phone} className="tradie-contact-icon" />
            <span className="tradie-background">+61 412 456 789</span>
          </div>
          <div className="tradie-background tradie-contact flex-center">
            <Mail className="tradie-contact-icon" />
            <span className="tradie-background">vergaraservices@gmail.com</span>
          </div>
          <div className="tradie-background tradie-contact flex-center">
            <img src={Facebook} className="tradie-contact-icon" />
            <span className="tradie-background">yvesvergservices</span>
          </div>
          <div className="tradie-background tradie-contact flex-center">
            <img src={Instagram} className="tradie-contact-icon" />
            <span className="tradie-background">yvesvergservices</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobAdSidebar;
