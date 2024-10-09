import React from "react";
import "../styles/PostJobAd.css";
import { useParams } from "react-router-dom";

const JobAdForm = () => {
  const { status } = useParams();
  return (
    <form className="job-form">
      <div className="mb-40">
        {status === "publish" ? (
          <div className="flex-between flex-center mb-20">
            <h1 className="job-form-h1">Post a Job Ad</h1>
            <div className="job-form-status job-form-publish">Published</div>
          </div>
        ) : status === "unpublish" ? (
          <div className="flex-between flex-center mb-20">
            <h1 className="job-form-h1">Post a Job Ad</h1>
            <div className="job-form-status job-form-unpublish">
              Unpublished
            </div>
          </div>
        ) : (
          <h1 className="job-form-h1 mb-20">Post a Job Ad</h1>
        )}
        <div className="flex-between mb-24">
          <div className="half-inputs">
            <label className="block mb-12">Business Postcode</label>
            <input className="job-form-input job-form-half-input" type="text" />
          </div>
          <div className="half-inputs">
            <label className="block mb-12 mb-12">Job Category</label>
            <select className="job-form-input job-form-select">
              <option>Select</option>
            </select>
          </div>
        </div>
        <div className="mb-24">
          <label className="block mb-12">Job Ad Title</label>
          <input type="text" className="job-form-input" />
        </div>
        <div className="mb-24">
          <label className="block mb-12">Description of your service</label>
          <textarea className="job-form-input job-form-textarea" />
        </div>
        <div className="flex-between mb-24">
          <div className="half-inputs">
            <label className="block mb-12">
              Pricing option{" "}
              <span className="job-form-optional">(optional)</span>
            </label>
            <select className="job-form-input job-form-select">
              <option>Select</option>
            </select>
          </div>
          <div className="half-inputs">
            <label className="block mb-12">
              Your Pricing Starts at{" "}
              <span className="job-form-optional">(optional)</span>
            </label>
            <div className="job-form-price">
              <input
                type="text"
                className="job-form-input job-form-price-text"
                placeholder="00"
              />
              <select className="job-form-input job-form-price-select">
                <option>AUD</option>
              </select>
            </div>
          </div>
        </div>
        <div className="mb-24">
          <label>Thumbnail Image</label>
          <input type="file" />
        </div>
        <div>
          <label>
            Project Gallery{" "}
            <span className="job-form-optional">(optional)</span>
          </label>
          <input type="file" />
        </div>
      </div>
      {status === "publish" ? (
        <div className="flex-end">
          <button className="job-form-btn job-form-btn-red">Unpublished</button>
        </div>
      ) : status === "unpublish" ? (
        <div className="job-form-btns flex-end">
          <button className="job-form-btn">Save</button>
          <button className="job-form-btn job-form-btn-black">Publish</button>
        </div>
      ) : (
        <div className="job-form-btns flex-end">
          <button className="job-form-btn">Save as unpublished</button>
          <button className="job-form-btn job-form-btn-black">Publish</button>
        </div>
      )}
    </form>
  );
};

export default JobAdForm;
