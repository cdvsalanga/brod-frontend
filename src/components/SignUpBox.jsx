import { Eye, EyeOff, Upload, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import "../styles/Signup.css";
import "../styles/SignUpInfo.css";
import { Link, useNavigate } from "react-router-dom";
import {
  clientSignup,
  getUserDetails,
  tradieSignup,
} from "../action/userActions";

const SignUpBox = ({ chosen }) => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showInfoForm, setShowInfoForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [businessPostCode, setBusinessPostCode] = useState("");
  const [work, setWork] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [registeredBusinessName, setRegisteredBusinessName] = useState("");
  const [australianBusinessNumber, setAustralianBusinessNumber] = useState("");
  const [credentials, setCredentials] = useState([]);
  const [certificationFilesUploaded, setCertificationFilesUploaded] = useState(
    []
  );
  const [role] = useState(chosen === "client" ? "Client" : "Tradie");
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      const userDetails = getUserDetails(userInfo.userId);
      userDetails.then((res) => {
        setUserInfo((userInfo.role = res.role), (userInfo.status = res.status));
        localStorage.setItem("userInfo", JSON.stringify(userInfo));

        if (res.role === "Tradie") {
          if (res.status === "Approved") {
            navigate(`/tradesperson/dashboard/${userInfo.userId}`);
          } else {
            navigate("/login/application-under-review");
          }
        } else {
          navigate("/services");
        }
      });
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      if (role === "Client") {
        await clientSignup(email, password, role);

        setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
      } else {
        setShowInfoForm(true);
      }
    } else {
      setShowError(true);
    }
  };

  const tradieSignupHandler = async (e) => {
    e.preventDefault();

    await tradieSignup(
      email,
      password,
      role,
      businessPostCode,
      firstName,
      lastName,
      contactNumber,
      registeredBusinessName,
      australianBusinessNumber,
      certificationFilesUploaded
    );

    setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const fileHandler = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleUploadFiles(chosenFiles);
  };

  const handleUploadFiles = (files) => {
    const uploaded = [...credentials];
    const uploadedBase64 = [...certificationFilesUploaded];

    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
        toBase64(file).then((res) => {
          uploadedBase64.push(res);
        });
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

  const renderFiles = () => (
    <div className="signup-files">
      {credentials.map((credential, i) => (
        <div key={i} className="signup-file">
          {credential.name}
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
  );

  if (showInfoForm) {
    return (
      <div className="signup-info-box">
        <div>
          <h1 className="signup-info-h1 mb-12">Tradesperson Information</h1>
          <div className="signup-info-text mb-32">
            We will review your application before you can post a job ad. We
            will contact you if we need further clarification.
          </div>
        </div>
        <form onSubmit={tradieSignupHandler} className="signup-info-form">
          <div className="signup-info-halfw">
            <label className="signup-info-label">Business Postcode</label>
            <input
              type="text"
              className="signup-info-input"
              placeholder="0000"
              onChange={(e) => setBusinessPostCode(e.target.value)}
              required
            />
          </div>
          <div className="signup-info-halfw">
            <label className="signup-info-label">
              Main type of work you do?
            </label>
            <select
              className="signup-info-input singup-info-select"
              value={work}
              onChange={(e) => setWork(e.target.value)}
              required
            >
              <option value={""} disabled hidden>
                Select
              </option>
              <option>Air Conditioning Installer / Supplier</option>
              <option>Antenna Intaller / Supplier</option>
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
            <div className="signup-info-choose">
              Choose one for now. You can add more later.
            </div>
          </div>
          <div className="signup-info-halfw">
            <label className="signup-info-label">First Name</label>
            <input
              type="text"
              className="signup-info-input"
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="signup-info-halfw">
            <label className="signup-info-label">Last Name</label>
            <input
              type="text"
              className="signup-info-input"
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
              onChange={(e) => setAustralianBusinessNumber(e.target.value)}
              required
            />
          </div>
          <div className="signup-info-maxw">
            <label className="signup-info-label">
              Registered Business Name{" "}
              {/* <div className="signup-info-optional">(optional)</div> */}
            </label>
            <input
              type="text"
              className="signup-info-input signup-info-input-maxw"
              onChange={(e) => setRegisteredBusinessName(e.target.value)}
              required
            />
          </div>
          <div className="signup-info-maxw">
            <label className="signup-info-label">
              Upload Your Credentials (e.g., Qualifications, Licenses){" "}
              {/* <div className="signup-info-optional">(optional)</div> */}
            </label>
            <label className="signup-info-upload" htmlFor="imageUpload">
              <Upload className="signup-info-icon" />
              Upload
            </label>
            <input
              type="file"
              multiple
              className="signup-info-rmfile"
              id="imageUpload"
              onChange={fileHandler}
            />
            {renderFiles()}
          </div>
          <button className="signup-info-btn pointer">Submit</button>
        </form>
      </div>
    );
  } else {
    return (
      <div className="signup-box">
        {chosen === "client" ? (
          <h1 className="signup-box-h1">Sign up as client</h1>
        ) : (
          <h1 className="signup-box-h1">Sign up as tradesperson</h1>
        )}
        {showError && (
          <div className="show-error mb-20">
            Password and confirm password should match.
          </div>
        )}
        <form onSubmit={submitHandler}>
          <label className="signup-label">Email address</label>
          <input
            type="email"
            className="signup-input"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="signup-label">Password</label>
          <div className="pos-relative">
            <input
              type={showPass ? "text" : "password"}
              className="signup-input"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {showPass ? (
              <Eye onClick={() => setShowPass(false)} className="show-pass" />
            ) : (
              <EyeOff onClick={() => setShowPass(true)} className="show-pass" />
            )}
          </div>

          <label className="signup-label">Confirm password</label>
          <div className="pos-relative">
            <input
              type={showConfirmPass ? "text" : "password"}
              className="signup-input"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {showConfirmPass ? (
              <Eye
                onClick={() => setShowConfirmPass(false)}
                className="show-pass"
              />
            ) : (
              <EyeOff
                onClick={() => setShowConfirmPass(true)}
                className="show-pass"
              />
            )}
          </div>
          <button type="submit" className="signup-box-btn pointer">
            Sign up
          </button>
        </form>
        <div className="to-login">
          Already have an account?{" "}
          <Link to={"/login"} className="login-link">
            Log in
          </Link>
        </div>
        <div className="signup-separator">
          <div className="signup-separator-line" />
          <div>OR</div>
          <div className="signup-separator-line" />
        </div>
      </div>
    );
  }
};

export default SignUpBox;
