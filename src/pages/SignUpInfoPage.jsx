import React from "react";
import "../styles/SignUpInfo.css";
import { Upload } from "lucide-react";
import Header from "../components/Header";

const SignUpInfoPage = () => {
  return (
    <>
      <Header notHidden={false} />
      <div className="signup-info-box">
        <h1 className="signup-info-h1">Tradesperson Information</h1>
        <div className="signup-info-text">
          We will review your application before you can post a job ad. We will
          contact you if we need further clarification.
        </div>
        <form className="signup-info-form">
          <div className="signup-info-maxw">
            <img />
            <label className="signup-info-upload" htmlFor="imageUpload">
              <Upload className="signup-info-icon" />
              Upload
            </label>
            <input type="file" className="signup-info-rmfile" />
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
            <label className="signup-info-label">Business Postcode</label>
            <input
              type="text"
              className="signup-info-input"
              placeholder="0000"
            />
          </div>
          <div className="signup-info-halfw">
            <label className="signup-info-label">
              Main type of work you do?
            </label>
            <input type="select" className="signup-info-input" />
          </div>
          <div className="signup-info-halfw">
            <label className="signup-info-label">
              Registered Business Name{" "}
              <div className="signup-info-optional">(optional)</div>
            </label>
            <input type="text" className="signup-info-input" />
          </div>
          <div className="signup-info-halfw">
            <label className="signup-info-label">
              Austrilian Business Number
            </label>
            <input
              type="text"
              className="signup-info-input"
              placeholder="00000000000"
            />
          </div>
          <div className="signup-info-maxw">
            <label className="signup-info-label">
              Upload Your Credentials (e.g., Qualifications, Licenses){" "}
              <div className="signup-info-optional">(optional)</div>
            </label>
            <label className="signup-info-upload" htmlFor="imageUpload">
              <Upload className="signup-info-icon" />
              Upload
            </label>
            <input
              type="file"
              className="signup-info-rmfile"
              id="imageUpload"
            />
          </div>
          <button className="signup-info-btn">Submit</button>
        </form>
      </div>
    </>
  );
};

export default SignUpInfoPage;
