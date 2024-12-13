import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import "../styles/ProfileEdit.css";
import DefaultProfilePicture from "../assets/images/default-profile-picture.png";
import { useNavigate, useParams } from "react-router-dom";
import { addNotification, getUserDetails } from "../action/userActions";
import { updateClientProfile } from "../action/clientActions";
import { ArrowLeft, Upload, X } from "lucide-react";
import { updateTradieProfile } from "../action/tradieActions";
import { useMediaQuery } from "react-responsive";
import { TailSpin } from "react-loading-icons";

const ProfileEditPage = () => {
  const isMobile = useMediaQuery({ query: "(max-width:768px)" });

  const [userInfo] = useState(JSON.parse(localStorage.getItem("userInfo")));
  const [credentials, setCredentials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [profileDetails, setProfileDetails] = useState();
  const [token, setToken] = useState();
  const [profilePicture, setProfilePicture] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [postalCode, setPostalCode] = useState();
  const [businessPostCode, setBusinessPostCode] = useState();
  const [proximityToWork, setProximityToWork] = useState("");
  const [businessAddress, setBusinessAddress] = useState();
  const [aboutMeDescription, setAboutMeDescription] = useState();
  const [services, setServices] = useState([]);
  const [website, setWebsite] = useState();
  const [facebookAccount, setFacebookAccount] = useState();
  const [igAccount, setIgAccount] = useState();
  const [certificationFilesUploaded, setCertificationFilesUploaded] =
    useState();

  const { id } = useParams();

  const navigate = useNavigate();

  const getProfileDetails = async () => {
    setLoading(true);
    const userDetails = await getUserDetails(id);
    console.log(userDetails);
    setProfileDetails(userDetails);
    setProfilePicture(userDetails.profilePicture);
    setFirstName(userDetails.firstName);
    setLastName(userDetails.lastName);
    setContactNumber(userDetails.contactNumber.split("+61")[1]);
    setEmail(userDetails.email);
    setCity(userDetails.city);
    setState(userDetails.state);
    setPostalCode(userDetails.postalCode);
    setBusinessPostCode(userDetails.businessPostCode);
    setProximityToWork(userDetails.proximityToWork);
    setBusinessAddress(userDetails.businessAddress);
    setAboutMeDescription(userDetails.aboutMeDescription);
    setServices(userDetails.services);
    setWebsite(userDetails.website);
    setFacebookAccount(userDetails.facebookAccount);
    setIgAccount(userDetails.igAccount);
    setCertificationFilesUploaded(userDetails.certificationFilesUploaded);
    defaultUploadedFiles(userDetails.certificationFilesUploaded);

    setLoading(false);
  };

  useEffect(() => {
    if (userInfo) {
      getProfileDetails();

      setToken(userInfo.token);
    } else {
      navigate("/login");
    }
  }, []);

  const editClientProfileHandler = async (e) => {
    e.preventDefault();

    setUpdateLoading(true);

    profileDetails.profilePicture = profilePicture;
    profileDetails.firstName = firstName;
    profileDetails.lastName = lastName;
    profileDetails.contactNumber = "+61" + contactNumber;
    profileDetails.email = email;
    profileDetails.city = city;
    profileDetails.state = state;
    profileDetails.postalCode = postalCode;
    profileDetails.callOutRate = "";
    profileDetails.businessAddress = "";

    await updateClientProfile(profileDetails, token).then(async (res) => {
      if (res && res.status === 401) {
        alert("Your session expired, please login again.");
        localStorage.removeItem("userInfo");
        navigate("/login");
        return;
      }

      userInfo.role = profileDetails.role;
      userInfo.name = firstName + " " + lastName;
      userInfo.status = profileDetails.status;
      userInfo.postalCode = postalCode;
      userInfo.businessPostCode = businessPostCode;
      userInfo.contactNumber = contactNumber;
      userInfo.profilePicture = profilePicture;

      localStorage.setItem("userInfo", JSON.stringify(userInfo));

      const content = `Your account has been updated successfully.`;
      const picture = "Brod Notification Logo";
      const timeStamp = new Date().toISOString();

      await addNotification(userInfo.userId, content, picture, timeStamp).then(
        () => {
          // window.location.reload();
        }
      );
    });
  };

  const editTradieProfileHandler = async (e) => {
    e.preventDefault();

    setUpdateLoading(true);

    delete profileDetails._id;

    profileDetails.id = id;
    profileDetails.profilePicture = profilePicture;
    profileDetails.firstName = firstName;
    profileDetails.lastName = lastName;
    profileDetails.businessPostCode = businessPostCode;
    profileDetails.proximityToWork = proximityToWork;
    profileDetails.businessAddress = businessAddress;
    profileDetails.aboutMeDescription = aboutMeDescription;
    profileDetails.services = services;
    profileDetails.contactNumber = "+61" + contactNumber;
    profileDetails.email = email;
    profileDetails.website = website;
    profileDetails.facebookAccount = facebookAccount;
    profileDetails.igAccount = igAccount;
    profileDetails.city = city;
    profileDetails.state = state;
    profileDetails.postalCode = postalCode;
    profileDetails.certificationFilesUploaded = certificationFilesUploaded;
    profileDetails.lastActivity = "Edit Profile";
    profileDetails.lastActivityTimeStamp = new Date().toISOString();

    await updateTradieProfile(profileDetails, token).then(async (res) => {
      if (res && res.status === 401) {
        alert("Your session expired, please login again.");
        localStorage.removeItem("userInfo");
        navigate("/login");
        return;
      } else if (res && res.message === "Network Error") {
        alert("File too big");
        window.location.reload();
        return;
      }

      userInfo.role = profileDetails.role;
      userInfo.name = firstName + " " + lastName;
      userInfo.status = profileDetails.status;
      userInfo.postalCode = postalCode;
      userInfo.businessPostCode = businessPostCode;
      userInfo.contactNumber = contactNumber;
      userInfo.profilePicture = profilePicture;

      localStorage.setItem("userInfo", JSON.stringify(userInfo));

      const content = `Your account has been updated successfully.`;
      const picture = "Brod Notification Logo";
      const timeStamp = new Date().toISOString();

      await addNotification(userInfo.userId, content, picture, timeStamp).then(
        () => {
          // window.location.reload();
        }
      );
    });
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const updateProfilePictureHandler = (e) => {
    toBase64(e.target.files[0]).then((res) => {
      setProfilePicture(res);
    });
  };

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

  const selectServiceHandler = (e) => {
    const newServices = [...services];

    if (!newServices.includes(e.target.value)) {
      newServices.push(e.target.value);
    }
    setServices(newServices);
  };

  return (
    <div>
      {!isMobile && <Header />}
      {loading ? (
        <div className="loading loading-page">
          <TailSpin stroke="#1f1f23" speed={1} />
        </div>
      ) : (
        <div className="profile-edit">
          {isMobile ? (
            <div className="flex-center gap-8 mb-20">
              <ArrowLeft
                color="#717171"
                className="pointer"
                onClick={() => navigate(`/profile/${id}`)}
              />
              <h1 className="profile-edit-h1">Edit Profile</h1>
            </div>
          ) : (
            <h1 className="profile-edit-h1 mb-32">Edit Profile</h1>
          )}
          {profileDetails && profileDetails.role === "Client" ? (
            <form onSubmit={editClientProfileHandler}>
              <div className={isMobile ? "mb-24" : "mb-48"}>
                <img
                  src={
                    profilePicture === ""
                      ? DefaultProfilePicture
                      : profilePicture
                  }
                  width={100}
                  height={100}
                  className="profile-edit-img block mb-12"
                />
                <div className="profile-edit-pic-btns">
                  <label
                    className={
                      updateLoading
                        ? "profile-edit-update-btn profile-edit-pic-btn pointer link-disabled"
                        : "profile-edit-update-btn profile-edit-pic-btn pointer"
                    }
                    htmlFor="imageUpload"
                  >
                    Upload Picture
                  </label>
                  <input
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    className="profile-edit-file"
                    onChange={updateProfilePictureHandler}
                  />
                  <button
                    className="profile-edit-pic-btn profile-edit-remove-btn pointer"
                    onClick={() => setProfilePicture("")}
                    type="button"
                    disabled={updateLoading}
                  >
                    Remove picture
                  </button>
                </div>
              </div>
              <div className={!isMobile && "flex-between mb-32"}>
                <div className="profile-edit-half">
                  <label className="block mb-12">First Name</label>
                  <input
                    type="text"
                    className="profile-edit-half-input profile-edit-input"
                    defaultValue={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    disabled={updateLoading}
                  />
                </div>
                <div className="profile-edit-half">
                  <label className="block mb-12">Last Name</label>
                  <input
                    type="text"
                    className="profile-edit-half-input profile-edit-input"
                    defaultValue={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    disabled={updateLoading}
                  />
                </div>
              </div>
              <div className={!isMobile && "flex-between mb-32"}>
                <div className="profile-edit-half">
                  <label className="block mb-12">Contact Number</label>
                  <div className="flex-center gap-8">
                    <input
                      type="text"
                      value={"+61"}
                      disabled
                      className="profile-edit-input-contact"
                    />
                    <input
                      type="tel"
                      pattern="[0-9]{9}"
                      className="profile-edit-input-contact profile-edit-input-contact-num"
                      placeholder="000000000"
                      defaultValue={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      disabled={updateLoading}
                    />
                  </div>
                </div>
                <div className="profile-edit-half">
                  <label className="block mb-12">
                    Email Address <span>(optional)</span>
                  </label>
                  <input
                    type="email"
                    className="profile-edit-half-input profile-edit-input"
                    placeholder="@email.com"
                    defaultValue={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={updateLoading}
                  />
                </div>
              </div>
              <div className={!isMobile && "flex-between mb-32"}>
                <div className="profile-edit-half">
                  <label className="block mb-12">City</label>
                  <input
                    type="text"
                    className="profile-edit-half-input profile-edit-input"
                    defaultValue={city}
                    onChange={(e) => setCity(e.target.value)}
                    disabled={updateLoading}
                  />
                </div>
                <div className="profile-edit-half">
                  <label className="block mb-12">State</label>
                  <input
                    type="text"
                    className="profile-edit-half-input profile-edit-input"
                    defaultValue={state}
                    onChange={(e) => setState(e.target.value)}
                    disabled={updateLoading}
                  />
                </div>
              </div>
              <div className={isMobile ? "mb-36" : "mb-48"}>
                <label className="block mb-12">Postal Code</label>
                <input
                  type="text"
                  className="profile-edit-full-input profile-edit-input"
                  placeholder="0000"
                  defaultValue={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  disabled={updateLoading}
                />
              </div>
              <button
                type="submit"
                className={
                  updateLoading
                    ? "profile-edit-btn link-disabled"
                    : "profile-edit-btn pointer"
                }
              >
                {updateLoading ? (
                  <TailSpin
                    stroke="#ffffff"
                    speed={1}
                    className="icon-bg-black loading-btn"
                  />
                ) : (
                  "Save"
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={editTradieProfileHandler}>
              <div className={isMobile ? "mb-24" : "mb-48"}>
                <img
                  src={
                    profilePicture === ""
                      ? DefaultProfilePicture
                      : profilePicture
                  }
                  width={100}
                  height={100}
                  className="profile-edit-img block mb-12"
                />
                <div className="profile-edit-pic-btns">
                  <label
                    className="profile-edit-update-btn profile-edit-pic-btn pointer"
                    htmlFor="profilePictureUpload"
                  >
                    Upload Picture
                  </label>
                  <input
                    type="file"
                    id="profilePictureUpload"
                    accept="image/*"
                    className="profile-edit-file"
                    onChange={updateProfilePictureHandler}
                  />
                  <button
                    className="profile-edit-pic-btn profile-edit-remove-btn pointer"
                    onClick={() => setProfilePicture("")}
                    type="button"
                  >
                    Remove picture
                  </button>
                </div>
              </div>
              <div className={!isMobile && "flex-between mb-32"}>
                <div className="profile-edit-half">
                  <label className="block mb-12">First Name</label>
                  <input
                    type="text"
                    className="profile-edit-half-input profile-edit-input"
                    defaultValue={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    disabled={updateLoading}
                  />
                </div>
                <div className="profile-edit-half">
                  <label className="block mb-12">Last Name</label>
                  <input
                    type="text"
                    className="profile-edit-half-input profile-edit-input"
                    defaultValue={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    disabled={updateLoading}
                  />
                </div>
              </div>
              <div className={!isMobile && "flex-between mb-32"}>
                <div className="profile-edit-half">
                  <label className="block mb-12">Business Postcode</label>
                  <input
                    type="text"
                    className="profile-edit-half-input profile-edit-input"
                    placeholder="0000"
                    defaultValue={businessPostCode}
                    onChange={(e) => setBusinessPostCode(e.target.value)}
                    disabled={updateLoading}
                  />
                </div>
                <div className="profile-edit-half">
                  <label className="block mb-12">Can work within</label>
                  <select
                    defaultValue={proximityToWork}
                    className="profile-edit-select profile-edit-select-half profile-edit-input"
                    onChange={(e) => setProximityToWork(e.target.value)}
                    disabled={updateLoading}
                  >
                    <option value={""} disabled hidden>
                      Select distance
                    </option>
                    <option value={"Can work within 1km"}>1km</option>
                    <option value={"Can work within 5km"}>5km</option>
                    <option value={"Can work within 10km"}>10km</option>
                    <option value={"Can work within 25km"}>25km</option>
                    <option value={"Can work within 50km"}>50km</option>
                  </select>
                </div>
              </div>
              <div className="mb-32">
                <label className="block mb-12">
                  Business Address{" "}
                  <span className="profile-edit-optional">(optional)</span>
                </label>
                <input
                  type="text"
                  className="profile-edit-full-input profile-edit-input"
                  defaultValue={businessAddress}
                  onChange={(e) => setBusinessAddress(e.target.value)}
                  disabled={updateLoading}
                />
              </div>
              <div className="mb-32">
                <label className="block mb-12">
                  About Me{" "}
                  <span className="profile-edit-optional">(optional)</span>
                </label>
                <textarea
                  className="profile-edit-full-input profile-edit-input profile-edit-textarea"
                  placeholder="Enter a short introduction and describe what you do."
                  defaultValue={aboutMeDescription}
                  onChange={(e) => setAboutMeDescription(e.target.value)}
                  disabled={updateLoading}
                />
              </div>
              <div className="mb-32">
                <label className="block mb-12">Your Services</label>

                <select
                  defaultValue={""}
                  className="profile-edit-select profile-edit-select-full profile-edit-input mb-12"
                  onChange={(e) => selectServiceHandler(e)}
                  disabled={updateLoading}
                >
                  <option value={""} disabled hidden>
                    Select your service/s
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
                <div className="profile-edit-services">
                  {services.length > 0 &&
                    services.map((service, i) => (
                      <span
                        key={i}
                        className="profile-edit-service flex-center gap-4"
                      >
                        {service}
                        {i !== 0 && (
                          <X
                            width={20}
                            height={20}
                            className="profile-edit-service-remove pointer"
                            onClick={() => {
                              const newServices = [...services];
                              newServices.splice(i, 1);
                              setServices(newServices);
                            }}
                          />
                        )}
                      </span>
                    ))}
                </div>
              </div>
              <div className={!isMobile && "flex-between mb-32"}>
                <div className="profile-edit-half">
                  <label className="block mb-12">Contact Number</label>
                  <div className="flex-center gap-8">
                    <input
                      type="text"
                      value={"+61"}
                      disabled
                      className="profile-edit-input-contact"
                    />
                    <input
                      type="tel"
                      pattern="[0-9]{9}"
                      className="profile-edit-input-contact profile-edit-input-contact-num"
                      placeholder="000000000"
                      defaultValue={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      disabled={updateLoading}
                    />
                  </div>
                </div>
                <div className="profile-edit-half">
                  <label className="block mb-12">
                    Email Address{" "}
                    <span className="profile-edit-optional">(optional)</span>
                  </label>
                  <input
                    type="text"
                    className="profile-edit-half-input profile-edit-input"
                    placeholder="@email.com"
                    defaultValue={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={updateLoading}
                  />
                </div>
              </div>
              <div className={!isMobile && "flex-between mb-32"}>
                <div className="profile-edit-half">
                  <label className="block mb-12">
                    Website{" "}
                    <span className="profile-edit-optional">(optional)</span>
                  </label>
                  <input
                    type="text"
                    className="profile-edit-half-input profile-edit-input"
                    placeholder="www.website.com"
                    defaultValue={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    disabled={updateLoading}
                  />
                </div>
                <div className="profile-edit-half">
                  <label className="block mb-12">Facebook Username</label>
                  <input
                    type="text"
                    className="profile-edit-half-input profile-edit-input"
                    defaultValue={facebookAccount}
                    onChange={(e) => setFacebookAccount(e.target.value)}
                    disabled={updateLoading}
                  />
                </div>
              </div>
              <div className={!isMobile && "flex-between mb-32"}>
                <div className="profile-edit-half">
                  <label className="block mb-12">Instagram Username</label>
                  <input
                    type="text"
                    className="profile-edit-half-input profile-edit-input"
                    defaultValue={igAccount}
                    onChange={(e) => setIgAccount(e.target.value)}
                    disabled={updateLoading}
                  />
                </div>
                <div className="profile-edit-half">
                  <label className="block mb-12">City</label>
                  <input
                    type="text"
                    className="profile-edit-half-input profile-edit-input"
                    defaultValue={city}
                    onChange={(e) => setCity(e.target.value)}
                    disabled={updateLoading}
                  />
                </div>
              </div>
              <div className={!isMobile && "flex-between mb-32"}>
                <div className="profile-edit-half">
                  <label className="block mb-12">State</label>
                  <input
                    type="text"
                    className="profile-edit-half-input profile-edit-input"
                    defaultValue={state}
                    onChange={(e) => setState(e.target.value)}
                    disabled={updateLoading}
                  />
                </div>
                <div className="profile-edit-half">
                  <label className="block mb-12">Postal Code</label>
                  <input
                    type="text"
                    className="profile-edit-half-input profile-edit-input"
                    defaultValue={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    disabled={updateLoading}
                  />
                </div>
              </div>
              <div className={isMobile ? "mb-36" : "mb-48"}>
                <label className="block mb-12">
                  Upload Your Credentials (e.g., Qualifications, Licenses){" "}
                  <span className="profile-edit-optional">(optional)</span>
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

              <button
                type="submit"
                className={
                  updateLoading
                    ? "profile-edit-btn link-disabled"
                    : "profile-edit-btn pointer"
                }
              >
                {updateLoading ? (
                  <TailSpin
                    stroke="#ffffff"
                    speed={1}
                    className="icon-bg-black loading-btn"
                  />
                ) : (
                  "Save"
                )}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileEditPage;
