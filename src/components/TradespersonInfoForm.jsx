import React, { useEffect, useState } from "react";
import "../styles/SignUpInfo.css";
import { ArrowLeft, Check, Download, Upload, X, XCircle } from "lucide-react";
import { updateTradieProfile } from "../action/tradieActions";
import { getUserDetails } from "../action/userActions";
import { Link, useNavigate, useParams } from "react-router-dom";
import { updateTradieStatus } from "../action/adminActions";
import { useMediaQuery } from "react-responsive";
import { TailSpin } from "react-loading-icons";

const TradespersonInfoForm = ({ page }) => {
  const isMobile = useMediaQuery({ query: "(max-width:768px)" });

  const [openModal, setOpenModal] = useState(false);
  const [businessPostCode, setBusinessPostCode] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [contactNumber, setContactNumber] = useState("");
  const [registeredBusinessName, setRegisteredBusinessName] = useState();
  const [australianBusinessNumber, setAustralianBusinessNumber] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [postalCode, setPostalCode] = useState();
  const [typeofWork, setTypeofWork] = useState();
  const [certificationFilesUploaded, setCertificationFilesUploaded] =
    useState();
  const [userDetails, setUserDetails] = useState();
  const [userInfo] = useState(JSON.parse(localStorage.getItem("userInfo")));
  const [token, setToken] = useState();
  const [loading, setLoading] = useState(false);
  const [declineReason, setDeclineReason] = useState();

  const navigate = useNavigate();

  const { id } = useParams();

  const getUser = async () => {
    setLoading(true);
    await getUserDetails(id).then((user) => {
      setUserDetails(user);

      setBusinessPostCode(user.businessPostCode);
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setContactNumber(user.contactNumber);
      setRegisteredBusinessName(user.registeredBusinessName);
      setAustralianBusinessNumber(user.australianBusinessNumber);
      setCity(user.city);
      setState(user.state);
      setPostalCode(user.postalCode);
      setTypeofWork(user.typeofWork);
      setCertificationFilesUploaded(user.certificationFilesUploaded);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (userInfo) {
      if (userInfo.role === "Admin") {
        navigate(`/admin/application-details/${id}`);
      } else if (userInfo.role === "Tradie") {
        if (userInfo.status === "Approved") {
          navigate(`/tradesperson/dashboard/${userInfo.userId}`);
        }
      } else if (userInfo.role === "Client") {
        navigate("/services");
      }
      setToken(userInfo.token);
      getUser();
    } else {
      navigate("/login");
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    delete userDetails._id;

    const services = [typeofWork];

    userDetails.id = id;
    userDetails.firstName = firstName;
    userDetails.lastName = lastName;
    userDetails.businessPostCode = businessPostCode;
    userDetails.contactNumber = "+61" + contactNumber;
    userDetails.registeredBusinessName = registeredBusinessName;
    userDetails.australianBusinessNumber = australianBusinessNumber;
    userDetails.city = city;
    userDetails.state = state;
    userDetails.postalCode = postalCode;
    userDetails.typeofWork = typeofWork;
    userDetails.certificationFilesUploaded = certificationFilesUploaded;
    userDetails.businessAddress = "";
    userDetails.services = services;

    await updateTradieProfile(userDetails, token).then((res) => {
      if (res && res.status === 401) {
        alert("Your session expired, please login again.");
        localStorage.removeItem("userInfo");
        navigate("/login");
        return;
      }
    });

    navigate("/login/application-under-review");
  };

  const toBase64 = async (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const fileHandler = async (e) => {
    if (e.target.files[0].size > 1048576) {
      alert("File is too big. Maximum file size is 1MB");
      return;
    }

    const uploadedBase64 = [...certificationFilesUploaded];
    const file = e.target.files[0];

    await toBase64(file).then((res) => {
      if (!uploadedBase64.includes(file.name.replace(/\s/g, "") + " " + res)) {
        uploadedBase64.push(file.name.replace(/\s/g, "") + " " + res);
      }
    });

    setCertificationFilesUploaded(uploadedBase64);
  };

  const removeFile = (i) => {
    const uploadedBase64 = [...certificationFilesUploaded];

    uploadedBase64.splice(i, 1);

    setCertificationFilesUploaded(uploadedBase64);
  };

  const approveTradieHandler = async () => {
    setLoading(true);
    const status = "Approved";

    await updateTradieStatus(id, status, token).then((res) => {
      if (res && res.status === 401) {
        alert("Your session expired, please login again.");
        localStorage.removeItem("userInfo");
        navigate("/login");
        return;
      }

      getUser();
    });
  };

  const declineTradieHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const status = "Declined";

    await updateTradieStatus(id, status, token).then((res) => {
      if (res && res.status === 401) {
        alert("Your session expired, please login again.");
        localStorage.removeItem("userInfo");
        navigate("/login");
        return;
      }

      setOpenModal(false);
      getUser();
    });
  };

  if (userDetails && !loading) {
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
        ) : isMobile ? (
          <div className="flex-between flex-center mb-20">
            <div className="flex-center gap-8">
              <ArrowLeft
                color="#717171"
                className="pointer"
                onClick={() => navigate("/admin")}
              />
              <h1 className="signup-info-title">Application Details</h1>
            </div>
            <span
              className={
                userDetails &&
                (userDetails.status === "New"
                  ? "signup-info-status-pending"
                  : userDetails.status === "Approved"
                  ? "signup-info-status-approved"
                  : "signup-info-status-declined")
              }
            >
              {userDetails &&
                (userDetails.status === "New"
                  ? "New"
                  : userDetails.status === "Approved"
                  ? "Approved"
                  : "Declined")}
            </span>
          </div>
        ) : (
          <div className="flex-between flex-center mb-32">
            <h1 className="signup-info-h1">Application Details</h1>
            <span
              className={
                userDetails &&
                (userDetails.status === "New"
                  ? "signup-info-status-pending"
                  : userDetails.status === "Approved"
                  ? "signup-info-status-approved"
                  : "signup-info-status-declined")
              }
            >
              {userDetails &&
                (userDetails.status === "New"
                  ? "Pending approval"
                  : userDetails.status === "Approved"
                  ? "Approved"
                  : "Declined")}
            </span>
          </div>
        )}
        <form onSubmit={submitHandler} className="signup-info-form">
          <div className="signup-info-halfw">
            <label className="signup-info-label">Business Postcode</label>
            <input
              type="text"
              className="signup-info-input"
              placeholder="0000"
              defaultValue={businessPostCode}
              onChange={(e) => setBusinessPostCode(e.target.value)}
              required
              disabled={page === "signup" ? false : true}
            />
          </div>
          <div className="signup-info-halfw">
            <label className="signup-info-label">
              Main type of work you do?
            </label>
            <select
              className="signup-info-input signup-info-select mb-24"
              defaultValue={typeofWork}
              onChange={(e) => setTypeofWork(e.target.value)}
              required
              disabled={page === "signup" ? false : true}
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
            {page === "signup" && (
              <div className="signup-info-choose">
                Choose one for now. You can add more later.
              </div>
            )}
          </div>
          <div className="signup-info-halfw">
            <label className="signup-info-label">First Name</label>
            <input
              type="text"
              className="signup-info-input"
              defaultValue={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              disabled={page === "signup" ? false : true}
            />
          </div>
          <div className="signup-info-halfw">
            <label className="signup-info-label">Last Name</label>
            <input
              type="text"
              className="signup-info-input"
              defaultValue={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              disabled={page === "signup" ? false : true}
            />
          </div>
          <div className="signup-info-halfw">
            <label className="signup-info-label">Contact Number</label>
            <div className="flex-center gap-8">
              <input
                type="text"
                value={"+61"}
                disabled
                className="signup-info-input-contact"
              />
              <input
                type="tel"
                pattern="[0-9]{9}"
                className="signup-info-input-contact signup-info-input-contact-num"
                defaultValue={contactNumber.split("+61")[1]}
                placeholder="000000000"
                onChange={(e) => setContactNumber(e.target.value)}
                required
                disabled={page === "signup" ? false : true}
              />
            </div>
          </div>
          <div className="signup-info-halfw">
            <label className="signup-info-label">
              Australian Business Number
            </label>
            <input
              type="text"
              className="signup-info-input"
              placeholder="00000000000"
              defaultValue={australianBusinessNumber}
              onChange={(e) => setAustralianBusinessNumber(e.target.value)}
              required
              disabled={page === "signup" ? false : true}
            />
          </div>
          <div className="signup-info-halfw">
            <label className="signup-info-label">
              Registered Business Name
            </label>
            <input
              type="text"
              className="signup-info-input"
              defaultValue={registeredBusinessName}
              onChange={(e) => setRegisteredBusinessName(e.target.value)}
              required
              disabled={page === "signup" ? false : true}
            />
          </div>
          <div className="signup-info-halfw">
            <label className="signup-info-label">City</label>
            <input
              type="text"
              className="signup-info-input"
              defaultValue={city}
              onChange={(e) => setCity(e.target.value)}
              required
              disabled={page === "signup" ? false : true}
            />
          </div>
          <div className="signup-info-halfw">
            <label className="signup-info-label">State</label>
            <input
              type="text"
              className="signup-info-input"
              defaultValue={state}
              onChange={(e) => setState(e.target.value)}
              required
              disabled={page === "signup" ? false : true}
            />
          </div>
          <div className="signup-info-halfw">
            <label className="signup-info-label">Postal Code</label>
            <input
              type="text"
              className="signup-info-input"
              defaultValue={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
              disabled={page === "signup" ? false : true}
            />
          </div>
          {page === "signup" ? (
            <div className="signup-info-maxw">
              <label className="signup-info-label">
                Upload Your Credentials (e.g., Qualifications, Licenses)
              </label>
              <label
                className="flex-center gap-8 pointer"
                htmlFor="imageUpload"
              >
                <Upload color="#8C8C8C" />
                Upload
              </label>
              <input
                type="file"
                className="none"
                id="imageUpload"
                onChange={fileHandler}
              />
              <div className="files">
                {certificationFilesUploaded &&
                  certificationFilesUploaded.map((file, i) => (
                    <div key={i} className="file">
                      {file.split(" ")[0]}
                      <X
                        width={20}
                        height={20}
                        color="#8C8C8C"
                        className="pointer"
                        onClick={() => removeFile(i)}
                      />
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div className="signup-info-maxw mb-48">
              <label className="signup-info-label">Uploaded Credentials</label>

              <div className="files">
                {certificationFilesUploaded &&
                  certificationFilesUploaded.map((file, i) => (
                    <a
                      href={file.split(" ")[1]}
                      download={file.split(" ")[0]}
                      key={i}
                      className="file pointer"
                    >
                      {file.split(" ")[0]}
                      <Download width={20} height={20} color="#8C8C8C" />
                    </a>
                  ))}
              </div>
            </div>
          )}

          {page === "signup" ? (
            <button type="submit" className="signup-info-btn pointer">
              Submit
            </button>
          ) : (
            userDetails &&
            userDetails.status === "New" && (
              <div
                className={
                  isMobile ? "flex-between" : "signup-info-btns-box flex-end"
                }
              >
                <button
                  type="button"
                  className="signup-info-btns singup-info-decline pointer"
                  onClick={() => setOpenModal(true)}
                >
                  <XCircle width={20} height={20} color="#820014" />
                  Decline
                </button>
                <button
                  type="button"
                  className="signup-info-btns singup-info-approve pointer"
                  onClick={approveTradieHandler}
                >
                  <Check
                    width={20}
                    height={20}
                    color="#FFFFFF"
                    className="icon-bg-black"
                  />
                  Approve
                </button>
              </div>
            )
          )}
        </form>
        {openModal && (
          <div className="modal-decline scroll-lock">
            <form onSubmit={declineTradieHandler} className="modal-decline-box">
              <div className="mb-48">
                <h1
                  className={
                    isMobile ? "signup-info-h1 mb-8" : "signup-info-h1 mb-20"
                  }
                >
                  Decline Application
                </h1>
                <div className="signup-info-text mb-20">
                  You are about to decline the tradesperson's application.
                  Kindly provide a reason so they can prepare the necessary
                  requirements for the next attempt.
                </div>
                <div>
                  <label className="signup-info-text block mb-12">
                    Reason <span className="modal-required">(required)</span>
                  </label>
                  <textarea
                    className="modal-textarea"
                    required
                    onChange={(e) => setDeclineReason(e.target.value)}
                  />
                </div>
              </div>

              <div className={isMobile && "flex-between"}>
                <button
                  className="modal-btns pointer"
                  onClick={() => setOpenModal(false)}
                  type="button"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="modal-btns modal-black-btn pointer"
                >
                  Finish
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="loading loading-page">
        <TailSpin stroke="#1f1f23" speed={1} />
      </div>
    );
  }
};

export default TradespersonInfoForm;
