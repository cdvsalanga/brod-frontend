import React, { useEffect, useState } from "react";
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
  EllipsisVertical,
  ArrowLeft,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getUserDetails } from "../action/userActions";
import { useMediaQuery } from "react-responsive";

const ProfileContentItem = ({ item, role, data, profile }) => {
  const isMobile = useMediaQuery({ query: "(max-width:768px)" });

  const [showBtns, setShowBtns] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [tradieDetails, setTradieDetails] = useState();
  const [jobAdDetails, setJobAdDetails] = useState();

  const navigate = useNavigate();

  const { id } = useParams();

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
            <>
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
                key={res._id}
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
                          <h1 className="profile-modal-h1">
                            Sent Offer Details
                          </h1>
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
                      <div
                        className={isMobile ? "mb-24" : "mb-24 flex-between"}
                      >
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
                      <div
                        className={isMobile ? "mb-44" : "mb-24 flex-between"}
                      >
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
            </>
          ))}
      </>
      // <>
      //   <div
      //     className="profile-item mb-16 pointer"
      //     onClick={() => setOpenModal(true)}
      //   >
      //     <div className="mb-24">
      //       <div className="flex-between flex-center mb-12">
      //         <h2 className="profile-item-name">
      //           All-Around Painting Services
      //         </h2>
      //         <div className="profile-item-date-text">
      //           {item === "job"
      //             ? "Job accepted on"
      //             : item === "offer"
      //             ? "Inquiry Sent on"
      //             : item === "complete"
      //             ? "Job completed on"
      //             : "Bookmarked on"}{" "}
      //           <span className="profile-font-w-500">22 August 2024</span>
      //         </div>
      //       </div>
      //       <div className="mb-12 profile-job-details">
      //         <div className="flex-center profile-job-detail">
      //           <User width={20} height={20} color="#8C8C8C" />
      //           Yves Vergara
      //         </div>
      //         <div className="flex-center profile-job-detail">
      //           <MapPin width={20} height={20} color="#8C8C8C" />
      //           Sydney, NSW 2000
      //         </div>
      //         <div className="flex-center profile-job-detail">
      //           <Navigation width={20} height={20} color="#8C8C8C" />
      //           Can work within 50km
      //         </div>
      //       </div>
      //       <div className="profile-item-details">
      //         Transform your home with the touch of a dedicated and skilled
      //         painter. I’m Yves, a professional painter with 7 years of
      //         experience, offering personalized house painting services tailored
      //         to your unique needs. Whether you're looking to refresh a single
      //         room or update the entire exterior, I bring all-aroun...
      //       </div>
      //     </div>
      //     <div
      //       className={
      //         item === "complete" || item === "bookmark"
      //           ? "flex-end"
      //           : "flex-between"
      //       }
      //     >
      //       {item === "job" || item === "offer" ? (
      //         <button className="profile-btn-cancel flex-center">
      //           <CircleX />
      //           Cancel job
      //         </button>
      //       ) : (
      //         <></>
      //       )}
      //       <div>
      //         {item === "job" ? (
      //           <button className="profile-btn-black flex-center">
      //             <Check width={20} height={20} className="icon-bg-black" />
      //             Mark as completed
      //           </button>
      //         ) : item === "offer" ? (
      //           <div className="profile-item-offer">
      //             <button className="profile-btn-offer flex-center">
      //               <FileText width={20} height={20} />
      //               See offer details
      //             </button>
      //             <button className="profile-btn-black profile-btn-chat flex-center">
      //               <Mail width={20} height={20} className="icon-bg-black" />
      //               Chat
      //             </button>
      //           </div>
      //         ) : item === "complete" ? (
      //           <button className="profile-btn-black flex-center">
      //             <Star
      //               width={20}
      //               height={20}
      //               fill="#FFFFFF"
      //               className="icon-bg-black"
      //             />
      //             Rate the service
      //           </button>
      //         ) : (
      //           <div className="profile-bookmark flex-center">
      //             <Bookmark fill="#1F1F23" />
      //             Bookmarked
      //           </div>
      //         )}
      //       </div>
      //     </div>
      //   </div>
      //   <div className="profile-item mb-16">
      //     <div className="mb-24">
      //       <div className="flex-between flex-center mb-12">
      //         <h2 className="profile-item-name">
      //           All-Around Painting Services
      //         </h2>
      //         <div className="profile-item-date-text">
      //           {item === "job"
      //             ? "Job accepted on"
      //             : item === "offer"
      //             ? "Inquiry Sent on"
      //             : item === "complete"
      //             ? "Job completed on"
      //             : "Bookmarked on"}{" "}
      //           <span className="profile-font-w-500">22 August 2024</span>
      //         </div>
      //       </div>
      //       <div className="mb-12 profile-job-details">
      //         <div className="flex-center profile-job-detail">
      //           <User width={20} height={20} color="#8C8C8C" />
      //           Yves Vergara
      //         </div>
      //         <div className="flex-center profile-job-detail">
      //           <MapPin width={20} height={20} color="#8C8C8C" />
      //           Sydney, NSW 2000
      //         </div>
      //         <div className="flex-center profile-job-detail">
      //           <Navigation width={20} height={20} color="#8C8C8C" />
      //           Can work within 50km
      //         </div>
      //       </div>
      //       <div className="profile-item-details">
      //         Transform your home with the touch of a dedicated and skilled
      //         painter. I’m Yves, a professional painter with 7 years of
      //         experience, offering personalized house painting services tailored
      //         to your unique needs. Whether you're looking to refresh a single
      //         room or update the entire exterior, I bring all-aroun...
      //       </div>
      //     </div>
      //     <div
      //       className={
      //         item === "complete" || item === "bookmark"
      //           ? "flex-end"
      //           : "flex-between"
      //       }
      //     >
      //       {item === "job" || item === "offer" ? (
      //         <button className="profile-btn-cancel flex-center">
      //           <CircleX />
      //           Cancel job
      //         </button>
      //       ) : (
      //         <></>
      //       )}
      //       <div>
      //         {item === "job" ? (
      //           <button className="profile-btn-black flex-center">
      //             <Check width={20} height={20} className="icon-bg-black" />
      //             Mark as completed
      //           </button>
      //         ) : item === "offer" ? (
      //           <div className="profile-item-offer">
      //             <button className="profile-btn-offer flex-center">
      //               <FileText width={20} height={20} />
      //               See offer details
      //             </button>
      //             <button className="profile-btn-black profile-btn-chat flex-center">
      //               <Mail width={20} height={20} className="icon-bg-black" />
      //               Chat
      //             </button>
      //           </div>
      //         ) : item === "complete" ? (
      //           <div className="profile-complete-rated">
      //             <div>
      //               <Star fill="#1F1F23" />
      //               <Star fill="#1F1F23" />
      //               <Star fill="#1F1F23" />
      //               <Star fill="#1F1F23" />
      //               <Star fill="#1F1F23" />
      //             </div>
      //             <span className="profile-rated-text">See rating details</span>
      //           </div>
      //         ) : (
      //           <div className="profile-bookmark flex-center">
      //             <Bookmark fill="#1F1F23" />
      //             Bookmarked
      //           </div>
      //         )}
      //       </div>
      //     </div>
      //   </div>
      // {openModal && (
      //   <div className="profile-modal scroll-lock">
      //     {item === "offer" ? (
      //       <div className="profile-modal-content profile-modal-job profile-modal-offer">
      //         <h1 className="profile-modal-h1 mb-24">Sent Offer Details</h1>
      //         <div className="mb-24">
      //           <label className="profile-modal-labels mb-12">
      //             Job Ad Title
      //           </label>
      //           <input
      //             type="text"
      //             value="All-Around Painting Services"
      //             disabled
      //             className="profile-modal-inputs profile-modal-input"
      //           />
      //         </div>
      //         <div className="mb-24">
      //           <label className="profile-modal-labels mb-12">
      //             Detailed description of the service you need.{" "}
      //             <span className="profile-modal-required">(required)</span>
      //           </label>
      //           <textarea
      //             value="I'm interested in learning more about what you offer. I’m looking to have my home painted, including both interior and exterior surfaces. Could you provide more details on your availability, pricing, and the types of paints you use? Additionally, I'd like to know if you offer any warranties on your work."
      //             disabled
      //             className="profile-modal-inputs profile-modal-input-textarea"
      //           />
      //         </div>
      //         <div className="mb-24">
      //           <label className="profile-modal-labels mb-12">
      //             Your Complete Address{" "}
      //             <span className="profile-modal-required">(required)</span>
      //           </label>
      //           <input
      //             type="text"
      //             value="45 Maple Street, South Yarra, VIC 3141"
      //             disabled
      //             className="profile-modal-inputs profile-modal-input"
      //           />
      //         </div>
      //         <div className="mb-24 flex-between">
      //           <div className="half-inputs">
      //             <label className="profile-modal-labels mb-12">
      //               Desired Start Date{" "}
      //               <span className="profile-modal-required">(required)</span>
      //             </label>
      //             <input
      //               type="date"
      //               value="2024-08-30"
      //               disabled
      //               className="profile-modal-inputs profile-modal-half-input"
      //             />
      //           </div>
      //           <div className="half-inputs">
      //             <label className="profile-modal-labels mb-12">
      //               Desired Finish Date
      //             </label>
      //             <input
      //               type="date"
      //               disabled
      //               className="profile-modal-inputs profile-modal-half-input"
      //             />
      //           </div>
      //         </div>
      //         <div className="mb-24 flex-between">
      //           <div className="half-inputs">
      //             <label className="profile-modal-labels mb-12">
      //               Your Budget
      //             </label>
      //             <div className="flex-between">
      //               <input
      //                 type="text"
      //                 placeholder="000"
      //                 disabled
      //                 className="profile-modal-inputs profile-modal-budget"
      //               />
      //               <select
      //                 disabled
      //                 className="profile-modal-inputs profile-modal-select"
      //               >
      //                 <option>AUD</option>
      //               </select>
      //             </div>
      //           </div>
      //           <div className="half-inputs">
      //             <label className="profile-modal-labels mb-12">
      //               Contact Number
      //             </label>
      //             <input
      //               type="text"
      //               value="+61 345678901"
      //               disabled
      //               className="profile-modal-inputs profile-modal-half-input"
      //             />
      //           </div>
      //         </div>
      //         <button className="profile-btn-cancel flex-center">
      //           <CircleX />
      //           Cancel job
      //         </button>
      //         <X
      //           className="profile-modal-close pointer"
      //           width={32}
      //           height={32}
      //           color="#837F89"
      //           onClick={() => setOpenModal(false)}
      //         />
      //       </div>
      //     ) : (
      //       <div className="profile-modal-content profile-modal-job">
      //         <h1 className="profile-modal-h1 mb-16">
      //           All-Around Painting Services
      //         </h1>
      //         <div className="profile-modal-details mb-16">
      //           <div className="profile-modal-detail flex-center">
      //             <User color="#8C8C8C" />
      //             Yves Vergara
      //           </div>
      //           <div className="profile-modal-detail flex-center">
      //             <MapPin color="#8C8C8C" />
      //             Sydney, NSW 2000
      //           </div>
      //           <div className="profile-modal-detail flex-center">
      //             <Navigation color="#8C8C8C" />
      //             Can work within 50km
      //           </div>
      //         </div>

      //         <div className="mb-16">
      //           Transform your home with the touch of a dedicated and skilled
      //           painter. I'm Yves, a professional painter with 7 years of
      //           experience, offering personalized house painting services
      //           tailored to your unique needs. Whether you're looking to
      //           refresh a single room or update the entire exterior, I bring a
      //           meticulous approach to every project.
      //         </div>
      //         <div className="mb-16">My Services Include:</div>
      //         <ul className="profile-modal-list mb-16">
      //           <li>
      //             Interior Painting: I provide clean, detailed interior
      //             painting services, using high-quility paints to create the
      //             perfect atmosphere in your home.
      //           </li>
      //           <li>
      //             Exterior Painting: Protect and enhance your home's curb
      //             appeal with durable exterior painting that stands up to the
      //             elements.
      //           </li>
      //           <li>
      //             Color Consultation: Not sure what color to choose? I'll help
      //             you select the perfect shades that complement your style and
      //             space.
      //           </li>
      //           <li>
      //             Surface Preparation: From repairing small cracks to sanding
      //             and priming, I handle all prep work to ensure a smooth,
      //             long-lasting finish.
      //           </li>
      //           <li>
      //             Attention to Detail: Every brushstroke is carefully applied,
      //             ensuring a flawless finish that reflects my commitment to
      //             quality.
      //           </li>
      //         </ul>
      //         <div className="mb-16">Why Choose Me?</div>
      //         <ul className="profile-modal-list mb-16">
      //           <li>
      //             One-on-One Service: As a solo painter, I provide
      //             personalized attention to every project, ensuring that your
      //             vision is realized.
      //           </li>
      //           <li>
      //             Reliable and On-Time: I value your time and work efficiently
      //             to complete projects on schedule, without compromising
      //             quality.
      //           </li>
      //           <li>
      //             Customer Satisfaction: Your happiness is my priority. I work
      //             closely with you from start to finish to ensure you’re
      //             delighted with the results.
      //           </li>
      //         </ul>
      //         <div className="mb-16">
      //           Bring your home to life with a fresh coat of paint. Contact me
      //           today for a free consultation, and let’s make your home a
      //           place you love even more.
      //         </div>
      //         <div className="flex-between">
      //           <button className="profile-btn-cancel flex-center">
      //             <CircleX />
      //             Cancel job
      //           </button>
      //           <button className="profile-btn-black flex-center">
      //             <Check width={20} height={20} className="icon-bg-black" />
      //             Mark as completed
      //           </button>
      //         </div>
      //         <X
      //           className="profile-modal-close pointer"
      //           width={32}
      //           height={32}
      //           color="#837F89"
      //           onClick={() => setOpenModal(false)}
      //         />
      //       </div>
      //     )}
      //   </div>
      // )}
      // </>
    );
  } else if (role === "Tradie") {
    return (
      data &&
      data.map((res) => (
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
      ))
    );
  }
};

export default ProfileContentItem;
