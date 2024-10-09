import React, { useState } from "react";

const JobOffer = () => {
  const [complete, setComplete] = useState(false);

  const submitHandler = () => {
    setComplete(true);
  };
  return (
    <div className="transparent">
      {complete ? (
        <div className="offer-complete">complete</div>
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
                <input type="text" className="offer-input offer-input-half" />
              </div>
            </div>
            <div className="mb-24 flex-between">
              <div className="half-inputs">
                <label className="block mb-12">
                  Target Start Date{" "}
                  <span className="offer-required">(required)</span>
                </label>
                <input type="date" className="offer-input offer-input-half" />
              </div>
              <div className="half-inputs">
                <label className="block mb-12">
                  Target Completion Date{" "}
                  <span className="offer-required">(required)</span>
                </label>
                <input type="date" className="offer-input offer-input-half" />
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
              <button className="offer-btn">Cancel</button>
              <button className="offer-btn offer-btn-blk" type="submit">
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default JobOffer;
