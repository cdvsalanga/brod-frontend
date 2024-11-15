import React, { useState } from "react";
import "../styles/JobAd.css";
import "../styles/Header.css";
import DefaultProfilePicture from "../assets/images/default-profile-picture.png";
import Briefcase from "../assets/icons/briefcase.svg";
import Phone from "../assets/icons/phone.svg";
import Facebook from "../assets/icons/facebook.svg";
import Instagram from "../assets/icons/instagram.svg";
import {
  ArrowUpRight,
  MapPin,
  Navigation,
  Mail,
  X,
  ArrowLeft,
  ChevronRight,
  SendHorizonal,
} from "lucide-react";
import Complete from "../assets/images/complete.svg";
import { Link, useNavigate } from "react-router-dom";
import { hireTradie } from "../action/clientActions";
import { useMediaQuery } from "react-responsive";

const JobAdSidebar = ({ userDetails, jobAdDetails, userInfo }) => {
  const isMobile = useMediaQuery({ query: "(max-width:768px)" });

  const [showOffer, setShowOffer] = useState(false);
  const [showInbox, setShowInbox] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [complete, setComplete] = useState(false);
  const [token] = useState(userInfo && userInfo.token);
  const [clientID] = useState(userInfo && userInfo.userId);
  const [tradieID] = useState(userDetails && userDetails._id);
  const [jobAdTitle] = useState(jobAdDetails && jobAdDetails.jobAdTitle);
  const [serviceID] = useState(jobAdDetails && jobAdDetails._id);
  const [status] = useState("Pending");
  const [descriptionServiceNeeded, setDescriptionServiceNeeded] = useState("");
  const [clientContactNumber, setClientContactNumber] = useState(
    userInfo && userInfo.contactNumber
  );
  const [clientPostCode, setClientPostCode] = useState(
    userInfo && userInfo.postalCode
  );
  const [startDate, setStartDate] = useState("");
  const [completionDate, setCompletionDate] = useState("");
  const [clientBudget, setClientBudget] = useState("");
  const [budgetCurrency, setBudgetCurrency] = useState("AUD");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const date = new Date();

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    // This arrangement can be altered based on how we want the date's format to appear.
    const currentDate = `${year}-${month}-${day}`;
    console.log(currentDate); // "17-6-2022"

    await hireTradie(
      clientID,
      tradieID,
      jobAdTitle,
      serviceID,
      status,
      descriptionServiceNeeded,
      clientContactNumber,
      clientPostCode,
      startDate,
      completionDate,
      clientBudget,
      budgetCurrency,
      currentDate,
      token
    ).then((res) => {
      if (res.message === "Request failed with status code 401") {
        if (confirm("Your session expired, please login again.")) {
          localStorage.removeItem("userInfo");
          navigate("/login");
        }
      } else {
        console.log(res);
        setComplete(true);
      }
    });
  };

  const hireHandler = () => {
    if (userInfo) {
      setShowOffer(true);
    } else {
      navigate("/login");
    }
  };

  if (userDetails && jobAdDetails) {
    return (
      <div className="tradie-details gray-bg">
        <div className="mb-32 gray-bg">
          <div className="mb-24 gray-bg flex-center">
            {userDetails.profilePicture ? (
              <img
                src={userDetails.profilePicture}
                className="tradie-img gray-bg"
              />
            ) : (
              <img src={DefaultProfilePicture} className="tradie-img gray-bg" />
            )}
            <div className="gray-bg">
              <div className="gray-bg status-available flex-center mb-16">
                <div className="gray-bg green-dot" />
                Available for work
              </div>
              {jobAdDetails.pricingStartsAt && jobAdDetails.pricingOption && (
                <div className="gray-bg flex-center">
                  <span className="gray-bg tradie-rate-num">
                    {"$" + jobAdDetails.pricingStartsAt}
                  </span>
                  <span className="gray-bg tradie-rate-text">
                    {jobAdDetails.pricingOption}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className={isMobile ? "mb-20 gray-bg" : "mb-24 gray-bg"}>
            <div className="gray-bg tradie-name">
              {userDetails.firstName + " " + userDetails.lastName}
            </div>
            <div className="gray-bg tradie-location flex-center tradie-my-8">
              <MapPin
                width={isMobile ? 20 : 24}
                height={isMobile ? 20 : 24}
                className="gray-bg"
                color="#8C8C8C"
              />
              <span className="gray-bg">{userDetails.businessPostCode}</span>
            </div>
            {userDetails.proximityToWork && (
              <div className="gray-bg tradie-location flex-center">
                <Navigation
                  width={isMobile ? 20 : 24}
                  height={isMobile ? 20 : 24}
                  className="gray-bg"
                  color="#8C8C8C"
                />
                <span className="gray-bg">{userDetails.proximityToWork}</span>
              </div>
            )}
          </div>

          {isMobile ? (
            <div className="tradie-btns">
              <button
                className="tradie-btn tradie-btn-chat flex-center pointer"
                onClick={() => setShowInbox(true)}
              >
                <Mail />
                Chat
              </button>
              <button
                className="tradie-btn tradie-btn-hire flex-center pointer"
                onClick={hireHandler}
              >
                <img src={Briefcase} className="icon-bg-black" />
                Hire
              </button>
            </div>
          ) : (
            <div className="gray-bg">
              <button
                className="tradie-btn tradie-btn-hire flex-center mb-12 pointer"
                onClick={hireHandler}
              >
                <img src={Briefcase} className="icon-bg-black" />
                Hire
              </button>
              <button
                className="tradie-btn tradie-btn-chat flex-center pointer"
                onClick={() => setShowInbox(true)}
              >
                <Mail />
                Chat
              </button>
            </div>
          )}
        </div>
        <div className="gray-bg">
          {userDetails.aboutMeDescription && (
            <div className={isMobile ? "mb-20 gray-bg" : "gray-bg mb-32"}>
              <h2 className="gray-bg tradie-h2">About me</h2>
              <div className="gray-bg tradie-about">
                {userDetails.aboutMeDescription}
              </div>
            </div>
          )}
          {userDetails.services.length > 0 && (
            <div className={isMobile ? "mb-20 gray-bg" : "gray-bg mb-32"}>
              <h2 className="gray-bg tradie-h2">Services</h2>
              <div className="gray-bg tradie-services">
                {userDetails.services.map((service, i) => (
                  <span className="tradie-service" key={i}>
                    {service}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div className="gray-bg">
            <h2 className="gray-bg tradie-h2">Contact and Socials</h2>
            {userDetails.contactNumber && (
              <div className="gray-bg tradie-contact flex-center">
                <img src={Phone} className="tradie-contact-icon gray-bg" />
                <span className="gray-bg">{userDetails.contactNumber}</span>
              </div>
            )}
            {userDetails.email && (
              <div className="gray-bg tradie-contact flex-center">
                <Mail className="tradie-contact-icon" />
                <span className="gray-bg">{userDetails.email}</span>
              </div>
            )}
            {userDetails.facebookAccount && (
              <div className="gray-bg tradie-contact flex-center">
                <img src={Facebook} className="tradie-contact-icon" />
                <span className="gray-bg">{userDetails.facebookAccount}</span>
              </div>
            )}
            {userDetails.igAccount && (
              <div className="gray-bg tradie-contact flex-center">
                <img src={Instagram} className="tradie-contact-icon" />
                <span className="gray-bg">{userDetails.igAccount}</span>
              </div>
            )}
          </div>
        </div>
        {showOffer && (
          <div className="job-offer scroll-lock">
            {complete ? (
              <div className="offer-complete">
                <div className={isMobile ? "mb-40" : "mb-48"}>
                  <img
                    width={isMobile && 62.96}
                    height={isMobile && 60}
                    className="mb-24"
                    src={Complete}
                  />
                  <h1 className="offer-complete-h1 mb-24">
                    Your inquiry has been sent.
                  </h1>
                  <div>
                    The Tradesperson will review the details and reach out to
                    you through chat or the contact information you provided. If
                    you haven't heard back, feel free to reach out using the
                    contact details listed on their profile or job ad.
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
                  {isMobile && (
                    <div className="offer-h1-container flex-center mb-8">
                      <ArrowLeft
                        width={24}
                        height={24}
                        color="#717171"
                        className="pointer"
                        onClick={() => setShowOffer(false)}
                      />
                      <h1 className="offer-h1">
                        Provide Job Details and Make an Offer
                      </h1>
                    </div>
                  )}
                  <div className="offer-input-container mb-24">
                    <label className="block mb-12">Job Ad Title</label>
                    <input
                      className="offer-title offer-input"
                      type="text"
                      value={jobAdDetails.jobAdTitle}
                      disabled
                    />
                  </div>
                  <div className="offer-input-container mb-24">
                    <label className="block mb-12">
                      Detailed description of the service you need.{" "}
                      <span className="offer-required">(required)</span>
                    </label>
                    <textarea
                      className="offer-textbox offer-input"
                      onChange={(e) =>
                        setDescriptionServiceNeeded(e.target.value)
                      }
                      required
                    />
                  </div>
                  <div
                    className={
                      isMobile
                        ? "offer-input-container mb-24"
                        : "mb-24 flex-between"
                    }
                  >
                    <div className={isMobile ? "mb-24" : "half-inputs"}>
                      <label className="block mb-12">
                        Your Postcode{" "}
                        <span className="offer-required">(required)</span>
                      </label>
                      <input
                        type="text"
                        className="offer-input offer-input-half"
                        placeholder="0000"
                        defaultValue={clientPostCode}
                        onChange={(e) => setClientPostCode(e.target.value)}
                        required
                      />
                    </div>
                    <div className={isMobile ? "mb-24" : "half-inputs"}>
                      <label className="block mb-12">
                        Contact Number{" "}
                        <span className="offer-required">(required)</span>
                      </label>
                      <input
                        type="text"
                        className="offer-input offer-input-half"
                        defaultValue={clientContactNumber}
                        onChange={(e) => setClientContactNumber(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div
                    className={
                      isMobile
                        ? "offer-input-container mb-24"
                        : "mb-24 flex-between"
                    }
                  >
                    <div className={isMobile ? "mb-24" : "half-inputs"}>
                      <label className="block mb-12">
                        Target Start Date{" "}
                        <span className="offer-required">(required)</span>
                      </label>
                      <input
                        type="date"
                        className="offer-input offer-input-half"
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                      />
                    </div>
                    <div className={isMobile ? "mb-24" : "half-inputs"}>
                      <label className="block mb-12">
                        Target Completion Date{" "}
                        <span className="offer-required">(required)</span>
                      </label>
                      <input
                        type="date"
                        className="offer-input offer-input-half"
                        onChange={(e) => setCompletionDate(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div
                    className={
                      isMobile
                        ? "offer-input-container mb-32"
                        : "mb-32 half-inputs"
                    }
                  >
                    <label className="block mb-12">Your Budget</label>
                    <div className="flex-between">
                      <input
                        type="text"
                        className="offer-input offer-budget-text"
                        placeholder="000"
                        onChange={(e) => setClientBudget(e.target.value)}
                      />
                      <select
                        defaultValue={budgetCurrency}
                        className="offer-input offer-budget-select"
                      >
                        <option>AUD</option>
                      </select>
                    </div>
                  </div>
                  <div className="offer-next-list gray-bg">
                    <h2 className="offer-h2 mb-16 gray-bg">
                      What happens next?
                    </h2>
                    <ol className="offer-list gray-bg">
                      <li className="gray-bg mb-16">
                        The Tradesperson reviews your inquiry and may ask for
                        more details.
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
                    {!isMobile && (
                      <button
                        className="offer-btn pointer"
                        type="button"
                        onClick={() => setShowOffer(false)}
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      className="offer-btn offer-btn-blk pointer"
                      type="submit"
                    >
                      Send
                    </button>
                  </div>
                </form>
                {!isMobile && (
                  <X
                    className="offer-x pointer"
                    onClick={() => setShowOffer(false)}
                  />
                )}
              </div>
            )}
          </div>
        )}

        {showInbox && (
          <div className="notification scroll-lock">
            {!isMobile && (
              <div className="remove-notif" onClick={() => setShowInbox(false)}>
                <X
                  width={32}
                  height={32}
                  color="#717171"
                  className="close-notif pointer"
                />
              </div>
            )}
            <div className="inbox-contents">
              {isMobile ? (
                <div className="flex-center gap-8 mb-8">
                  <ArrowLeft
                    color="#717171"
                    className="pointer"
                    onClick={() => setShowInbox(false)}
                  />
                  <h1 className="notif-h1">Inbox</h1>
                </div>
              ) : (
                <h1 className="notif-h1 mb-14">Inbox</h1>
              )}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log(inboxSearch);
                }}
              >
                <input
                  type="text"
                  className="inbox-search mb-14"
                  onChange={(e) => setInboxSearch(e.target.value)}
                  placeholder="Search"
                />
              </form>
              <div
                className={
                  showMessage
                    ? "inbox-contents-profile pointer gray-bg"
                    : "inbox-contents-profile pointer"
                }
                onClick={() => setShowMessage(!showMessage)}
              >
                <div
                  className={
                    showMessage
                      ? "flex-center gap-8 gray-bg"
                      : "flex-center gap-8"
                  }
                >
                  <img
                    src={DefaultProfilePicture}
                    width={45}
                    height={45}
                    className={
                      showMessage
                        ? "inbox-profile-img gray-bg"
                        : "inbox-profile-img"
                    }
                  />
                  <div className={showMessage && "gray-bg"}>
                    <div
                      className={
                        showMessage
                          ? "inbox-profile-name gray-bg"
                          : "inbox-profile-name"
                      }
                    >
                      Name
                    </div>
                    <div
                      className={
                        showMessage
                          ? "inbox-profile-loc flex-center gap-8 gray-bg"
                          : "inbox-profile-loc flex-center gap-8"
                      }
                    >
                      <MapPin
                        width={12.8}
                        height={16}
                        color="#8C8C8C"
                        className={showMessage && "gray-bg"}
                      />
                      Location
                    </div>{" "}
                  </div>
                </div>
                <ChevronRight
                  color="#8C8C8C"
                  className={showMessage && "gray-bg"}
                />
              </div>
            </div>
            <div
              className={
                isMobile && showMessage
                  ? "inbox-message-mobile gray-bg"
                  : "inbox-message-container gray-bg"
              }
            >
              {showMessage && (
                <div className="inbox-message-mobile-container gray-bg">
                  {isMobile ? (
                    <div className="flex-center gap-12 gray-bg">
                      <ArrowLeft
                        color="#717171"
                        className="pointer gray-bg"
                        onClick={() => {
                          setShowInbox(true);
                          setShowMessage(false);
                        }}
                      />
                      <div className="mb-16 gray-bg">
                        <div className="flex-center gap-8 gray-bg">
                          <img
                            src={DefaultProfilePicture}
                            width={45}
                            height={45}
                            className="inbox-profile-img gray-bg"
                          />
                          <div className="gray-bg">
                            <div className="inbox-profile-name gray-bg">
                              Name
                            </div>
                            <div className="inbox-profile-loc flex-center gap-8 gray-bg">
                              <MapPin
                                width={12.8}
                                height={16}
                                color="#8C8C8C"
                                className="gray-bg"
                              />
                              Location
                            </div>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mb-16 gray-bg">
                      <div className="flex-center gap-8 gray-bg">
                        <img
                          src={DefaultProfilePicture}
                          width={45}
                          height={45}
                          className="inbox-profile-img gray-bg"
                        />
                        <div className="gray-bg">
                          <div className="inbox-profile-name gray-bg">Name</div>
                          <div className="inbox-profile-loc flex-center gap-8 gray-bg">
                            <MapPin
                              width={12.8}
                              height={16}
                              color="#8C8C8C"
                              className="gray-bg"
                            />
                            Location
                          </div>{" "}
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="inbox-messages gray-bg">
                    <div className="inbox-message-user mb-16 gray-bg">
                      <div className="inbox-message-date mb-4 gray-bg">
                        May 24, 2024 | 9:00 AM
                      </div>
                      <span className="inbox-message">
                        Hi Yves, I would like to follow up on my inquiry about
                        house painting.
                      </span>
                    </div>
                    <div className="inbox-message-user mb-16 gray-bg">
                      <div className="inbox-message-date mb-4 gray-bg">
                        May 24, 2024 | 9:00 AM
                      </div>
                      <span className="inbox-message">
                        Hi Yves, I would like to follow up on my inquiry about
                        house painting.
                      </span>
                    </div>
                    <div className="inbox-message-user mb-16 gray-bg">
                      <div className="inbox-message-date mb-4 gray-bg">
                        May 24, 2024 | 9:00 AM
                      </div>
                      <span className="inbox-message">
                        Hi Yves, I would like to follow up on my inquiry about
                        house painting.
                      </span>
                    </div>
                    <div className="inbox-message-user mb-16 gray-bg">
                      <div className="inbox-message-date mb-4 gray-bg">
                        May 24, 2024 | 9:00 AM
                      </div>
                      <span className="inbox-message">
                        Hi Yves, I would like to follow up on my inquiry about
                        house painting.
                      </span>
                    </div>
                    <div className="inbox-message-user mb-16 gray-bg">
                      <div className="inbox-message-date mb-4 gray-bg">
                        May 24, 2024 | 9:00 AM
                      </div>
                      <span className="inbox-message">
                        Hi Yves, I would like to follow up on my inquiry about
                        house painting.
                      </span>
                    </div>
                    <div className="inbox-message-user mb-16 gray-bg">
                      <div className="inbox-message-date mb-4 gray-bg">
                        May 24, 2024 | 9:00 AM
                      </div>
                      <span className="inbox-message">
                        Hi Yves, I would like to follow up on my inquiry about
                        house painting.
                      </span>
                    </div>
                    <div className="inbox-message-user mb-16 gray-bg">
                      <div className="inbox-message-date mb-4 gray-bg">
                        May 24, 2024 | 9:00 AM
                      </div>
                      <span className="inbox-message">
                        Hi Yves, I would like to follow up on my inquiry about
                        house painting.
                      </span>
                    </div>
                    <div className="inbox-message-user mb-16 gray-bg">
                      <div className="inbox-message-date mb-4 gray-bg">
                        May 24, 2024 | 9:00 AM
                      </div>
                      <span className="inbox-message">
                        Hi Yves, I would like to follow up on my inquiry about
                        house painting.
                      </span>
                    </div>
                  </div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      console.log("first");
                    }}
                    className="inbox-message-input-container gray-bg"
                  >
                    <input
                      type="text"
                      className="inbox-message-input"
                      placeholder="Type something..."
                    />
                    <SendHorizonal
                      width={35.56}
                      height={40}
                      color="#1F1F23"
                      className="inbox-message-send pointer"
                    />
                  </form>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default JobAdSidebar;
