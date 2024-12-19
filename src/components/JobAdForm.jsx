import React, { useEffect, useState } from "react";
import "../styles/PostJobAd.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  addTradieJobAd,
  getJobAdDetailsByServiceId,
  updateIsActive,
  updateJobAdDetails,
} from "../action/tradieActions";
import { ArrowLeft, Upload, X } from "lucide-react";
import { useMediaQuery } from "react-responsive";
import { TailSpin } from "react-loading-icons";

const JobAdForm = () => {
  const isMobile = useMediaQuery({ query: "(max-width:768px)" });

  const [userInfo] = useState(JSON.parse(localStorage.getItem("userInfo")));
  const [loading, setLoading] = useState(false);
  const [jobAdData, setJobAdData] = useState();
  const [token, setToken] = useState();
  const [userID, setUserID] = useState();
  const [businessPostcode, setBusinessPostcode] = useState(
    userInfo ? userInfo.businessPostCode : ""
  );
  const [jobCategory, setJobCategory] = useState("");
  const [jobAdTitle, setJobAdTitle] = useState("");
  const [descriptionOfService, setDescriptionOfService] = useState("");
  const [pricingOption, setPricingOption] = useState("");
  const [pricingStartsAt, setPricingStartsAt] = useState("");
  const [currency, setCurrency] = useState("AUD");
  const [thumbnailImage, setThumbnailImage] = useState("");
  const [projectGallery, setProjectGallery] = useState([]);
  const [status, setStatus] = useState();

  let isActive;

  const navigate = useNavigate();

  const { id, serviceId } = useParams();

  const getJobAdDetailsByServiceIdData = async () => {
    await getJobAdDetailsByServiceId(serviceId, userInfo.token).then((res) => {
      if (res && res.status === 401) {
        alert("Your session expired, please login again.");
        localStorage.removeItem("userInfo");
        navigate("/login");
        return;
      }

      setJobAdData(res);
      setBusinessPostcode(res.businessPostcode);
      setJobCategory(res.jobCategory);
      setJobAdTitle(res.jobAdTitle);
      setDescriptionOfService(res.descriptionOfService);
      setPricingOption(res.pricingOption);
      setPricingStartsAt(res.pricingStartsAt);
      setCurrency(res.currency);
      setThumbnailImage(res.thumbnailImage);
      setProjectGallery(res.projectGallery);
      setStatus(res.isActive ? "publish" : "unpublish");
      setLoading(false);
    });
  };

  useEffect(() => {
    if (userInfo) {
      setToken(userInfo.token);
      setUserID(userInfo.userId);
      if (serviceId) {
        setLoading(true);
        getJobAdDetailsByServiceIdData();
      }
    } else {
      navigate("/login");
    }
  }, []);

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const projectGalleryUpload = async (e) => {
    if (e.target.files[0].size > 2097152) {
      alert("File is too big. Maximum file size is 2MB");
      return;
    }

    const uploadedBase64 = [...projectGallery];
    const file = e.target.files[0];

    await toBase64(file).then((res) => {
      if (!uploadedBase64.includes(res)) {
        uploadedBase64.push(res);
      }
    });

    setProjectGallery(uploadedBase64);
  };

  const removeFile = (i) => {
    const uploadedBase64 = [...projectGallery];

    uploadedBase64.splice(i, 1);

    setProjectGallery(uploadedBase64);
  };

  const AddJobHandler = async (isActive) => {
    setLoading(true);
    await addTradieJobAd(
      userID,
      businessPostcode,
      jobCategory,
      jobAdTitle,
      descriptionOfService,
      pricingOption,
      pricingStartsAt,
      currency,
      thumbnailImage,
      projectGallery,
      token,
      isActive
    ).then((res) => {
      if (res && res.status === 401) {
        alert("Your session expired, please login again.");
        localStorage.removeItem("userInfo");
        navigate("/login");
        return;
      }
      alert(`Job Ad ${jobAdTitle} posted!`);
      window.location.reload();
    });
  };

  const updateToUnpublishedHandler = async () => {
    setLoading(true);
    await updateIsActive(serviceId, (isActive = false), token).then((res) => {
      if (res && res.status === 401) {
        alert("Your session expired, please login again.");
        localStorage.removeItem("userInfo");
        navigate("/login");
        return;
      }
      window.location.reload();
    });
  };

  const updateToPublishedHandler = async () => {
    setLoading(true);
    await updateIsActive(serviceId, (isActive = true), token).then((res) => {
      if (res && res.status === 401) {
        alert("Your session expired, please login again.");
        localStorage.removeItem("userInfo");
        navigate("/login");
        return;
      }
      window.location.reload();
    });
  };

  const updateJobAdHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    jobAdData.businessPostcode = businessPostcode;
    jobAdData.jobCategory = jobCategory;
    jobAdData.jobAdTitle = jobAdTitle;
    jobAdData.descriptionOfService = descriptionOfService;
    jobAdData.pricingOption = pricingOption;
    jobAdData.pricingStartsAt = pricingStartsAt;
    jobAdData.currency = currency;
    jobAdData.thumbnailImage = thumbnailImage;
    jobAdData.projectGallery = projectGallery;

    await updateJobAdDetails(jobAdData, token).then((res) => {
      if (res && res.status === 401) {
        alert("Your session expired, please login again.");
        localStorage.removeItem("userInfo");
        navigate("/login");
        return;
      }
      window.location.reload();
    });
  };

  return loading ? (
    <div className="loading loading-page">
      <TailSpin stroke="#1f1f23" speed={1} />
    </div>
  ) : (
    <form className="job-form">
      <div className={isMobile ? "mb-36" : "mb-40"}>
        {status === "publish" ? (
          <div className="flex-between flex-center mb-20">
            {isMobile ? (
              <div className="flex-center gap-8">
                <ArrowLeft
                  color="#717171"
                  className="pointer"
                  onClick={() => navigate(`/profile/${id}/job-ads`)}
                />
                <h1 className="job-form-h1">Job Ad Details</h1>
              </div>
            ) : (
              <h1 className="job-form-h1">Job Ad Details</h1>
            )}
            <div className="job-form-status job-form-publish">Published</div>
          </div>
        ) : status === "unpublish" ? (
          <div className="flex-between flex-center mb-20">
            {isMobile ? (
              <div className="flex-center gap-8">
                <ArrowLeft
                  color="#717171"
                  className="pointer"
                  onClick={() => navigate(`/profile/${id}/job-ads`)}
                />
                <h1 className="job-form-h1">Job Ad Details</h1>
              </div>
            ) : (
              <h1 className="job-form-h1">Job Ad Details</h1>
            )}
            <div className="job-form-status job-form-unpublish">
              Unpublished
            </div>
          </div>
        ) : isMobile ? (
          <div className="flex-center gap-8 mb-20">
            <ArrowLeft
              color="#717171"
              className="pointer"
              onClick={() => navigate(-1)}
            />
            <h1 className="job-form-h1">Post a Job Ad</h1>
          </div>
        ) : (
          <h1 className="job-form-h1 mb-20">Post a Job Ad</h1>
        )}
        <div className={!isMobile && "flex-between mb-24"}>
          <div className={isMobile ? "mb-24" : "half-inputs"}>
            <label className="block mb-12">Business Postcode</label>
            <input
              className={
                isMobile
                  ? "job-form-input"
                  : "job-form-input job-form-half-input"
              }
              type="text"
              onChange={(e) => setBusinessPostcode(e.target.value)}
              defaultValue={businessPostcode}
              disabled={status === "publish" ? true : false}
              required
            />
          </div>
          <div className={isMobile ? "mb-24" : "half-inputs"}>
            <label className="block mb-12 mb-12">Job Category</label>
            <select
              className="job-form-input job-form-select"
              defaultValue={jobCategory}
              onChange={(e) => setJobCategory(e.target.value)}
              disabled={status === "publish" ? true : false}
              required
            >
              <option value={""} disabled hidden>
                Select
              </option>
              <option>Air Conditioning Installer / Supplier</option>
              <option>Antenna Installer / Supplier</option>
              <option>Appliance Installer</option>
              <option>Appliance Repairer</option>
              <option>Arborist</option>
              <option>Architect</option>
              <option>Asbestos Removal Expert</option>
              <option>Awning Installer / Supplier</option>
              <option>Balustrading Installer</option>
              <option>Bamboo Flooring Installer / Supplier</option>
              <option>Bath and Basin Resurfacing</option>
              <option>Bathroom Building / Renovation</option>
              <option>Blinds Installer / Supplier</option>
              <option>Bricklayer</option>
              <option>Builder</option>
              <option>Building Certifier</option>
              <option>Building Consultant</option>
              <option>Building Designer</option>
              <option>Building Inspector</option>
              <option>Building Surveyor</option>
              <option>Cabinet Maker</option>
              <option>Carpenter</option>
              <option>Carpet / Upholstery Cleaning</option>
              <option>Carpet Layer / Repairs</option>
              <option>Carport Builder</option>
              <option>Chimney Installer</option>
              <option>House Cleaning Services</option>
              <option>Commercial Cleaning Services</option>
              <option>Concrete Kerb Builder</option>
              <option>Concrete Resurfacer</option>
              <option>Concretor</option>
              <option>Curtain Installer / Supplier</option>
              <option>Custom Furniture Designer</option>
              <option>Damp Proofing Services</option>
              <option>Deck Builder</option>
              <option>Deep Cleaning</option>
              <option>Demolition Services</option>
              <option>Door Installer / Supplier</option>
              <option>Drafter</option>
              <option>Drains Installer / Maintenance</option>
              <option>Electrician</option>
              <option>Equipment Hire Supplier</option>
              <option>EV Charger Installation</option>
              <option>Excavation Services</option>
              <option>Renovation and Extensions Builder</option>
              <option>Fence Builder</option>
              <option>Floor Coating</option>
              <option>Floor Sanding and Polishing Services</option>
              <option>Fly Screen Installer / Supplier</option>
              <option>Frame and Truss Maintenance</option>
              <option>Removalist</option>
              <option>Garage Builder</option>
              <option>Garden Designer</option>
              <option>Gardener</option>
              <option>Gas Fitter</option>
              <option>Gate Insaller / Supplier</option>
              <option>Gazebo Builder / Supplier</option>
              <option>Glazier</option>
              <option>Glass Balustrade Installer / Supplier</option>
              <option>Gutter Installer / Maintenance / Supplier</option>
              <option>Handyman</option>
              <option>Heating System Installer / Supplier</option>
              <option>Hot Water System Installer / Supplier</option>
              <option>Hybrid Flooring</option>
              <option>IKEA Kitchen Installer</option>
              <option>Insulation Installer / Supplier</option>
              <option>Interior Decorator</option>
              <option>Interior Designer</option>
              <option>Irrigation System Expert</option>
              <option>Joiner</option>
              <option>Kitchen Designer</option>
              <option>Kitchen Building / Renovations</option>
              <option>Landscape Architect</option>
              <option>Landscaper</option>
              <option>Lawn and Turf Installer / Supplier</option>
              <option>Lawn Mowing Services</option>
              <option>Leak Detection</option>
              <option>Lighting Expert</option>
              <option>Locksmith</option>
              <option>Mattres Cleaning</option>
              <option>Painter</option>
              <option>Patio Builder</option>
              <option>Paving Supplier</option>
              <option>Paving</option>
              <option>Pergola Builder</option>
              <option>Pest Control Services</option>
              <option>Pest Inspector</option>
              <option>Plasterer</option>
              <option>Plumber</option>
              <option>Pool Builder</option>
              <option>Pool Fence Installer / Maintenance</option>
              <option>Pool Maintenance Services</option>
              <option>Pressure Cleaning Services</option>
              <option>Construction Project Manager</option>
              <option>Rainwater Tanks Installer / Supplier</option>
              <option>Renderer</option>
              <option>Reproduction Stone Supplier</option>
              <option>Retaining Wall Builder</option>
              <option>Roller Door Installer / Supplier</option>
              <option>Roofer</option>
              <option>Rubbish Removal Services</option>
              <option>Scaffolding Services</option>
              <option>Screen Enclosure Supplier</option>
              <option>Security Screen Installer / Supplier</option>
              <option>Security Systems Specialist</option>
              <option>Shade and Sail Installer / Supplier</option>
              <option>Shed Builder / Supplier</option>
              <option>Shopfitter</option>
              <option>Shower Screen Installer / Supplier</option>
              <option>Skip and Truck Hire Services</option>
              <option>Skylight Installer / Supplier</option>
              <option>Soil Testing</option>
              <option>Solar Power Installer / Maintenance</option>
              <option>Splashback Intaller / Supplier</option>
              <option>Stonemason</option>
              <option>Storage Services</option>
              <option>Structural Engineer</option>
              <option>Surveyor</option>
              <option>Tile Supplier</option>
              <option>Tiler</option>
              <option>Timber Floor Installation / Repairs</option>
              <option>Town Planner</option>
              <option>Tree Feller</option>
              <option>Underfloor Heating Installer / Supplier</option>
              <option>Underpinning Services</option>
              <option>Upholstery Repairer</option>
              <option>Ventilation System Specialists</option>
              <option>Vinyl and Laminate Installer</option>
              <option>Wallpaper Installer / Supplier</option>
              <option>Wardrobe Builder</option>
              <option>Waterproofer</option>
              <option>Window Cleaning Services</option>
              <option>Window Installer / Repairs</option>
              <option>Window Shutter Installer / Supplier</option>
              <option>Window Tinting Services</option>
            </select>
          </div>
        </div>
        <div className="mb-24">
          <label className="block mb-12">Job Ad Title</label>
          <input
            type="text"
            className="job-form-input"
            defaultValue={jobAdTitle}
            onChange={(e) => setJobAdTitle(e.target.value)}
            disabled={status === "publish" ? true : false}
            required
          />
        </div>
        <div className="mb-24">
          <label className="block mb-12">Description of your service</label>
          <textarea
            className="job-form-input job-form-textarea"
            defaultValue={descriptionOfService}
            onChange={(e) => setDescriptionOfService(e.target.value)}
            disabled={status === "publish" ? true : false}
            required
          />
        </div>
        <div className={!isMobile && "flex-between mb-24"}>
          <div className={isMobile ? "mb-24" : "half-inputs"}>
            <label className="block mb-12">
              Pricing option{" "}
              <span className="job-form-optional">(optional)</span>
            </label>
            <select
              defaultValue={pricingOption}
              className="job-form-input job-form-select"
              onChange={(e) => setPricingOption(e.target.value)}
              disabled={status === "publish" ? true : false}
            >
              <option value={""} disabled hidden>
                Select
              </option>
              <option>Per hour</option>
              <option>Per day</option>
            </select>
          </div>
          <div className={isMobile ? "mb-24" : "half-inputs"}>
            <label className="block mb-12">
              Your Pricing Starts at{" "}
              <span className="job-form-optional">(optional)</span>
            </label>
            <div className="job-form-price">
              <input
                type="text"
                className="job-form-input job-form-price-text"
                placeholder="00"
                defaultValue={pricingStartsAt}
                onChange={(e) => setPricingStartsAt(e.target.value)}
                disabled={status === "publish" ? true : false}
              />
              <select
                defaultValue={currency}
                className="job-form-input job-form-price-select"
                disabled={status === "publish" ? true : false}
              >
                <option>AUD</option>
              </select>
            </div>
          </div>
        </div>
        <div className="job-form-files flex-center mb-24">
          <label>Thumbnail Image</label>
          {thumbnailImage ? (
            <div className="job-form-imgs">
              <img
                src={thumbnailImage}
                width={60}
                height={50}
                className="job-form-img"
              />
              {status !== "publish" && (
                <X
                  width={16}
                  height={16}
                  color="#717171"
                  className="job-form-x pointer"
                  onClick={() => setThumbnailImage("")}
                />
              )}
            </div>
          ) : (
            <>
              <label
                className="flex-center gap-8 pointer job-form-upload"
                htmlFor="thumbnailImg"
              >
                <Upload color="#8C8C8C" />
                Upload
              </label>
              <input
                type="file"
                className="none"
                id="thumbnailImg"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files[0].size > 2097152) {
                    alert("File is too big. Maximum file size is 2MB");
                    return;
                  }

                  toBase64(e.target.files[0]).then((res) =>
                    setThumbnailImage(res)
                  );
                }}
              />
            </>
          )}
        </div>
        <div className="job-form-files flex-center">
          <label>
            Project Gallery{" "}
            <span className="job-form-optional">(optional)</span>
          </label>
          {status !== "publish" && (
            <>
              <label
                className="flex-center gap-8 pointer job-form-upload"
                htmlFor="projectGallery"
              >
                <Upload color="#8C8C8C" />
                Upload
              </label>
              <input
                type="file"
                className="none"
                id="projectGallery"
                accept="image/*"
                onChange={projectGalleryUpload}
              />
            </>
          )}
        </div>
        {projectGallery.length > 0 && (
          <div className="job-form-gallery">
            {projectGallery.map((pic, i) => (
              <div className="job-form-imgs" key={i}>
                <img
                  src={pic}
                  width={60}
                  height={50}
                  className="job-form-img"
                />
                {status !== "publish" && (
                  <X
                    width={16}
                    height={16}
                    color="#717171"
                    className="job-form-x pointer"
                    onClick={() => removeFile(i)}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {status === "publish" ? (
        <div className="flex-end">
          <button
            type="button"
            onClick={updateToUnpublishedHandler}
            className={
              isMobile
                ? "job-form-btn job-form-btn-red pointer w-100"
                : "job-form-btn job-form-btn-red pointer"
            }
          >
            Unpublished
          </button>
        </div>
      ) : status === "unpublish" ? (
        <div className={isMobile ? "job-form-btns" : "job-form-btns flex-end"}>
          <button
            type="submit"
            className="job-form-btn pointer"
            onClick={updateJobAdHandler}
          >
            Save
          </button>
          <button
            type="button"
            className="job-form-btn job-form-btn-black pointer"
            onClick={updateToPublishedHandler}
          >
            Publish
          </button>
        </div>
      ) : (
        <div className={isMobile ? "job-form-btns" : "job-form-btns flex-end"}>
          <button
            type="button"
            onClick={() => AddJobHandler((isActive = false))}
            className="job-form-btn pointer"
          >
            Save as unpublished
          </button>
          <button
            type="button"
            onClick={() => AddJobHandler((isActive = true))}
            className="job-form-btn job-form-btn-black pointer"
          >
            Publish
          </button>
        </div>
      )}
    </form>
  );
};

export default JobAdForm;
