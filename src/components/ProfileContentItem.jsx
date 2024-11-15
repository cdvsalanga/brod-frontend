import React, { useEffect, useState } from "react";
import "../styles/Profile.css";
import "../styles/Header.css";
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
  X,
  EllipsisVertical,
  ArrowLeft,
  ChevronRight,
  SendHorizonal,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { addRating, updateJobStatusClient } from "../action/clientActions";
import DefaultProfilePicture from "../assets/images/default-profile-picture.png";

const ProfileContentItem = ({ item, role, data, profile }) => {
  const isMobile = useMediaQuery({ query: "(max-width:768px)" });

  const [userInfo] = useState(JSON.parse(localStorage.getItem("userInfo")));
  const [showBtns, setShowBtns] = useState(false);
  const [showInbox, setShowInbox] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [jobAdDetails, setJobAdDetails] = useState();
  const [starRating, setStarRating] = useState(0);
  const [ratingDesc, setRatingDesc] = useState();

  const navigate = useNavigate();

  const { id } = useParams();

  let status;

  const updateJobStatusHandler = async (e, status, job) => {
    e.stopPropagation();

    const date = new Date();

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    // This arrangement can be altered based on how we want the date's format to appear.
    const currentDate = `${year}-${month}-${day}`;
    console.log(currentDate);

    await updateJobStatusClient(
      job.tradieID,
      job._id,
      status,
      currentDate,
      userInfo.token
    ).then((res) => {
      if (res.message === "Request failed with status code 401") {
        if (confirm("Your session expired, please login again.")) {
          localStorage.removeItem("userInfo");
          navigate("/login");
        }
      } else {
        window.location.reload();
      }
    });
  };

  const addRatingHandler = async (e) => {
    e.preventDefault();

    const clientLocation = `${jobAdDetails.clientCity}, ${jobAdDetails.clientState} ${jobAdDetails.clientPostalCode}`;

    await addRating(
      jobAdDetails.tradieID,
      jobAdDetails.clientID,
      jobAdDetails._id,
      jobAdDetails.serviceID,
      starRating,
      clientLocation,
      ratingDesc,
      userInfo.token
    ).then((res) => {
      if (res.message === "Request failed with status code 401") {
        if (confirm("Your session expired, please login again.")) {
          localStorage.removeItem("userInfo");
          navigate("/login");
        }
      } else {
        window.location.reload();
      }
      console.log(res);
    });
  };

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  if (role === "Client") {
    return (
      <>
        {data &&
          data.map((res) => (
            <div key={res._id}>
              <div
                className="profile-item mb-16 pointer"
                onClick={() => {
                  if (item === "bookmark") {
                    navigate(`/job-ad/${res.serviceID}`);
                  } else {
                    setJobAdDetails(res);
                    setOpenModal(true);
                  }
                }}
              >
                <div className={!isMobile && "mb-24"}>
                  <div
                    className={
                      isMobile ? "mb-12" : "flex-between flex-center mb-12"
                    }
                  >
                    <h2 className="profile-item-name">{res.jobPostAdTitle}</h2>
                    <div className="profile-item-date-text">
                      {item === "job"
                        ? "Job accepted on"
                        : item === "offer"
                        ? "Inquiry Sent on"
                        : item === "complete"
                        ? "Job completed on"
                        : "Bookmarked on"}{" "}
                      <span className="profile-font-w-500">
                        {res.jobActionDate}
                      </span>
                    </div>
                  </div>
                  <div className="mb-12 profile-job-details">
                    <div className="flex-center profile-job-detail">
                      <User width={20} height={20} color="#8C8C8C" />
                      {res.tradieName}
                    </div>
                    <div className="flex-center profile-job-detail">
                      <MapPin width={20} height={20} color="#8C8C8C" />
                      {res.tradieLocation}
                    </div>
                    <div className="flex-center profile-job-detail">
                      <Navigation width={20} height={20} color="#8C8C8C" />
                      {res.proximity}
                    </div>
                  </div>
                  <div className="profile-item-details">
                    {res.jobAdDescription}
                  </div>
                </div>
                {isMobile && (
                  <EllipsisVertical
                    width={28}
                    height={28}
                    color={showBtns ? "#1F1F23" : "#717171"}
                    className="profile-item-menu pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowBtns(true);
                    }}
                  />
                )}
                {isMobile && showBtns && (
                  <div
                    className="profile-item-btns-container scroll-lock"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="profile-item-btns">
                      {item === "job" ? (
                        <div>
                          <button className="profile-btn-mobile profile-btn-mobile-cancel flex-center pointer">
                            <CircleX width={28} height={28} />
                            Cancel job
                          </button>
                          <button className="profile-btn-mobile flex-center pointer">
                            <Check width={28} height={28} color="#8C8C8C" />
                            Mark as completed
                          </button>
                        </div>
                      ) : item === "offer" ? (
                        <div>
                          <button className="profile-btn-mobile profile-btn-mobile-cancel flex-center pointer">
                            <CircleX width={28} height={28} />
                            Cancel offer
                          </button>
                          <button className="profile-btn-mobile flex-center pointer">
                            <Mail width={28} height={28} color="#8C8C8C" />
                            Chat tradesperson
                          </button>

                          <button className="profile-btn-mobile flex-center pointer">
                            <FileText width={28} height={28} color="#8C8C8C" />
                            See offer details
                          </button>
                        </div>
                      ) : (
                        <button className="profile-btn-mobile flex-center pointer">
                          <Star width={28} height={28} color="#8C8C8C" />
                          Rate the service
                        </button>
                      )}
                      <X
                        className="profile-item-btns-close pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowBtns(false);
                        }}
                      />
                    </div>
                  </div>
                )}
                {!isMobile && (
                  <div
                    className={
                      item === "complete" || item === "bookmark"
                        ? "flex-end"
                        : "flex-between"
                    }
                  >
                    {(item === "job" || item === "offer") && (
                      <button
                        type="button"
                        className="profile-btn-cancel flex-center pointer"
                        onClick={(e) =>
                          updateJobStatusHandler(e, (status = "Cancelled"), res)
                        }
                      >
                        <CircleX />
                        Cancel job
                      </button>
                    )}
                    <div>
                      {item === "job" ? (
                        <button
                          type="button"
                          className="profile-btn-black flex-center pointer"
                          onClick={(e) =>
                            updateJobStatusHandler(
                              e,
                              (status = "Completed"),
                              res
                            )
                          }
                        >
                          <Check
                            width={20}
                            height={20}
                            className="icon-bg-black"
                          />
                          Mark as completed
                        </button>
                      ) : item === "offer" ? (
                        <div className="profile-item-offer">
                          <button className="profile-btn-offer flex-center pointer">
                            <FileText width={20} height={20} />
                            See offer details
                          </button>
                          <button
                            className="profile-btn-black profile-btn-chat flex-center pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowInbox(true);
                            }}
                          >
                            <Mail
                              width={20}
                              height={20}
                              className="icon-bg-black"
                            />
                            Chat
                          </button>
                        </div>
                      ) : item === "complete" ? (
                        res.ratingDesc ? (
                          <div className="profile-complete-rated">
                            <div>
                              <Star fill="#1F1F23" />
                              <Star fill="#1F1F23" />
                              <Star fill="#1F1F23" />
                              <Star fill="#1F1F23" />
                              <Star fill="#1F1F23" />
                            </div>
                            <span className="profile-rated-text">
                              See rating details
                            </span>
                          </div>
                        ) : (
                          <button
                            type="button"
                            className="profile-btn-black flex-center pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenModal(true);
                            }}
                          >
                            <Star
                              width={20}
                              height={20}
                              fill="#FFFFFF"
                              className="icon-bg-black"
                            />
                            Rate the service
                          </button>
                        )
                      ) : (
                        <div className="profile-bookmark flex-center">
                          <Bookmark fill="#1F1F23" />
                          Bookmarked
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        {openModal && (
          <div className="profile-modal scroll-lock">
            {item === "offer" ? (
              <div className="profile-modal-content profile-modal-job profile-modal-offer">
                {isMobile ? (
                  <div className="flex-center gap-8 mb-20">
                    <ArrowLeft
                      color="#717171"
                      className="pointer"
                      onClick={() => setOpenModal(false)}
                    />
                    <h1 className="profile-modal-h1">Sent Offer Details</h1>
                  </div>
                ) : (
                  <h1 className="profile-modal-h1 mb-24">Sent Offer Details</h1>
                )}
                <div className="mb-24">
                  <label className="profile-modal-labels mb-12">
                    Job Ad Title
                  </label>
                  <input
                    type="text"
                    value={jobAdDetails.jobPostAdTitle}
                    disabled
                    className="profile-modal-inputs profile-modal-input"
                  />
                </div>
                <div className="mb-24">
                  <label className="profile-modal-labels mb-12">
                    Detailed description of the service you need.{" "}
                    <span className="profile-modal-required">(required)</span>
                  </label>
                  <textarea
                    value={jobAdDetails.descriptionServiceNeeded}
                    disabled
                    className="profile-modal-inputs profile-modal-input-textarea"
                  />
                </div>
                <div className="mb-24">
                  <label className="profile-modal-labels mb-12">
                    Your Postcode{" "}
                    <span className="profile-modal-required">(required)</span>
                  </label>
                  <input
                    type="text"
                    value={jobAdDetails.clientPostalCode}
                    disabled
                    className="profile-modal-inputs profile-modal-input"
                  />
                </div>
                {isMobile && (
                  <div className="mb-24">
                    <label className="profile-modal-labels mb-12">
                      Contact Number{" "}
                      <span className="profile-modal-required">(required)</span>
                    </label>
                    <input
                      type="text"
                      value={jobAdDetails.clientContactNumber}
                      disabled
                      className="profile-modal-inputs profile-modal-input"
                    />
                  </div>
                )}
                <div className={isMobile ? "mb-24" : "mb-24 flex-between"}>
                  <div className={isMobile ? "mb-24" : "half-inputs"}>
                    <label className="profile-modal-labels mb-12">
                      Target Start Date{" "}
                      <span className="profile-modal-required">(required)</span>
                    </label>
                    <input
                      type="date"
                      value={jobAdDetails.startDate}
                      disabled
                      className={
                        isMobile
                          ? "profile-modal-inputs profile-modal-input"
                          : "profile-modal-inputs profile-modal-half-input"
                      }
                    />
                  </div>
                  <div className={!isMobile && "half-inputs"}>
                    <label className="profile-modal-labels mb-12">
                      Desired Finish Date
                    </label>
                    <input
                      type="date"
                      value={jobAdDetails.completionDate}
                      disabled
                      className={
                        isMobile
                          ? "profile-modal-inputs profile-modal-input"
                          : "profile-modal-inputs profile-modal-half-input"
                      }
                    />
                  </div>
                </div>
                <div className={isMobile ? "mb-44" : "mb-24 flex-between"}>
                  <div className={!isMobile && "half-inputs"}>
                    <label className="profile-modal-labels mb-12">
                      Your Budget
                    </label>
                    <div
                      className={
                        isMobile ? "flex-center gap-8" : "flex-between"
                      }
                    >
                      <input
                        type="text"
                        placeholder="000"
                        value={jobAdDetails.clientBudget}
                        disabled
                        className="profile-modal-inputs profile-modal-budget"
                      />
                      <select
                        disabled
                        className="profile-modal-inputs profile-modal-select"
                        defaultValue={jobAdDetails.budgetCurrency}
                      >
                        <option>AUD</option>
                      </select>
                    </div>
                  </div>
                  {!isMobile && (
                    <div className="half-inputs">
                      <label className="profile-modal-labels mb-12">
                        Contact Number
                      </label>
                      <input
                        type="text"
                        value="+61 345678901"
                        disabled
                        className="profile-modal-inputs profile-modal-half-input"
                      />
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  className="profile-btn-cancel flex-center pointer"
                  onClick={(e) =>
                    updateJobStatusHandler(e, (status = "Cancelled"), res)
                  }
                >
                  <CircleX />
                  Cancel job
                </button>
                {!isMobile && (
                  <X
                    className="profile-modal-close pointer"
                    width={32}
                    height={32}
                    color="#837F89"
                    onClick={() => setOpenModal(false)}
                  />
                )}
              </div>
            ) : item === "job" ? (
              <div className="profile-modal-content profile-modal-job">
                {isMobile && (
                  <div className="flex-center gap-8 mb-20">
                    <ArrowLeft
                      color="#717171"
                      className="pointer"
                      onClick={() => setOpenModal(false)}
                    />
                    <h1 className="profile-modal-h1">Job Ad Details</h1>
                  </div>
                )}
                <h1
                  className={
                    isMobile
                      ? "profile-modal-h1 mb-6"
                      : "profile-modal-h1 mb-16"
                  }
                >
                  {jobAdDetails.jobPostAdTitle}
                </h1>
                {isMobile &&
                  (item === "job" ? (
                    <div className="profile-item-date-text mb-8">
                      Job accepted on{" "}
                      <span className="profile-font-w-500">
                        {jobAdDetails.jobActionDate}
                      </span>
                    </div>
                  ) : (
                    <div className="profile-item-date-text mb-8">
                      Job completed on{" "}
                      <span className="profile-font-w-500">
                        {jobAdDetails.jobActionDate}
                      </span>
                    </div>
                  ))}
                <div className="profile-modal-details">
                  <div className="profile-modal-detail flex-center">
                    <User width={20} height={20} color="#8C8C8C" />
                    {jobAdDetails.tradieName}
                  </div>
                  <div className="profile-modal-detail flex-center">
                    <MapPin width={20} height={20} color="#8C8C8C" />
                    {jobAdDetails.tradieLocation}
                  </div>
                  <div className="profile-modal-detail flex-center">
                    <Navigation width={20} height={20} color="#8C8C8C" />
                    {jobAdDetails.proximity}
                  </div>
                </div>

                <div className="profile-modal-description">
                  {jobAdDetails.jobAdDescription}
                </div>

                <div className="flex-between">
                  <button className="profile-btn-cancel flex-center">
                    <CircleX />
                    Cancel job
                  </button>
                  <button
                    type="button"
                    className="profile-btn-black flex-center pointer"
                    onClick={(e) =>
                      updateJobStatusHandler(e, (status = "Completed"), res)
                    }
                  >
                    <Check width={20} height={20} className="icon-bg-black" />
                    Mark as completed
                  </button>
                </div>
                {!isMobile && (
                  <X
                    className="profile-modal-close pointer"
                    width={32}
                    height={32}
                    color="#837F89"
                    onClick={() => setOpenModal(false)}
                  />
                )}
              </div>
            ) : item === "complete" ? (
              jobAdDetails.ratingDesc ? (
                <div className="profile-modal-content profile-modal-job">
                  {isMobile && (
                    <div className="flex-center gap-8 mb-20">
                      <ArrowLeft
                        color="#717171"
                        className="pointer"
                        onClick={() => setOpenModal(false)}
                      />
                      <h1 className="profile-modal-h1">Job Details</h1>
                    </div>
                  )}
                  <h1
                    className={
                      isMobile
                        ? "profile-modal-h1 mb-6"
                        : "profile-modal-h1 mb-16"
                    }
                  >
                    {jobAdDetails.jobPostAdTitle}
                  </h1>
                  {isMobile &&
                    (item === "job" ? (
                      <div className="profile-item-date-text mb-8">
                        Job accepted on{" "}
                        <span className="profile-font-w-500">
                          {jobAdDetails.jobActionDate}
                        </span>
                      </div>
                    ) : (
                      <div className="profile-item-date-text mb-8">
                        Job completed on{" "}
                        <span className="profile-font-w-500">
                          {jobAdDetails.jobActionDate}
                        </span>
                      </div>
                    ))}
                  <div className="profile-modal-details">
                    <div className="profile-modal-detail flex-center">
                      <User width={20} height={20} color="#8C8C8C" />
                      {jobAdDetails.tradieName}
                    </div>
                    <div className="profile-modal-detail flex-center">
                      <MapPin width={20} height={20} color="#8C8C8C" />
                      {jobAdDetails.tradieLocation}
                    </div>
                    <div className="profile-modal-detail flex-center">
                      <Navigation width={20} height={20} color="#8C8C8C" />
                      {jobAdDetails.proximity}
                    </div>
                  </div>

                  <form>
                    <label>Rate the service</label>
                    <input type="text" />
                  </form>
                  {!isMobile && (
                    <X
                      className="profile-modal-close pointer"
                      width={32}
                      height={32}
                      color="#837F89"
                      onClick={() => setOpenModal(false)}
                    />
                  )}
                </div>
              ) : (
                <div className="profile-modal-content profile-modal-offer">
                  {isMobile && (
                    <div className="flex-center gap-8 mb-20">
                      <ArrowLeft
                        color="#717171"
                        className="pointer"
                        onClick={() => setOpenModal(false)}
                      />
                      <h1 className="profile-modal-h1">Job Details</h1>
                    </div>
                  )}
                  <h1
                    className={
                      isMobile
                        ? "profile-modal-h1 mb-6"
                        : "profile-modal-h1 mb-16"
                    }
                  >
                    {jobAdDetails.jobPostAdTitle}
                  </h1>
                  {isMobile &&
                    (item === "job" ? (
                      <div className="profile-item-date-text mb-8">
                        Job accepted on{" "}
                        <span className="profile-font-w-500">
                          {jobAdDetails.jobActionDate}
                        </span>
                      </div>
                    ) : (
                      <div className="profile-item-date-text mb-8">
                        Job completed on{" "}
                        <span className="profile-font-w-500">
                          {jobAdDetails.jobActionDate}
                        </span>
                      </div>
                    ))}
                  <div className="profile-modal-details">
                    <div className="profile-modal-detail flex-center">
                      <User width={20} height={20} color="#8C8C8C" />
                      {jobAdDetails.tradieName}
                    </div>
                    <div className="profile-modal-detail flex-center">
                      <MapPin width={20} height={20} color="#8C8C8C" />
                      {jobAdDetails.tradieLocation}
                    </div>
                    <div className="profile-modal-detail flex-center">
                      <Navigation width={20} height={20} color="#8C8C8C" />
                      {jobAdDetails.proximity}
                    </div>
                  </div>

                  <div className="profile-modal-description">
                    {jobAdDetails.jobAdDescription}
                  </div>

                  <form onSubmit={addRatingHandler}>
                    <div className="flex-center gap-16 mb-8">
                      <div className="profile-modal-rate">Rate the service</div>

                      <div>
                        <Star
                          fill={starRating < 1 ? "#FFFFFF" : "#1F1F23"}
                          className="pointer"
                          onClick={() => setStarRating(1)}
                        />
                        <Star
                          fill={starRating < 2 ? "#FFFFFF" : "#1F1F23"}
                          className="pointer"
                          onClick={() => setStarRating(2)}
                        />
                        <Star
                          fill={starRating < 3 ? "#FFFFFF" : "#1F1F23"}
                          className="pointer"
                          onClick={() => setStarRating(3)}
                        />
                        <Star
                          fill={starRating < 4 ? "#FFFFFF" : "#1F1F23"}
                          className="pointer"
                          onClick={() => setStarRating(4)}
                        />
                        <Star
                          fill={starRating < 5 ? "#FFFFFF" : "#1F1F23"}
                          className="pointer"
                          onClick={() => setStarRating(5)}
                        />
                      </div>
                    </div>
                    <div className="mb-8">
                      <label className="profile-modal-rate block mb-8">
                        Rating description
                      </label>
                      <textarea
                        className="profile-modal-inputs profile-modal-input-textarea"
                        required
                        onChange={(e) => setRatingDesc(e.target.value)}
                      />
                    </div>
                    <div className="flex-end">
                      <button
                        type="submit"
                        className="profile-btn-rate pointer"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                  {!isMobile && (
                    <X
                      className="profile-modal-close pointer"
                      width={32}
                      height={32}
                      color="#837F89"
                      onClick={() => {
                        setStarRating(0);
                        setOpenModal(false);
                      }}
                    />
                  )}
                </div>
              )
            ) : (
              <div className="profile-modal-content profile-modal-job">
                {isMobile && (
                  <div className="flex-center gap-8 mb-20">
                    <ArrowLeft
                      color="#717171"
                      className="pointer"
                      onClick={() => setOpenModal(false)}
                    />
                    <h1 className="profile-modal-h1">Job Ad Details</h1>
                  </div>
                )}
                <h1
                  className={
                    isMobile
                      ? "profile-modal-h1 mb-6"
                      : "profile-modal-h1 mb-16"
                  }
                >
                  {jobAdDetails.jobPostAdTitle}
                </h1>
                {isMobile &&
                  (item === "job" ? (
                    <div className="profile-item-date-text mb-8">
                      Job accepted on{" "}
                      <span className="profile-font-w-500">
                        {jobAdDetails.jobActionDate}
                      </span>
                    </div>
                  ) : (
                    <div className="profile-item-date-text mb-8">
                      Job completed on{" "}
                      <span className="profile-font-w-500">
                        {jobAdDetails.jobActionDate}
                      </span>
                    </div>
                  ))}
                <div className="profile-modal-details">
                  <div className="profile-modal-detail flex-center">
                    <User width={20} height={20} color="#8C8C8C" />
                    {jobAdDetails.tradieName}
                  </div>
                  <div className="profile-modal-detail flex-center">
                    <MapPin width={20} height={20} color="#8C8C8C" />
                    {jobAdDetails.tradieLocation}
                  </div>
                  <div className="profile-modal-detail flex-center">
                    <Navigation width={20} height={20} color="#8C8C8C" />
                    {jobAdDetails.proximity}
                  </div>
                </div>

                <div className="profile-modal-description">
                  {jobAdDetails.jobAdDescription}
                </div>

                <div className="flex-between">
                  <button className="profile-btn-cancel flex-center">
                    <CircleX />
                    Cancel job
                  </button>
                  <button className="profile-btn-black flex-center">
                    <Check width={20} height={20} className="icon-bg-black" />
                    Mark as completed
                  </button>
                </div>
                {!isMobile && (
                  <X
                    className="profile-modal-close pointer"
                    width={32}
                    height={32}
                    color="#837F89"
                    onClick={() => setOpenModal(false)}
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
                onClick={() => {
                  setShowMessage(!showMessage);
                  scrollToElement();
                }}
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
      </>
    );
  } else if (role === "Tradie") {
    return (
      data &&
      data.map((res) =>
        item === "complete" ? (
          <div key={res._id}>
            <div
              className="profile-item mb-16 pointer"
              onClick={() => {
                if (item === "bookmark") {
                  navigate(`/job-ad/${res.serviceID}`);
                } else {
                  setJobAdDetails(res);
                  setOpenModal(true);
                }
              }}
            >
              <div className={!isMobile && "mb-24"}>
                <div
                  className={
                    isMobile ? "mb-12" : "flex-between flex-center mb-12"
                  }
                >
                  <h2 className="profile-item-name">{res.jobPostAdTitle}</h2>
                  <div className="profile-item-date-text">
                    {item === "job"
                      ? "Job accepted on"
                      : item === "offer"
                      ? "Inquiry Sent on"
                      : item === "complete"
                      ? "Job completed on"
                      : "Bookmarked on"}{" "}
                    <span className="profile-font-w-500">
                      {res.jobActionDate}
                    </span>
                  </div>
                </div>
                <div className="mb-12 profile-job-details">
                  <div className="flex-center profile-job-detail">
                    <User width={20} height={20} color="#8C8C8C" />
                    {res.tradieName}
                  </div>
                  <div className="flex-center profile-job-detail">
                    <MapPin width={20} height={20} color="#8C8C8C" />
                    {res.tradieLocation}
                  </div>
                  <div className="flex-center profile-job-detail">
                    <Navigation width={20} height={20} color="#8C8C8C" />
                    {res.proximity}
                  </div>
                </div>
                <div className="profile-item-details">
                  {res.jobAdDescription}
                </div>
                {item === "complete" && (
                  <div className="profile-complete-rated">
                    <div>
                      <Star fill="#1F1F23" />
                      <Star fill="#1F1F23" />
                      <Star fill="#1F1F23" />
                      <Star fill="#1F1F23" />
                      <Star fill="#1F1F23" />
                    </div>
                    <span className="profile-rated-text">
                      See rating details
                    </span>
                  </div>
                )}
              </div>
              {isMobile && (
                <EllipsisVertical
                  width={28}
                  height={28}
                  color={showBtns ? "#1F1F23" : "#717171"}
                  className="profile-item-menu pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowBtns(true);
                  }}
                />
              )}
              {isMobile && showBtns && (
                <div className="profile-item-btns-container scroll-lock">
                  <div className="profile-item-btns">
                    {item === "job" ? (
                      <div>
                        <button className="profile-btn-mobile profile-btn-mobile-cancel flex-center pointer">
                          <CircleX width={28} height={28} />
                          Cancel job
                        </button>
                        <button className="profile-btn-mobile flex-center pointer">
                          <Check width={28} height={28} color="#8C8C8C" />
                          Mark as completed
                        </button>
                      </div>
                    ) : item === "offer" ? (
                      <div>
                        <button className="profile-btn-mobile profile-btn-mobile-cancel flex-center pointer">
                          <CircleX width={28} height={28} />
                          Cancel offer
                        </button>
                        <button className="profile-btn-mobile flex-center pointer">
                          <Mail width={28} height={28} color="#8C8C8C" />
                          Chat tradesperson
                        </button>

                        <button className="profile-btn-mobile flex-center pointer">
                          <FileText width={28} height={28} color="#8C8C8C" />
                          See offer details
                        </button>
                      </div>
                    ) : (
                      <button className="profile-btn-mobile flex-center pointer">
                        <Star width={28} height={28} color="#8C8C8C" />
                        Rate the service
                      </button>
                    )}
                    <X
                      className="profile-item-btns-close pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowBtns(false);
                      }}
                    />
                  </div>
                </div>
              )}
              {!isMobile && (
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
                        <Check
                          width={20}
                          height={20}
                          className="icon-bg-black"
                        />
                        Mark as completed
                      </button>
                    ) : item === "offer" ? (
                      <div className="profile-item-offer">
                        <button className="profile-btn-offer flex-center pointer">
                          <FileText width={20} height={20} />
                          See offer details
                        </button>
                        <button className="profile-btn-black profile-btn-chat flex-center">
                          <Mail
                            width={20}
                            height={20}
                            className="icon-bg-black"
                          />
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
              )}
            </div>
            {openModal && (
              <div className="profile-modal scroll-lock">
                {item === "offer" ? (
                  <div className="profile-modal-content profile-modal-job profile-modal-offer">
                    {isMobile ? (
                      <div className="flex-center gap-8 mb-20">
                        <ArrowLeft
                          color="#717171"
                          className="pointer"
                          onClick={() => setOpenModal(false)}
                        />
                        <h1 className="profile-modal-h1">Sent Offer Details</h1>
                      </div>
                    ) : (
                      <h1 className="profile-modal-h1 mb-24">
                        Sent Offer Details
                      </h1>
                    )}
                    <div className="mb-24">
                      <label className="profile-modal-labels mb-12">
                        Job Ad Title
                      </label>
                      <input
                        type="text"
                        value={jobAdDetails.jobPostAdTitle}
                        disabled
                        className="profile-modal-inputs profile-modal-input"
                      />
                    </div>
                    <div className="mb-24">
                      <label className="profile-modal-labels mb-12">
                        Detailed description of the service you need.{" "}
                        <span className="profile-modal-required">
                          (required)
                        </span>
                      </label>
                      <textarea
                        value={jobAdDetails.descriptionServiceNeeded}
                        disabled
                        className="profile-modal-inputs profile-modal-input-textarea"
                      />
                    </div>
                    <div className="mb-24">
                      <label className="profile-modal-labels mb-12">
                        Your Postcode{" "}
                        <span className="profile-modal-required">
                          (required)
                        </span>
                      </label>
                      <input
                        type="text"
                        value={jobAdDetails.clientPostalCode}
                        disabled
                        className="profile-modal-inputs profile-modal-input"
                      />
                    </div>
                    {isMobile && (
                      <div className="mb-24">
                        <label className="profile-modal-labels mb-12">
                          Contact Number{" "}
                          <span className="profile-modal-required">
                            (required)
                          </span>
                        </label>
                        <input
                          type="text"
                          value={jobAdDetails.clientContactNumber}
                          disabled
                          className="profile-modal-inputs profile-modal-input"
                        />
                      </div>
                    )}
                    <div className={isMobile ? "mb-24" : "mb-24 flex-between"}>
                      <div className={isMobile ? "mb-24" : "half-inputs"}>
                        <label className="profile-modal-labels mb-12">
                          Target Start Date{" "}
                          <span className="profile-modal-required">
                            (required)
                          </span>
                        </label>
                        <input
                          type="date"
                          value={jobAdDetails.startDate}
                          disabled
                          className={
                            isMobile
                              ? "profile-modal-inputs profile-modal-input"
                              : "profile-modal-inputs profile-modal-half-input"
                          }
                        />
                      </div>
                      <div className={!isMobile && "half-inputs"}>
                        <label className="profile-modal-labels mb-12">
                          Desired Finish Date
                        </label>
                        <input
                          type="date"
                          value={jobAdDetails.completionDate}
                          disabled
                          className={
                            isMobile
                              ? "profile-modal-inputs profile-modal-input"
                              : "profile-modal-inputs profile-modal-half-input"
                          }
                        />
                      </div>
                    </div>
                    <div className={isMobile ? "mb-44" : "mb-24 flex-between"}>
                      <div className={!isMobile && "half-inputs"}>
                        <label className="profile-modal-labels mb-12">
                          Your Budget
                        </label>
                        <div
                          className={
                            isMobile ? "flex-center gap-8" : "flex-between"
                          }
                        >
                          <input
                            type="text"
                            placeholder="000"
                            value={jobAdDetails.clientBudget}
                            disabled
                            className="profile-modal-inputs profile-modal-budget"
                          />
                          <select
                            disabled
                            className="profile-modal-inputs profile-modal-select"
                            defaultValue={jobAdDetails.budgetCurrency}
                          >
                            <option>AUD</option>
                          </select>
                        </div>
                      </div>
                      {!isMobile && (
                        <div className="half-inputs">
                          <label className="profile-modal-labels mb-12">
                            Contact Number
                          </label>
                          <input
                            type="text"
                            value="+61 345678901"
                            disabled
                            className="profile-modal-inputs profile-modal-half-input"
                          />
                        </div>
                      )}
                    </div>
                    <button className="profile-btn-cancel flex-center">
                      <CircleX />
                      Cancel job
                    </button>
                    {!isMobile && (
                      <X
                        className="profile-modal-close pointer"
                        width={32}
                        height={32}
                        color="#837F89"
                        onClick={() => setOpenModal(false)}
                      />
                    )}
                  </div>
                ) : (
                  <div className="profile-modal-content profile-modal-job">
                    {isMobile && (
                      <div className="flex-center gap-8 mb-20">
                        <ArrowLeft
                          color="#717171"
                          className="pointer"
                          onClick={() => setOpenModal(false)}
                        />
                        <h1 className="profile-modal-h1">Job Ad Details</h1>
                      </div>
                    )}
                    <h1
                      className={
                        isMobile
                          ? "profile-modal-h1 mb-6"
                          : "profile-modal-h1 mb-16"
                      }
                    >
                      {jobAdDetails.jobPostAdTitle}
                    </h1>
                    {isMobile &&
                      (item === "job" ? (
                        <div className="profile-item-date-text mb-8">
                          Job accepted on{" "}
                          <span className="profile-font-w-500">
                            {jobAdDetails.jobActionDate}
                          </span>
                        </div>
                      ) : (
                        <div className="profile-item-date-text mb-8">
                          Job completed on{" "}
                          <span className="profile-font-w-500">
                            {jobAdDetails.jobActionDate}
                          </span>
                        </div>
                      ))}
                    <div className="profile-modal-details">
                      <div className="profile-modal-detail flex-center">
                        <User width={20} height={20} color="#8C8C8C" />
                        {jobAdDetails.tradieName}
                      </div>
                      <div className="profile-modal-detail flex-center">
                        <MapPin width={20} height={20} color="#8C8C8C" />
                        {jobAdDetails.tradieLocation}
                      </div>
                      <div className="profile-modal-detail flex-center">
                        <Navigation width={20} height={20} color="#8C8C8C" />
                        {jobAdDetails.proximity}
                      </div>
                    </div>

                    <div className="profile-modal-description">
                      {jobAdDetails.jobAdDescription}
                    </div>

                    <div className="flex-between">
                      <button className="profile-btn-cancel flex-center">
                        <CircleX />
                        Cancel job
                      </button>
                      <button className="profile-btn-black flex-center">
                        <Check
                          width={20}
                          height={20}
                          className="icon-bg-black"
                        />
                        Mark as completed
                      </button>
                    </div>
                    {!isMobile && (
                      <X
                        className="profile-modal-close pointer"
                        width={32}
                        height={32}
                        color="#837F89"
                        onClick={() => setOpenModal(false)}
                      />
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <Link
            to={`/tradie/profile/${id}/${item}/${res._id}`}
            className="link-none"
            key={res._id}
          >
            <div className="profile-item mb-16">
              <div>
                <h2 className="profile-item-name mb-12">{res.jobAdTitle}</h2>
                <div className="mb-12 profile-job-details">
                  <div className="profile-item-service">{res.jobCategory}</div>
                  <div className="flex-center profile-job-detail">
                    <MapPin width={20} height={20} color="#8C8C8C" />
                    {profile &&
                      profile.businessAddress + " " + profile.businessPostCode}
                  </div>
                  <div className="flex-center profile-job-detail">
                    <Navigation width={20} height={20} color="#8C8C8C" />
                    {profile && profile.proximityToWork}
                  </div>
                </div>
                <div className="profile-item-details">
                  {res.descriptionOfService}
                </div>
              </div>
            </div>
          </Link>
        )
      )
    );
  }
};

export default ProfileContentItem;
