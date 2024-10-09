import React, { useState } from "react";
import "../styles/SignUpInfo.css";
import { Check, Upload, XCircle } from "lucide-react";

const TradespersonInfoForm = ({ page }) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="signup-info-box">
      {page === "signup" ? (
        <div>
          <h1 className="signup-info-h1 mb-12">Tradesperson Information</h1>
          <div className="signup-info-text mb-32">
            We will review your application before you can post a job ad. We
            will contact you if we need further clarification.
          </div>
        </div>
      ) : (
        <div className="flex-between flex-center mb-32">
          <h1 className="signup-info-h1">Application Details</h1>
          <span className="signup-info-status">Pending approval</span>
        </div>
      )}
      <div className="signup-info-form">
        {page === "signup" && (
          <div className="signup-info-maxw">
            <img />
            <label className="signup-info-upload" htmlFor="imageUpload">
              <Upload className="signup-info-icon" />
              Upload
            </label>
            <input type="file" className="signup-info-rmfile" />
          </div>
        )}
        <div className="signup-info-halfw">
          <label className="signup-info-label">Business Postcode</label>
          <input type="text" className="signup-info-input" placeholder="0000" />
        </div>
        <div className="signup-info-halfw">
          <label className="signup-info-label">Main type of work you do?</label>
          <select className="signup-info-input singup-info-select">
            <option>Select</option>
          </select>
          {page === "signup" && (
            <div className="signup-info-choose">
              Choose one for now. You can add more later.
            </div>
          )}
        </div>
        <div className="signup-info-halfw">
          <label className="signup-info-label">First Name</label>
          <input type="text" className="signup-info-input" />
        </div>
        <div className="signup-info-halfw">
          <label className="signup-info-label">Last Name</label>
          <input type="text" className="signup-info-input" />
        </div>
        <div className="signup-info-halfw">
          <label className="signup-info-label">Email Address</label>
          <input
            type="email"
            className="signup-info-input"
            placeholder="@email.com"
          />
        </div>
        <div className="signup-info-halfw">
          <label className="signup-info-label">Contact Number</label>
          <input
            type="text"
            className="signup-info-input"
            placeholder="+61 000 000 000"
          />
        </div>
        <div className="signup-info-halfw">
          <label className="signup-info-label">
            Registered Business Name{" "}
            {page === "signup" && (
              <div className="signup-info-optional">(optional)</div>
            )}
          </label>
          <input type="text" className="signup-info-input" />
        </div>
        <div className="signup-info-halfw">
          <label className="signup-info-label">
            Australian Business Number
          </label>
          <input
            type="text"
            className="signup-info-input"
            placeholder="00000000000"
          />
        </div>
        <div className="signup-info-maxw">
          {page === "signup" ? (
            <label className="signup-info-label">
              Upload Your Credentials (e.g., Qualifications, Licenses){" "}
              <div className="signup-info-optional">(optional)</div>
            </label>
          ) : (
            <label className="signup-info-label">Uploaded Credentials</label>
          )}
          <label className="signup-info-upload" htmlFor="imageUpload">
            <Upload className="signup-info-icon" />
            Upload
          </label>
          <input type="file" className="signup-info-rmfile" id="imageUpload" />
        </div>
        {page === "signup" ? (
          <button className="signup-info-btn">Submit</button>
        ) : (
          <div className="signup-info-btns-box flex-end">
            <button
              className="signup-info-btns singup-info-decline pointer"
              onClick={() => setOpenModal(true)}
            >
              <XCircle width={20} height={20} color="#820014" />
              Decline
            </button>
            <button className="signup-info-btns singup-info-approve pointer">
              <Check
                width={20}
                height={20}
                color="#FFFFFF"
                className="icon-bg-black"
              />
              Approve
            </button>
          </div>
        )}
      </div>
      {openModal && (
        <div className="modal-decline scroll-lock">
          <div className="modal-decline-box">
            <div className="mb-48">
              <h1 className="signup-info-h1 mb-20">Decline Application</h1>
              <div className="signup-info-text mb-20">
                You are about to decline the tradesperson's application. Kindly
                provide a reason so they can prepare the necessary requirements
                for the next attempt.
              </div>
              <div>
                <label className="signup-info-text block mb-12">
                  Reason <span className="modal-required">(required)</span>
                </label>
                <textarea className="modal-textarea" />
              </div>
            </div>

            <div>
              <button
                className="modal-btns pointer"
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </button>
              <button className="modal-btns modal-black-btn">Finish</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TradespersonInfoForm;
