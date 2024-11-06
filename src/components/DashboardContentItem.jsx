import { Check, CircleX, MapPin, Phone, X } from "lucide-react";
import React, { useState } from "react";
import "../styles/DashboardTradie.css";
import { updateJobStatus } from "../action/tradieActions";

const DashboardContentItem = ({ item, data, userInfo }) => {
  const [showModal, setShowModal] = useState(false);
  const [jobModal, setJobModal] = useState();
  const [token] = useState(userInfo && userInfo.token);
  const [tradieID] = useState(userInfo && userInfo.userId);

  let status, jobID;

  const updateJobStatusHandler = async (job, status, e) => {
    e.stopPropagation();
    const date = new Date();

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    // This arrangement can be altered based on how we want the date's format to appear.
    const currentDate = `${year}-${month}-${day}`;
    console.log(currentDate);

    await updateJobStatus(tradieID, job._id, status, currentDate, token).then(
      () => {
        window.location.reload();
      }
    );
  };

  if (data) {
    console.log(data);
    return (
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
            <div className="mb-16">
              <div className="flex-between mb-12">
                <div>
                  Job Ad:{" "}
                  <span className="dashboard-item-job">
                    {job.jobPostAdTitle}
                  </span>
                </div>
                <div>
                  {item === "job" ? "Target completed on" : "Target start date"}{" "}
                  <span className="dashboard-item-date">{job.startDate}</span>
                </div>
              </div>
              <div className="dashboard-item-details mb-12">
                <div className="dashboard-item-detail">
                  <span>Client:</span>
                  <span className="dashboard-item-name">{job.clientName}</span>
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
            {item === "job" ? (
              <div className="flex-between">
                <button className="dashboard-item-btn dashboard-item-cancel flex-center">
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
              <div className="flex-end">
                <button className="dashboard-item-btn dashboard-item-decline flex-center">
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
        {showModal && (
          <div className="dashboard-modal scroll-lock">
            <div className="dashboard-modal-contents">
              <div className="mb-24">
                <h1 className="dashboard-content-h1 mb-32">Job Ad Details</h1>
                <div>
                  <div className="flex-between mb-24">
                    <div>
                      Job Ad:{" "}
                      <span className="dashboard-item-job">
                        {jobModal.jobPostAdTitle}
                      </span>
                    </div>
                    <div>
                      {item === "job"
                        ? "Target completed on"
                        : "Target start date"}{" "}
                      <span className="dashboard-item-date">
                        {jobModal.startDate}
                      </span>
                    </div>
                  </div>
                  <div className="dashboard-item-details mb-24">
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
                  <div className="flex-end">
                    <button className="dashboard-item-btn dashboard-item-cancel flex-center">
                      <CircleX color="#820014" />
                      Cancel job
                    </button>
                    <button className="dashboard-item-btn dashboard-item-complete flex-center pointer">
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
                  <div className="flex-end">
                    <button className="dashboard-item-btn dashboard-item-decline flex-center">
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
              <X
                width={32}
                height={32}
                color="#837F89"
                className="dashboard-modal-close pointer"
                onClick={() => setShowModal(false)}
              />
            </div>
          </div>
        )}
      </>
    );
  }
};

export default DashboardContentItem;
