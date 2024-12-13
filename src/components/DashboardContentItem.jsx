import {
  ArrowLeft,
  Check,
  CircleX,
  EllipsisVertical,
  MapPin,
  Phone,
  User,
  X,
} from "lucide-react";
import React, { useState } from "react";
import "../styles/DashboardTradie.css";
import { updateJobStatusTradie } from "../action/tradieActions";
import { useMediaQuery } from "react-responsive";
import dateFormat, { masks } from "dateformat";
import { TailSpin } from "react-loading-icons";
import { addNotification, tradieAddMessage } from "../action/userActions";

const DashboardContentItem = ({ item, data, userInfo }) => {
  const isMobile = useMediaQuery({ query: "(max-width:768px)" });

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showBtns, setShowBtns] = useState(false);
  const [jobModal, setJobModal] = useState();
  const [token] = useState(userInfo && userInfo.token);
  const [tradieID] = useState(userInfo && userInfo.userId);

  let status, jobID;

  const updateJobStatusHandler = async (job, status, e) => {
    e.stopPropagation();
    setLoading(true);
    const timeStamp = new Date().toISOString();

    await updateJobStatusTradie(
      tradieID,
      job._id,
      status,
      timeStamp,
      token
    ).then(async (res) => {
      if (res && res.status === 401) {
        alert("Your session expired, please login again.");
        localStorage.removeItem("userInfo");
        navigate("/login");
        return;
      }
      let content = "";
      if (status === "Cancelled" && job.status === "Pending") {
        content = `${userInfo.name} declined your offer for job service ${job.jobPostAdTitle}.`;
      } else if (status === "Cancelled" && job.status !== "Pending") {
        content = `${userInfo.name} cancelled the job service ${job.jobPostAdTitle}.`;
      } else if (status === "In Progress") {
        content = `${userInfo.name} accepted your offer for job service ${job.jobPostAdTitle}.`;
      } else if (status === "Completed") {
        content = `${userInfo.name} completed the job service ${job.jobPostAdTitle}. Please rate our service, your feedback helps us improve.`;
      }
      await addNotification(
        job.clientID,
        content,
        userInfo.profilePicture,
        timeStamp
      ).then(async (res) => {
        let message = "";
        if (status === "Cancelled" && job.status === "Pending") {
          message = `I declined your offer for job service ${job.jobPostAdTitle}.`;
        } else if (status === "Cancelled" && job.status !== "Pending") {
          message = `I cancelled the job service ${job.jobPostAdTitle}.`;
        } else if (status === "In Progress") {
          message = `I accepted your offer for job service ${job.jobPostAdTitle}.`;
        } else if (status === "Completed") {
          message = `I completed the job service ${job.jobPostAdTitle}.`;
        }
        await tradieAddMessage(
          job.clientID,
          userInfo.userId,
          message,
          timeStamp
        ).then(() => {
          window.location.reload();
        });
      });
    });
  };

  if (data) {
    console.log(data);
    return loading ? (
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
      <>
        {data.map((job) => (
          <div
            key={job._id}
            className="dashboard-item mb-16 pointer"
            onClick={() => {
              setShowModal(true);
              setJobModal(job);
            }}
          >
            <div className={!isMobile && "mb-16"}>
              <div className={isMobile ? "mb-12" : "flex-between mb-12"}>
                <div>
                  {!isMobile && "Job Ad: "}
                  <span
                    className={
                      isMobile
                        ? "dashboard-item-job block"
                        : "dashboard-item-job"
                    }
                  >
                    {job.jobPostAdTitle}
                  </span>
                </div>
                <div>
                  {item === "job" ? "Target completed on" : "Target start date"}{" "}
                  <span className="dashboard-item-date">
                    {dateFormat(job.startDate, "mmmm d, yyyy")}
                  </span>
                </div>
              </div>
              <div className="dashboard-item-details mb-12">
                <div className="dashboard-item-detail">
                  {isMobile ? (
                    <User width={20} height={20} color="#8C8C8C" />
                  ) : (
                    <span>Client:</span>
                  )}
                  <span className={!isMobile && "dashboard-item-name"}>
                    {job.clientName}
                  </span>
                </div>
                <div className="dashboard-item-detail">
                  <MapPin width={20} height={20} color="#8C8C8C" />
                  <span>{job.clientPostalCode}</span>
                </div>
                <div className="dashboard-item-detail">
                  <Phone width={20} height={20} color="#8C8C8C" />
                  <span>{job.clientContactNumber}</span>
                </div>
              </div>
              <div className="dashboard-item-text">
                {job.descriptionServiceNeeded}
              </div>
            </div>
            {isMobile ? (
              <EllipsisVertical
                width={28}
                height={28}
                color={showBtns ? "#1F1F23" : "#717171"}
                className="dashboard-item-menu-icon pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setJobModal(job);
                  setShowBtns(true);
                }}
              />
            ) : item === "job" ? (
              <div className="flex-between">
                <button
                  className="dashboard-item-btn dashboard-item-cancel flex-center pointer"
                  onClick={(e) =>
                    updateJobStatusHandler(job, (status = "Cancelled"), e)
                  }
                >
                  <CircleX color="#820014" />
                  Cancel job
                </button>
                <button
                  className="dashboard-item-btn dashboard-item-complete flex-center pointer"
                  onClick={(e) =>
                    updateJobStatusHandler(job, (status = "Completed"), e)
                  }
                >
                  <Check
                    width={20}
                    height={20}
                    color="#FFFFFF"
                    className="icon-bg-black"
                  />
                  Mark as completed
                </button>
              </div>
            ) : (
              <div className="flex-end gap-16">
                <button
                  className="dashboard-item-btn dashboard-item-decline flex-center pointer"
                  onClick={(e) =>
                    updateJobStatusHandler(job, (status = "Cancelled"), e)
                  }
                >
                  <CircleX width={20} height={20} color="#820014" />
                  Decline
                </button>
                <button
                  className="dashboard-item-btn dashboard-item-complete dashboard-item-accept flex-center pointer"
                  onClick={(e) =>
                    updateJobStatusHandler(job, (status = "In Progress"), e)
                  }
                >
                  <Check
                    width={20}
                    height={20}
                    color="#FFFFFF"
                    className="icon-bg-black"
                  />
                  Accept offer
                </button>
              </div>
            )}
          </div>
        ))}
        {isMobile && showBtns && (
          <div className="dashboard-item-btns-container scroll-lock">
            <div className="dashboard-item-btns">
              {item === "job" ? (
                <div>
                  <button
                    className="dashboard-btn-mobile dashboard-btn-mobile-cancel flex-center pointer"
                    onClick={(e) =>
                      updateJobStatusHandler(
                        jobModal,
                        (status = "Cancelled"),
                        e
                      )
                    }
                  >
                    <CircleX width={28} height={28} />
                    Cancel job
                  </button>
                  <button
                    className="dashboard-btn-mobile flex-center pointer"
                    onClick={(e) =>
                      updateJobStatusHandler(
                        jobModal,
                        (status = "Completed"),
                        e
                      )
                    }
                  >
                    <Check width={28} height={28} color="#8C8C8C" />
                    Mark as completed
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    className="dashboard-btn-mobile dashboard-btn-mobile-cancel flex-center pointer"
                    onClick={(e) =>
                      updateJobStatusHandler(
                        jobModal,
                        (status = "Cancelled"),
                        e
                      )
                    }
                  >
                    <CircleX width={28} height={28} />
                    Decline
                  </button>
                  <button
                    className="dashboard-btn-mobile flex-center pointer"
                    onClick={(e) =>
                      updateJobStatusHandler(
                        jobModal,
                        (status = "In Progress"),
                        e
                      )
                    }
                  >
                    <Check width={28} height={28} color="#8C8C8C" />
                    Accept offer
                  </button>
                </div>
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
        {showModal && (
          <div className="dashboard-modal scroll-lock">
            <div className="dashboard-modal-contents">
              <div className="mb-24">
                {isMobile ? (
                  <div className="flex-center gap-8 mb-20">
                    <ArrowLeft
                      color="#717171"
                      className="pointer"
                      onClick={() => setShowModal(false)}
                    />
                    <h1 className="dashboard-content-h1-mobile">Job Details</h1>
                  </div>
                ) : (
                  <h1 className="dashboard-content-h1 mb-32">Job Ad Details</h1>
                )}
                <div>
                  <div className={isMobile ? "mb-16" : "flex-between mb-24"}>
                    <div className={isMobile && "mb-12"}>
                      Job Ad:{" "}
                      <span className="dashboard-item-job-mobile">
                        {jobModal.jobPostAdTitle}
                      </span>
                    </div>
                    <div>
                      {item === "job"
                        ? "Target completed on"
                        : "Target start date"}{" "}
                      <span className="dashboard-item-date">
                        {item === "job"
                          ? dateFormat(jobModal.completionDate, "mmmm d, yyyy")
                          : dateFormat(jobModal.startDate, "mmmm d, yyyy")}
                      </span>
                    </div>
                  </div>
                  <div
                    className={
                      isMobile
                        ? "dashboard-item-details mb-16"
                        : "dashboard-item-details mb-24"
                    }
                  >
                    <div className="dashboard-item-detail">
                      Client:{" "}
                      <span className="dashboard-item-name">
                        {jobModal.clientName}
                      </span>
                    </div>
                    <div className="dashboard-item-detail">
                      <MapPin width={20} height={20} color="#8C8C8C" />
                      <span>{jobModal.clientPostalCode}</span>
                    </div>
                    <div className="dashboard-item-detail">
                      <Phone width={20} height={20} color="#8C8C8C" />
                      <span>{jobModal.clientContactNumber}</span>
                    </div>
                  </div>
                  <div className="dashboard-modal-text">
                    {jobModal.descriptionServiceNeeded}
                  </div>
                </div>
              </div>
              <div>
                {item === "job" ? (
                  <div
                    className={
                      isMobile ? "dashboard-modal-btns" : "flex-end gap-16"
                    }
                  >
                    <button
                      className="dashboard-item-btn dashboard-item-cancel flex-center"
                      onClick={(e) =>
                        updateJobStatusHandler(
                          jobModal,
                          (status = "Cancelled"),
                          e
                        )
                      }
                    >
                      <CircleX color="#820014" />
                      Cancel job
                    </button>
                    <button
                      className="dashboard-item-btn dashboard-item-complete flex-center pointer"
                      onClick={(e) =>
                        updateJobStatusHandler(
                          jobModal,
                          (status = "Completed"),
                          e
                        )
                      }
                    >
                      <Check
                        width={20}
                        height={20}
                        color="#FFFFFF"
                        className="icon-bg-black"
                      />
                      Mark as completed
                    </button>
                  </div>
                ) : (
                  <div
                    className={
                      isMobile ? "dashboard-modal-btns" : "flex-end gap-16"
                    }
                  >
                    <button
                      className="dashboard-item-btn dashboard-item-decline flex-center pointer"
                      onClick={(e) =>
                        updateJobStatusHandler(
                          jobModal,
                          (status = "Cancelled"),
                          e
                        )
                      }
                    >
                      <CircleX width={20} height={20} color="#820014" />
                      Decline
                    </button>
                    <button
                      className="dashboard-item-btn dashboard-item-complete dashboard-item-accept flex-center pointer"
                      onClick={(e) =>
                        updateJobStatusHandler(
                          jobModal,
                          (status = "In Progress"),
                          e
                        )
                      }
                    >
                      <Check
                        width={20}
                        height={20}
                        color="#FFFFFF"
                        className="icon-bg-black"
                      />
                      Accept offer
                    </button>
                  </div>
                )}
              </div>
              {!isMobile && (
                <X
                  width={32}
                  height={32}
                  color="#837F89"
                  className="dashboard-modal-close pointer"
                  onClick={() => setShowModal(false)}
                />
              )}
            </div>
          </div>
        )}
      </>
    );
  }
};

export default DashboardContentItem;
