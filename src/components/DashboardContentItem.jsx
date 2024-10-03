import { Check, CircleX, MapPin, Phone, X } from "lucide-react";
import React, { useState } from "react";
import "../styles/DashboardTradie.css";

const DashboardContentItem = ({ item }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div
        className="dashboard-item mb-16 pointer"
        onClick={() => setShowModal(true)}
      >
        <div className="mb-16">
          <div className="flex-between mb-12">
            <div>
              Job Ad:{" "}
              <span className="dashboard-item-job">
                All-Around Painting Services
              </span>
            </div>
            <div>
              {item === "job" ? "Target completed on" : "Target start date"}{" "}
              <span className="dashboard-item-date">22 Aug 2024</span>
            </div>
          </div>
          <div className="dashboard-item-details mb-12">
            <div className="dashboard-item-detail">
              <span>Client:</span>
              <span className="dashboard-item-name">Isabella Mitchell</span>
            </div>
            <div className="dashboard-item-detail">
              <MapPin width={20} height={20} color="#8C8C8C" />
              <span>Sydney, NSW 2000</span>
            </div>
            <div className="dashboard-item-detail">
              <Phone width={20} height={20} color="#8C8C8C" />
              <span>+61 234 567 890</span>
            </div>
          </div>
          <div className="dashboard-item-text">
            We're looking for a skilled painter to refresh our kindergarten
            hall. The project involves painting the walls, ceiling, and trim in
            bright, child-friendly colors. The space is approximately 1,200
            square feet, and we'd like the job to be completed over a weekend to
            minimize disruption. I could send you the co...
          </div>
        </div>
        {item === "job" ? (
          <div className="flex-between">
            <button className="dashboard-item-btn dashboard-item-cancel flex-center">
              <CircleX color="#820014" />
              Cancel job
            </button>
            <button className="dashboard-item-btn dashboard-item-complete flex-center">
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
            <button className="dashboard-item-btn dashboard-item-complete dashboard-item-accept flex-center">
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
                      All-Around Painting Services
                    </span>
                  </div>
                  <div>
                    {item === "job"
                      ? "Target completed on"
                      : "Target start date"}{" "}
                    <span className="dashboard-item-date">22 Aug 2024</span>
                  </div>
                </div>
                <div className="dashboard-item-details mb-24">
                  <div className="dashboard-item-detail">
                    Client:{" "}
                    <span className="dashboard-item-name">
                      Isabella Mitchell
                    </span>
                  </div>
                  <div className="dashboard-item-detail">
                    <MapPin width={20} height={20} color="#8C8C8C" />
                    <span>Sydney, NSW 2000</span>
                  </div>
                  <div className="dashboard-item-detail">
                    <Phone width={20} height={20} color="#8C8C8C" />
                    <span>+61 234 567 890</span>
                  </div>
                </div>
                <div className="dashboard-modal-text">
                  I'm very interested in the Garden Lighting Installation Offer
                  you've provided. I have a medium-sized garden that I take
                  great pride in, and I believe that the right lighting can
                  truly enhance its beauty and functionality. I would love to
                  discuss potential designs and options for illuminating
                  pathways, highlighting specific plants and features, and
                  creating a warm, inviting atmosphere that's perfect for
                  evening gatherings. Additionally, I'm curious about different
                  lighting techniques and fixtures that could be used to achieve
                  a variety of effects, from subtle and elegant to bold and
                  dramatic. I'm eager to explore how your services can help
                  transform my garden into a stunning nighttime retreat.
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
                  <button className="dashboard-item-btn dashboard-item-complete flex-center">
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
                  <button className="dashboard-item-btn dashboard-item-complete dashboard-item-accept flex-center">
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
};

export default DashboardContentItem;
