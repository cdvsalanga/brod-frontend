import React, { useState } from "react";
import "../styles/Profile.css";
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
} from "lucide-react";

const ProfileContentItem = ({ item }) => {
  const [openModal, setOpenModal] = useState(false);

  const openModalHandler = () => {
    setOpenModal(true);
    console.log(item);
  };
  return (
    <>
      <div className="profile-item mb-16 pointer" onClick={openModalHandler}>
        <div className="mb-24">
          <div className="flex-between flex-center mb-12">
            <h2 className="profile-item-name">All-Around Painting Services</h2>
            <div className="profile-item-date-text">
              {item === "job"
                ? "Job accepted on"
                : item === "offer"
                ? "Inquiry Sent on"
                : item === "complete"
                ? "Job completed on"
                : "Bookmarked on"}{" "}
              <span className="profile-item-date">22 August 2024</span>
            </div>
          </div>
          <div className="mb-12 profile-job-details">
            <div className="flex-center profile-job-detail">
              <User width={20} height={20} color="#8C8C8C" />
              Yves Vergara
            </div>
            <div className="flex-center profile-job-detail">
              <MapPin width={20} height={20} color="#8C8C8C" />
              Sydney, NSW 2000
            </div>
            <div className="flex-center profile-job-detail">
              <Navigation width={20} height={20} color="#8C8C8C" />
              Can work within 50km
            </div>
          </div>
          <div className="profile-item-details">
            Transform your home with the touch of a dedicated and skilled
            painter. I’m Yves, a professional painter with 7 years of
            experience, offering personalized house painting services tailored
            to your unique needs. Whether you're looking to refresh a single
            room or update the entire exterior, I bring all-aroun...
          </div>
        </div>
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
                <Check width={20} height={20} className="icon-bg-black" />
                Mark as completed
              </button>
            ) : item === "offer" ? (
              <div className="profile-item-offer">
                <button className="profile-btn-offer flex-center">
                  <FileText width={20} height={20} />
                  See offer details
                </button>
                <button className="profile-btn-black profile-btn-chat flex-center">
                  <Mail width={20} height={20} className="icon-bg-black" />
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
      </div>
      <div className="profile-item mb-16">
        <div className="mb-24">
          <div className="flex-between flex-center mb-12">
            <h2 className="profile-item-name">All-Around Painting Services</h2>
            <div className="profile-item-date-text">
              {item === "job"
                ? "Job accepted on"
                : item === "offer"
                ? "Inquiry Sent on"
                : item === "complete"
                ? "Job completed on"
                : "Bookmarked on"}{" "}
              <span className="profile-item-date">22 August 2024</span>
            </div>
          </div>
          <div className="mb-12 profile-job-details">
            <div className="flex-center profile-job-detail">
              <User width={20} height={20} color="#8C8C8C" />
              Yves Vergara
            </div>
            <div className="flex-center profile-job-detail">
              <MapPin width={20} height={20} color="#8C8C8C" />
              Sydney, NSW 2000
            </div>
            <div className="flex-center profile-job-detail">
              <Navigation width={20} height={20} color="#8C8C8C" />
              Can work within 50km
            </div>
          </div>
          <div className="profile-item-details">
            Transform your home with the touch of a dedicated and skilled
            painter. I’m Yves, a professional painter with 7 years of
            experience, offering personalized house painting services tailored
            to your unique needs. Whether you're looking to refresh a single
            room or update the entire exterior, I bring all-aroun...
          </div>
        </div>
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
                <Check width={20} height={20} className="icon-bg-black" />
                Mark as completed
              </button>
            ) : item === "offer" ? (
              <div className="profile-item-offer">
                <button className="profile-btn-offer flex-center">
                  <FileText width={20} height={20} />
                  See offer details
                </button>
                <button className="profile-btn-black profile-btn-chat flex-center">
                  <Mail width={20} height={20} className="icon-bg-black" />
                  Chat
                </button>
              </div>
            ) : item === "complete" ? (
              <div className="profile-complete-rated">
                <div>
                  <Star fill="#1F1F23" />
                  <Star fill="#1F1F23" />
                  <Star fill="#1F1F23" />
                  <Star fill="#1F1F23" />
                  <Star fill="#1F1F23" />
                </div>
                <span className="profile-rated-text">See rating details</span>
              </div>
            ) : (
              <div className="profile-bookmark flex-center">
                <Bookmark fill="#1F1F23" />
                Bookmarked
              </div>
            )}
          </div>
        </div>
      </div>
      {openModal && (
        <div className="profile-modal scroll-lock">
          {item === "offer" ? (
            <div className="profile-modal-content profile-modal-job profile-modal-offer">
              <h1 className="profile-modal-h1 mb-24">Sent Offer Details</h1>
              <div className="mb-24">
                <label className="profile-modal-labels mb-12">
                  Job Ad Title
                </label>
                <input
                  type="text"
                  value="All-Around Painting Services"
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
                  value="I'm interested in learning more about what you offer. I’m looking to have my home painted, including both interior and exterior surfaces. Could you provide more details on your availability, pricing, and the types of paints you use? Additionally, I'd like to know if you offer any warranties on your work."
                  disabled
                  className="profile-modal-inputs profile-modal-input-textarea"
                />
              </div>
              <div className="mb-24">
                <label className="profile-modal-labels mb-12">
                  Your Complete Address{" "}
                  <span className="profile-modal-required">(required)</span>
                </label>
                <input
                  type="text"
                  value="45 Maple Street, South Yarra, VIC 3141"
                  disabled
                  className="profile-modal-inputs profile-modal-input"
                />
              </div>
              <div className="mb-24 flex-between">
                <div className="profile-modal-half-inputs">
                  <label className="profile-modal-labels mb-12">
                    Desired Start Date{" "}
                    <span className="profile-modal-required">(required)</span>
                  </label>
                  <input
                    type="date"
                    value="2024-08-30"
                    disabled
                    className="profile-modal-inputs profile-modal-half-input"
                  />
                </div>
                <div className="profile-modal-half-inputs">
                  <label className="profile-modal-labels mb-12">
                    Desired Finish Date
                  </label>
                  <input
                    type="date"
                    disabled
                    className="profile-modal-inputs profile-modal-half-input"
                  />
                </div>
              </div>
              <div className="mb-24 flex-between">
                <div className="profile-modal-half-inputs">
                  <label className="profile-modal-labels mb-12">
                    Your Budget
                  </label>
                  <div className="flex-between">
                    <input
                      type="text"
                      placeholder="000"
                      disabled
                      className="profile-modal-inputs profile-modal-budget"
                    />
                    <select
                      disabled
                      className="profile-modal-inputs profile-modal-select"
                    >
                      <option>AUD</option>
                    </select>
                  </div>
                </div>
                <div className="profile-modal-half-inputs">
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
              </div>
              <button className="profile-btn-cancel flex-center">
                <CircleX />
                Cancel job
              </button>
              <X
                className="profile-modal-close pointer"
                width={32}
                height={32}
                color="#837F89"
                onClick={() => setOpenModal(false)}
              />
            </div>
          ) : (
            <div className="profile-modal-content profile-modal-job">
              <h1 className="profile-modal-h1 mb-16">
                All-Around Painting Services
              </h1>
              <div className="profile-modal-details mb-16">
                <div className="profile-modal-detail flex-center">
                  <User color="#8C8C8C" />
                  Yves Vergara
                </div>
                <div className="profile-modal-detail flex-center">
                  <MapPin color="#8C8C8C" />
                  Sydney, NSW 2000
                </div>
                <div className="profile-modal-detail flex-center">
                  <Navigation color="#8C8C8C" />
                  Can work within 50km
                </div>
              </div>

              <div className="mb-16">
                Transform your home with the touch of a dedicated and skilled
                painter. I'm Yves, a professional painter with 7 years of
                experience, offering personalized house painting services
                tailored to your unique needs. Whether you're looking to refresh
                a single room or update the entire exterior, I bring a
                meticulous approach to every project.
              </div>
              <div className="mb-16">My Services Include:</div>
              <ul className="profile-modal-list mb-16">
                <li>
                  Interior Painting: I provide clean, detailed interior painting
                  services, using high-quility paints to create the perfect
                  atmosphere in your home.
                </li>
                <li>
                  Exterior Painting: Protect and enhance your home's curb appeal
                  with durable exterior painting that stands up to the elements.
                </li>
                <li>
                  Color Consultation: Not sure what color to choose? I'll help
                  you select the perfect shades that complement your style and
                  space.
                </li>
                <li>
                  Surface Preparation: From repairing small cracks to sanding
                  and priming, I handle all prep work to ensure a smooth,
                  long-lasting finish.
                </li>
                <li>
                  Attention to Detail: Every brushstroke is carefully applied,
                  ensuring a flawless finish that reflects my commitment to
                  quality.
                </li>
              </ul>
              <div className="mb-16">Why Choose Me?</div>
              <ul className="profile-modal-list mb-16">
                <li>
                  One-on-One Service: As a solo painter, I provide personalized
                  attention to every project, ensuring that your vision is
                  realized.
                </li>
                <li>
                  Reliable and On-Time: I value your time and work efficiently
                  to complete projects on schedule, without compromising
                  quality.
                </li>
                <li>
                  Customer Satisfaction: Your happiness is my priority. I work
                  closely with you from start to finish to ensure you’re
                  delighted with the results.
                </li>
              </ul>
              <div className="mb-16">
                Bring your home to life with a fresh coat of paint. Contact me
                today for a free consultation, and let’s make your home a place
                you love even more.
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
              <X
                className="profile-modal-close pointer"
                width={32}
                height={32}
                color="#837F89"
                onClick={() => setOpenModal(false)}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProfileContentItem;
