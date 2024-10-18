import React, { useEffect, useState } from "react";
import "../styles/SignUpInfo.css";
import { Check, Upload, X, XCircle } from "lucide-react";
import { updateTradieProfile } from "../action/tradieActions";
import { getUserDetails } from "../action/userActions";
import { useNavigate, useParams } from "react-router-dom";

const TradespersonInfoForm = ({ page }) => {
  const [openModal, setOpenModal] = useState(false);
  const [businessPostCode, setBusinessPostCode] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [contactNumber, setContactNumber] = useState();
  const [registeredBusinessName, setRegisteredBusinessName] = useState();
  const [australianBusinessNumber, setAustralianBusinessNumber] = useState();
  const [typeofWork, setTypeofWork] = useState();
  const [credentials, setCredentials] = useState([]);
  const [certificationFilesUploaded, setCertificationFilesUploaded] =
    useState();
  const [userDetails, setUserDetails] = useState();
  const [userInfo] = useState(JSON.parse(localStorage.getItem("userInfo")));
  const [token, setToken] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  const getUser = async () => {
    setLoading(true);
    const user = await getUserDetails(id);
    setUserDetails(user);
    console.log(user);
    setBusinessPostCode(user.businessPostCode);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setContactNumber(user.contactNumber);
    setRegisteredBusinessName(user.registeredBusinessName);
    setAustralianBusinessNumber(user.australianBusinessNumber);
    setTypeofWork(user.typeofWork);
    setCertificationFilesUploaded(user.certificationFilesUploaded);
    defaultUploadedFiles(user.certificationFilesUploaded);
    setLoading(false);
  };

  useEffect(() => {
    if (userInfo) {
      if (userInfo.role === "Admin") {
        navigate("/admin");
      } else if (userInfo.role === "Tradie") {
        if (userInfo.status === "Approved") {
          navigate(`/tradesperson/dashboard/${userInfo.userId}`);
        }
      } else {
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

    userDetails.id = id;
    userDetails.firstName = firstName;
    userDetails.lastName = lastName;
    userDetails.businessPostCode = businessPostCode;
    userDetails.contactNumber = contactNumber;
    userDetails.registeredBusinessName = registeredBusinessName;
    userDetails.australianBusinessNumber = australianBusinessNumber;
    userDetails.typeofWork = typeofWork;
    userDetails.certificationFilesUploaded = certificationFilesUploaded;

    console.log(userDetails);

    await updateTradieProfile(userDetails, token);

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
    const uploaded = [...credentials];
    const uploadedBase64 = [...certificationFilesUploaded];
    const file = e.target.files[0];

    await toBase64(file).then((res) => {
      if (!uploadedBase64.includes(file.name.replace(/\s/g, "") + " " + res)) {
        uploaded.push(file.name.replace(/\s/g, ""));
        uploadedBase64.push(file.name.replace(/\s/g, "") + " " + res);
      }
    });

    setCredentials(uploaded);
    setCertificationFilesUploaded(uploadedBase64);
  };

  const removeFile = (i) => {
    const uploaded = [...credentials];
    const uploadedBase64 = [...certificationFilesUploaded];

    uploaded.splice(i, 1);
    uploadedBase64.splice(i, 1);

    setCredentials(uploaded);
    setCertificationFilesUploaded(uploadedBase64);
  };

  const defaultUploadedFiles = (files) => {
    const uploaded = [...credentials];

    files.map((file) => {
      uploaded.push(file.split(" ")[0]);
    });

    setCredentials(uploaded);
  };

  return loading ? (
    <div>Loading</div>
  ) : (
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
          />
        </div>
        <div className="signup-info-halfw">
          <label className="signup-info-label">Main type of work you do?</label>
          <select
            className="signup-info-input singup-info-select"
            defaultValue={typeofWork}
            onChange={(e) => setTypeofWork(e.target.value)}
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
          />
        </div>
        <div className="signup-info-halfw">
          <label className="signup-info-label">Contact Number</label>
          <input
            type="text"
            className="signup-info-input"
            placeholder="+61 000 000 000"
            defaultValue={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
          />
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
          />
        </div>
        <div className="signup-info-maxw">
          <label className="signup-info-label">Registered Business Name</label>
          <input
            type="text"
            className="signup-info-input signup-info-input-maxw"
            defaultValue={registeredBusinessName}
            onChange={(e) => setRegisteredBusinessName(e.target.value)}
            required
          />
        </div>
        {page === "signup" ? (
          <div className="signup-info-maxw">
            <label className="signup-info-label">
              Upload Your Credentials (e.g., Qualifications, Licenses)
            </label>
            <label className="flex-center gap pointer" htmlFor="imageUpload">
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
              {credentials.map((credential, i) => (
                <div key={i} className="file">
                  {credential}
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
          <div className="signup-info-maxw">
            <label className="signup-info-label">Uploaded Credentials</label>
          </div>
        )}

        {page === "signup" ? (
          <button type="submit" className="signup-info-btn pointer">
            Submit
          </button>
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
      </form>
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
