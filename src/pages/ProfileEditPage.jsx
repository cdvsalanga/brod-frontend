import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import "../styles/ProfileEdit.css";
import DefaultProfilePicture from "../assets/images/default-profile-picture.png";
import { useNavigate, useParams } from "react-router-dom";
import { getUserDetails } from "../action/userActions";
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
  const [contactNumber, setContactNumber] = useState();
  const [email, setEmail] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [postalCode, setPostalCode] = useState();
  const [businessPostCode, setBusinessPostCode] = useState();
  const [proximityToWork, setProximityToWork] = useState("");
  const [businessAddress, setBusinessAddress] = useState();
  const [aboutMeDescription, setAboutMeDescription] = useState();
  const [services, setServices] = useState();
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
    setProfileDetails(userDetails);
    setProfilePicture(userDetails.profilePicture);
    setFirstName(userDetails.firstName);
    setLastName(userDetails.lastName);
    setContactNumber(userDetails.contactNumber);
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
    console.log(userDetails);
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
    profileDetails.contactNumber = contactNumber;
    profileDetails.email = email;
    profileDetails.city = city;
    profileDetails.state = state;
    profileDetails.postalCode = postalCode;
    profileDetails.callOutRate = "";
    profileDetails.businessAddress = "";

    await updateClientProfile(profileDetails, token).then(() => {
      userInfo.profilePicture = profilePicture;

      localStorage.setItem("userInfo", JSON.stringify(userInfo));

      setUpdateLoading(false);

      getProfileDetails();
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
    profileDetails.contactNumber = contactNumber;
    profileDetails.email = email;
    profileDetails.website = website;
    profileDetails.facebookAccount = facebookAccount;
    profileDetails.igAccount = igAccount;
    profileDetails.certificationFilesUploaded = certificationFilesUploaded;

    await updateTradieProfile(profileDetails, token).then(() => {
      userInfo.profilePicture = profilePicture;
      userInfo.name = firstName + " " + lastName;
      userInfo.postalCode = postalCode;
      userInfo.contactNumber = contactNumber;

      localStorage.setItem("userInfo", JSON.stringify(userInfo));

      setUpdateLoading(false);

      getProfileDetails();
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
    console.log(e.target.files[0]);
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
                  <input
                    type="text"
                    className="profile-edit-half-input profile-edit-input"
                    placeholder="+61 000 000 000"
                    defaultValue={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    disabled={updateLoading}
                  />
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
                    ? "profile-edit-btn"
                    : "profile-edit-btn pointer"
                }
              >
                {updateLoading ? (
                  <TailSpin
                    stroke="#ffffff"
                    speed={1}
                    className="icon-bg-black"
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
                  />
                </div>
                <div className="profile-edit-half">
                  <label className="block mb-12">Last Name</label>
                  <input
                    type="text"
                    className="profile-edit-half-input profile-edit-input"
                    defaultValue={lastName}
                    onChange={(e) => setLastName(e.target.value)}
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
                  />
                </div>
                <div className="profile-edit-half">
                  <label className="block mb-12">Can work within</label>
                  <select
                    defaultValue={proximityToWork}
                    className="profile-edit-select profile-edit-select-half profile-edit-input"
                    onChange={(e) => setProximityToWork(e.target.value)}
                  >
                    <option value={""} disabled hidden>
                      Select distance
                    </option>
                    <option>Asd</option>
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
                />
              </div>
              <div className="mb-32">
                <label className="block mb-12">Your Services</label>
                <select className="profile-edit-select profile-edit-select-full profile-edit-input">
                  <option>Select your service/s</option>
                </select>
              </div>
              <div className={!isMobile && "flex-between mb-32"}>
                <div className="profile-edit-half">
                  <label className="block mb-12">Contact Number</label>
                  <input
                    type="text"
                    className="profile-edit-half-input profile-edit-input"
                    defaultValue={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                  />
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
                  />
                </div>
                <div className="profile-edit-half">
                  <label className="block mb-12">Facebook Username</label>
                  <input
                    type="text"
                    className="profile-edit-half-input profile-edit-input"
                    defaultValue={facebookAccount}
                    onChange={(e) => setFacebookAccount(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-32">
                <div className="profile-edit-half">
                  <label className="block mb-12">Instagram Username</label>
                  <input
                    type="text"
                    className="profile-edit-half-input profile-edit-input"
                    defaultValue={igAccount}
                    onChange={(e) => setIgAccount(e.target.value)}
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

              <button type="submit" className="profile-edit-btn pointer">
                Save
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileEditPage;
