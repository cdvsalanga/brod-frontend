import React, { useState } from "react";
import "../styles/JobAd.css";
import CardImage from "../assets/images/card-image.png";
import Briefcase from "../assets/icons/briefcase.svg";
import Phone from "../assets/icons/phone.svg";
import Facebook from "../assets/icons/facebook.svg";
import Instagram from "../assets/icons/instagram.svg";
import { ArrowUpRight, MapPin, Navigation, Mail, X } from "lucide-react";
import Complete from "../assets/images/complete.svg";
import JobOffer from "./JobOffer";

const JobAdSidebar = () => {
  const [showOffer, setShowOffer] = useState(false);
  const [complete, setComplete] = useState(false);

  const submitHandler = () => {
    setComplete(true);
  };
  return (
    <div className="tradie-details gray-bg">
      <div className="mb-32 gray-bg">
        <div className="mb-24 gray-bg flex-center">
          <img src={CardImage} className="tradie-img gray-bg" />
          <div className="gray-bg">
            <div className="gray-bg status-available flex-center mb-16">
              <div className="gray-bg green-dot" />
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
          <button
            className="tradie-btn tradie-btn-hire flex-center pointer"
            onClick={() => setShowOffer(true)}
          >
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
      {showOffer && (
        <div className="job-offer scroll-lock">
          {complete ? (
            <div className="offer-complete">
              <div className="mb-48">
                <img className="mb-24" src={Complete} />
                <h1 className="offer-complete-h1 mb-24">
                  Your inquiry has been sent.
                </h1>
                <div>
                  The Tradesperson will review the details and reach out to you
                  through chat or the contact information you provided. If you
                  haven't heard back, feel free to reach out using the contact
                  details listed on their profile or job ad.
                </div>
              </div>
              <button
                className="offer-complete-btn pointer"
                onClick={() => {
                  setComplete(false);
                  setShowOffer(false);
                }}
              >
                Close
              </button>
            </div>
          ) : (
            <div className="offer-form">
              <form onSubmit={submitHandler}>
                <h1 className="offer-h1 mb-20">
                  Provide Job Details and Make an Offer
                </h1>
                <div className="mb-24">
                  <label className="block mb-12">Job Ad Title</label>
                  <input
                    className="offer-title offer-input"
                    type="text"
                    value="All-Around Painting Services"
                    disabled
                  />
                </div>
                <div className="mb-24">
                  <label className="block mb-12">
                    Detailed description of the service you need.{" "}
                    <span className="offer-required">(required)</span>
                  </label>
                  <textarea className="offer-textbox offer-input" />
                </div>
                <div className="mb-24 flex-between">
                  <div className="half-inputs">
                    <label className="block mb-12">
                      Your Postcode{" "}
                      <span className="offer-required">(required)</span>
                    </label>
                    <input
                      type="text"
                      className="offer-input offer-input-half"
                      placeholder="0000"
                    />
                  </div>
                  <div className="half-inputs">
                    <label className="block mb-12">
                      Contact Number{" "}
                      <span className="offer-required">(required)</span>
                    </label>
                    <input
                      type="text"
                      className="offer-input offer-input-half"
                    />
                  </div>
                </div>
                <div className="mb-24 flex-between">
                  <div className="half-inputs">
                    <label className="block mb-12">
                      Target Start Date{" "}
                      <span className="offer-required">(required)</span>
                    </label>
                    <input
                      type="date"
                      className="offer-input offer-input-half"
                    />
                  </div>
                  <div className="half-inputs">
                    <label className="block mb-12">
                      Target Completion Date{" "}
                      <span className="offer-required">(required)</span>
                    </label>
                    <input
                      type="date"
                      className="offer-input offer-input-half"
                    />
                  </div>
                </div>
                <div className="mb-32 half-inputs">
                  <label className="block mb-12">Your Budget</label>
                  <div>
                    <input
                      type="text"
                      className="offer-input offer-budget-text"
                      placeholder="000"
                    />
                    <select className="offer-input offer-budget-select">
                      <option>AUD</option>
                    </select>
                  </div>
                </div>
                <div className="offer-next-list gray-bg">
                  <h2 className="offer-h2 mb-16 gray-bg">What happens next?</h2>
                  <ol className="offer-list gray-bg">
                    <li className="gray-bg mb-16">
                      The Tradesperson reviews your inquiry and may ask for more
                      details.
                    </li>
                    <li className="gray-bg mb-16">
                      Discuss pricing and finalize details via chat or call.
                    </li>
                    <li className="gray-bg mb-16">
                      Agree on terms, and the job gets done.
                    </li>
                  </ol>
                </div>
                <div className="flex-end">
                  <button
                    className="offer-btn"
                    onClick={() => setShowOffer(false)}
                  >
                    Cancel
                  </button>
                  <button className="offer-btn offer-btn-blk" type="submit">
                    Send
                  </button>
                </div>
              </form>
              <X
                className="offer-x pointer"
                onClick={() => setShowOffer(false)}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobAdSidebar;
