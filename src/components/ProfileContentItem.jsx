import React, { useEffect, useRef, useState } from "react";
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
import { TailSpin } from "react-loading-icons";
import {
  addNotification,
  clientAddMessage,
  getMessagesById,
  getUserDetails,
} from "../action/userActions";
import dateFormat, { masks } from "dateformat";

const ProfileContentItem = ({ item, role, data, profile }) => {
  const isMobile = useMediaQuery({ query: "(max-width:768px)" });

  const [userInfo] = useState(JSON.parse(localStorage.getItem("userInfo")));
  const [itemData, setItemData] = useState();
  const [loading, setLoading] = useState(false);
  const [showBtns, setShowBtns] = useState(false);
  const [showInbox, setShowInbox] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [jobAdDetails, setJobAdDetails] = useState();
  const [tradieDetails, setTradieDetails] = useState();
  const [starRating, setStarRating] = useState(0);
  const [ratingDesc, setRatingDesc] = useState();
  const [messages, setMessages] = useState([]);
  const [addMessage, setAddMessage] = useState("");

  const navigate = useNavigate();

  const divRef = useRef();

  const scrollToBottom = () => {
    const { current } = divRef;
    console.log(current);
    if (current !== null) {
      current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const { id } = useParams();

  let status;

  const updateJobStatusHandler = async (e, status, job) => {
    e.stopPropagation();
    setLoading(true);

    const timeStamp = new Date().toISOString();

    await updateJobStatusClient(
      job.tradieID,
      job._id,
      status,
      timeStamp,
      userInfo.token
    ).then(async (res) => {
      if (res && res.status === 401) {
        alert("Your session expired, please login again.");
        localStorage.removeItem("userInfo");
        navigate("/login");
        return;
      } else if (res && res.status !== 200) {
        alert(res.message);
        window.location.reload();
        return;
      }
      if (status === "Cancelled") {
        const content = `${userInfo.name} cancelled the job service ${job.jobPostAdTitle}.`;
        await addNotification(
          job.tradieID,
          content,
          userInfo.profilePicture,
          timeStamp
        ).then((res) => {
          if (res && res.status !== 200) {
            alert(res.message);
            window.location.reload();
            return;
          }
          window.location.reload();
          setLoading(false);
        });
      }
      window.location.reload();
      setLoading(false);
    });
  };

  const addRatingHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

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
      if (res && res.status === 401) {
        alert("Your session expired, please login again.");
        localStorage.removeItem("userInfo");
        navigate("/login");
        return;
      } else if (res && res.status !== 200) {
        alert(res.message);
        window.location.reload();
        return;
      }
      window.location.reload();
      console.log(res);
    });
  };

  useEffect(() => {
    if (data) {
      setItemData(data);
      console.log(data);
    }
  }, [data]);

  const getMessagesByIdHandler = async (job) => {
    setLoading(true);
    setShowInbox(true);

    if (job) {
      await getUserDetails(job.tradieID).then(async (tradie) => {
        setTradieDetails(tradie);

        await getMessagesById(userInfo.userId, tradie._id).then((res) => {
          if (res && res.status !== 200) {
            alert(res.message);
            window.location.reload();
            return;
          }
          console.log(res);

          const sortMessages = [];
          res.clientMessages.forEach((message) => {
            sortMessages.push(message);
          });
          res.tradieMessages.forEach((message) => {
            sortMessages.push(message);
          });
          sortMessages.sort((a, b) => {
            return a.timeStamp > b.timeStamp ? 1 : -1;
          });
          console.log(sortMessages);
          setMessages(sortMessages);
          setLoading(false);

          const timeout = setTimeout(() => {
            scrollToBottom();
          }, 1);

          return () => clearTimeout(timeout);
        });
      });
    } else {
      await getMessagesById(userInfo.userId, tradieDetails._id).then((res) => {
        if (res && res.status !== 200) {
          alert(res.message);
          window.location.reload();
          return;
        }
        console.log(res);

        const sortMessages = [];
        res.clientMessages.forEach((message) => {
          sortMessages.push(message);
        });
        res.tradieMessages.forEach((message) => {
          sortMessages.push(message);
        });
        sortMessages.sort((a, b) => {
          return a.timeStamp > b.timeStamp ? 1 : -1;
        });
        console.log(sortMessages);
        setMessages(sortMessages);
        setLoading(false);

        const timeout = setTimeout(() => {
          scrollToBottom();
        }, 1);

        return () => clearTimeout(timeout);
      });
    }
  };

  const addMessageHandler = async (e) => {
    e.preventDefault();

    setLoading(true);

    const timeStamp = new Date().toISOString();

    await clientAddMessage(
      userInfo.userId,
      tradieDetails._id,
      addMessage,
      timeStamp
    ).then((res) => {
      if (res && res.status !== 200) {
        alert(res.message);
        window.location.reload();
        return;
      }
      setAddMessage("");
      getMessagesByIdHandler();
    });
  };

  if (loading) {
    return (
      <div className="loading loading-page">
        <TailSpin stroke="#1f1f23" speed={1} />
      </div>
    );
  } else if (role === "Client" && !loading) {
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
                        {dateFormat(res.jobActionDate, "dd mmmm yyyy")}
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
                          <button
                            className="profile-btn-mobile flex-center pointer"
                            onClick={() => getMessagesByIdHandler(res)}
                          >
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
                              getMessagesByIdHandler(res);
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
                              <Star
                                fill={res.rating < 1 ? "#ffffff" : "#1F1F23"}
                              />
                              <Star
                                fill={res.rating < 2 ? "#ffffff" : "#1F1F23"}
                              />
                              <Star
                                fill={res.rating < 3 ? "#ffffff" : "#1F1F23"}
                              />
                              <Star
                                fill={res.rating < 4 ? "#ffffff" : "#1F1F23"}
                              />
                              <Star
                                fill={res.rating < 5 ? "#ffffff" : "#1F1F23"}
                              />
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
                              setJobAdDetails(res);
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
                    updateJobStatusHandler(
                      e,
                      (status = "Cancelled"),
                      jobAdDetails
                    )
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

                  <div className="flex-center mb-12">
                    <Star
                      fill={jobAdDetails.rating < 1 ? "#ffffff" : "#1F1F23"}
                    />
                    <Star
                      fill={jobAdDetails.rating < 2 ? "#ffffff" : "#1F1F23"}
                    />
                    <Star
                      fill={jobAdDetails.rating < 3 ? "#ffffff" : "#1F1F23"}
                    />
                    <Star
                      fill={jobAdDetails.rating < 4 ? "#ffffff" : "#1F1F23"}
                    />
                    <Star
                      fill={jobAdDetails.rating < 5 ? "#ffffff" : "#1F1F23"}
                    />
                  </div>
                  <div>{jobAdDetails.ratingDesc}</div>
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
            {loading ? (
              <div
                className={
                  isMobile
                    ? "loading loading-page"
                    : "inbox-message-container loading-page"
                }
              >
                <TailSpin stroke="#1f1f23" speed={1} />
              </div>
            ) : (
              <div
                className={
                  isMobile
                    ? "inbox-message-mobile gray-bg"
                    : "inbox-message-container gray-bg"
                }
              >
                <div className="inbox-message-mobile-container gray-bg">
                  {isMobile ? (
                    <div className="flex-center gap-12 gray-bg">
                      <ArrowLeft
                        color="#717171"
                        className="pointer gray-bg"
                        onClick={() => {
                          setShowInbox(false);
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
                              {tradieDetails.firstName} {tradieDetails.lastName}
                            </div>
                            <div className="inbox-profile-loc flex-center gap-8 gray-bg">
                              <MapPin
                                width={12.8}
                                height={16}
                                color="#8C8C8C"
                                className="gray-bg"
                              />
                              {tradieDetails.businessPostCode}
                            </div>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mb-16 gray-bg">
                      <div className="flex-center gap-8 gray-bg">
                        <img
                          src={
                            tradieDetails.profilePicture
                              ? tradieDetails.profilePicture
                              : DefaultProfilePicture
                          }
                          width={45}
                          height={45}
                          className="inbox-profile-img gray-bg"
                        />
                        <div className="gray-bg">
                          <div className="inbox-profile-name gray-bg">
                            {tradieDetails.firstName} {tradieDetails.lastName}
                          </div>
                          <div className="inbox-profile-loc flex-center gap-8 gray-bg">
                            <MapPin
                              width={12.8}
                              height={16}
                              color="#8C8C8C"
                              className="gray-bg"
                            />
                            {tradieDetails.businessPostCode}
                          </div>{" "}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="inbox-messages gray-bg">
                    {messages &&
                      messages.map((message) => (
                        <div
                          className={
                            message.sentByClient
                              ? "inbox-message-user mb-16 gray-bg"
                              : "mb-16 gray-bg"
                          }
                          key={message._id}
                        >
                          <div className="inbox-message-date mb-4 gray-bg">
                            {dateFormat(message.timeStamp, "mmmm dd, yyyy")} |{" "}
                            {dateFormat(message.timeStamp, "h:MM TT")}
                          </div>
                          <span className="inbox-message">
                            {message.message}
                          </span>
                        </div>
                      ))}
                    <div ref={divRef} />
                  </div>
                  <form
                    onSubmit={addMessageHandler}
                    className="inbox-message-input-container gray-bg"
                  >
                    <input
                      type="text"
                      className="inbox-message-input"
                      placeholder="Type something..."
                      value={addMessage}
                      onChange={(e) => setAddMessage(e.target.value)}
                    />
                    <SendHorizonal
                      width={35.56}
                      height={40}
                      color="#1F1F23"
                      className="inbox-message-send pointer"
                    />
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </>
    );
  } else if (role === "Tradie" && !loading) {
    return (
      data &&
      data.map((res) =>
        item === "complete" ? (
          <div key={res._id}>
            <div className="profile-item mb-16">
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
                      {dateFormat(res.jobActionDate, "dd mmmm yyyy")}
                    </span>
                  </div>
                </div>
                <div className="mb-12 profile-job-details">
                  <div className="flex-center profile-job-detail">
                    <User width={20} height={20} color="#8C8C8C" />
                    {res.clientName}
                  </div>
                  <div className="flex-center profile-job-detail">
                    <MapPin width={20} height={20} color="#8C8C8C" />
                    {res.clientCity} {res.clientState}, {res.clientPostalCode}
                  </div>
                  {res.rating !== 0 && res.ratingDesc !== null ? (
                    <div className="flex-center">
                      <Star fill={res.rating < 1 ? "#ffffff" : "#1F1F23"} />
                      <Star fill={res.rating < 2 ? "#ffffff" : "#1F1F23"} />
                      <Star fill={res.rating < 3 ? "#ffffff" : "#1F1F23"} />
                      <Star fill={res.rating < 4 ? "#ffffff" : "#1F1F23"} />
                      <Star fill={res.rating < 5 ? "#ffffff" : "#1F1F23"} />
                    </div>
                  ) : (
                    <div className="profile-job-detail">Not Reviewed</div>
                  )}
                </div>
                {res.ratingDesc !== null ? (
                  <div className="profile-item-details">{res.ratingDesc}</div>
                ) : (
                  <div className="profile-item-details">
                    {res.jobAdDescription}
                  </div>
                )}
              </div>
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
