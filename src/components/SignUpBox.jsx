import { Circle, Eye, EyeOff, Mail, Phone, Upload, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import "../styles/SignUp.css";
import "../styles/SignUpInfo.css";
import { Link, useNavigate } from "react-router-dom";
import {
  checkEmail,
  emailOtp,
  emailVerifyOtp,
  getUserDetails,
  signup,
  smsOtp,
  smsVerifyOtp,
  ssoClient,
  ssoLoginCommon,
  ssoTradie,
} from "../action/userActions";
import ActiveRadio from "../assets/icons/active-radio.svg";
import OTPInput from "react-otp-input";
// import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { TailSpin } from "react-loading-icons";
// import GoogleIcon from "../assets/icons/google.svg";
import axios from "axios";
import ReactPasswordChecklist from "react-password-checklist";

const SignUpBox = ({ chosen }) => {
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const [page, setPage] = useState("signup");
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showOtpError, setShowOtpError] = useState(false);
  const [passCheck, setPassCheck] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  const [updateChecked, setUpdateChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [businessPostCode, setBusinessPostCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [contactNums, setContactNums] = useState("");
  const [registeredBusinessName, setRegisteredBusinessName] = useState("");
  const [australianBusinessNumber, setAustralianBusinessNumber] = useState("");
  const [typeofWork, setTypeofWork] = useState("");
  const [certificationFilesUploaded, setCertificationFilesUploaded] = useState(
    []
  );
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [role] = useState(chosen === "client" ? "Client" : "Tradie");
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  const [chosenOTP, setChosenOTP] = useState();
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      const userDetails = getUserDetails(userInfo.userId);
      userDetails.then((res) => {
        setUserInfo(
          (userInfo.role = res.role),
          (userInfo.name = res.firstName + " " + res.lastName),
          (userInfo.status = res.status),
          (userInfo.postalCode = res.postalCode),
          (userInfo.businessPostCode = res.businessPostCode),
          (userInfo.contactNumber = res.contactNumber),
          (userInfo.profilePicture = res.profilePicture)
        );
        localStorage.setItem("userInfo", JSON.stringify(userInfo));

        if (res.role === "Admin") {
          navigate("/admin");
        } else if (res.role === "Tradie") {
          if (res.status === "Approved") {
            navigate(`/tradesperson/dashboard/${userInfo.userId}`);
          } else {
            navigate("/login/application-under-review");
          }
        } else if (res.role === "Client") {
          navigate(`/services`);
        }
      });
    }
  }, [userInfo]);

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

  const verifyOtpHandler = async (e) => {
    e.preventDefault();

    setLoading(true);

    let status = "New";

    if (chosen === "client") {
      status = "Approved";
    }

    const services = [typeofWork];

    const timeStamp = new Date().toISOString();

    if (chosenOTP === "sms") {
      await smsVerifyOtp(contactNumber, otp).then(async (res) => {
        if (res && res.status !== 200) {
          setShowOtpError(true);
        } else {
          await signup(
            email,
            password,
            role,
            businessPostCode,
            firstName,
            lastName,
            contactNumber,
            city,
            state,
            postalCode,
            registeredBusinessName,
            australianBusinessNumber,
            typeofWork,
            status,
            services,
            certificationFilesUploaded,
            timeStamp
          ).then((res) => {
            if (res && res.status === 400) {
              alert(res.message);
              window.location.reload;
            }
            setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
          });
        }
        setLoading(false);
      });
    } else {
      await emailVerifyOtp(email, otp).then(async (res) => {
        if (res && res.status !== 200) {
          setShowOtpError(true);
        } else {
          await signup(
            email,
            password,
            role,
            businessPostCode,
            firstName,
            lastName,
            contactNumber,
            city,
            state,
            postalCode,
            registeredBusinessName,
            australianBusinessNumber,
            typeofWork,
            status,
            services,
            certificationFilesUploaded,
            timeStamp
          ).then((res) => {
            if (res && res.status === 400) {
              alert(res.message);
              window.location.reload();
            }
            setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
          });
        }
        setLoading(false);
      });
    }
  };

  const signupHandler = async (e) => {
    e.preventDefault();

    setSignupLoading(true);

    // const services = [typeofWork];

    // const timeStamp = new Date().toISOString();

    // await signup(
    //   email,
    //   password,
    //   role,
    //   businessPostCode,
    //   firstName,
    //   lastName,
    //   contactNumber,
    //   city,
    //   state,
    //   postalCode,
    //   registeredBusinessName,
    //   australianBusinessNumber,
    //   typeofWork,
    //   services,
    //   certificationFilesUploaded,
    //   timeStamp
    // ).then((res) => {
    //   if (res && res.status === 400) {
    //     alert(res.message);
    //     window.location.reload;
    //   }
    //   setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
    // });

    await checkEmail(email).then((res) => {
      if (res.status === 400 && res.response.data === "Email already used!") {
        setShowError(true);
        setSignupLoading(false);
      } else if (res === "Email not used.") {
        if (chosen === "client") {
          setPage("clientDetails");
        } else {
          setPage("tradieDetails");
        }
      }
    });

    // if (password === confirmPassword) {
    //   if (chosen === "client") {
    //     setPage("clientDetails");
    //   } else {
    //     setPage("tradieDetails");
    //   }
    // } else {
    //   setShowError(true);
    // }
  };

  // const googleLoginHandler = async (res) => {
  //   setLoading(true);

  //   if (chosen === "client") {
  //     await ssoLoginCommon(
  //       res.email,
  //       res.verified_email.toString(),
  //       res.name,
  //       res.picture,
  //       res.given_name,
  //       res.family_name
  //     ).then(async (data) => {
  //       if (data === "Please sign up as a new user") {
  //         await ssoClient(
  //           res.email,
  //           res.verified_email.toString(),
  //           res.name,
  //           res.picture,
  //           res.given_name,
  //           res.family_name
  //         ).then((data) => {
  //           setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
  //         });
  //       } else {
  //         alert("User already exists");
  //         window.location.reload();
  //         return;
  //       }
  //     });
  //   } else {
  //     await ssoLoginCommon(
  //       res.email,
  //       res.verified_email.toString(),
  //       res.name,
  //       res.picture,
  //       res.given_name,
  //       res.family_name
  //     ).then(async (data) => {
  //       if (data === "Please sign up as a new user") {
  //         await ssoTradie(
  //           res.email,
  //           res.verified_email.toString(),
  //           res.name,
  //           res.picture,
  //           res.given_name,
  //           res.family_name
  //         ).then((data) => {
  //           data.role = "Tradie";
  //           data.status = "New";
  //           localStorage.setItem("userInfo", JSON.stringify(data));
  //           navigate(`/signup/${data.userId}`);
  //         });
  //       } else {
  //         alert("User already exists");
  //         window.location.reload();
  //         return;
  //       }
  //     });
  //   }
  // };

  // const googleLogin = useGoogleLogin({
  //   onSuccess: (tokenResponse) => {
  //     axios
  //       .get(
  //         `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenResponse.access_token}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${tokenResponse.access_token}`,
  //             Accept: "application/json",
  //           },
  //         }
  //       )
  //       .then(async (res) => {
  //         googleLoginHandler(res.data);
  //       })
  //       .catch((err) => console.log(err));
  //   },
  //   onError: () => alert("Login Failed"),
  // });

  const detailsHandler = (e) => {
    e.preventDefault();

    setContactNumber("+61" + contactNums);
    setPage("otpChoose");
  };

  const resendHandler = async () => {
    setResendLoading(true);
    if (chosenOTP === "email") {
      await emailOtp(email).then(() => {
        setResendLoading(false);
      });
    } else {
      await smsOtp(contactNumber).then(() => {
        setResendLoading(false);
      });
    }
  };

  if (page === "signup") {
    return (
      <div className="signup-box">
        {chosen === "client" ? (
          <h1 className="signup-box-h1">Sign up as client</h1>
        ) : (
          <h1 className="signup-box-h1">Sign up as tradesperson</h1>
        )}
        {showError && (
          <div className="show-error mb-20">User already exists.</div>
        )}
        <form onSubmit={signupHandler}>
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
              className="signup-input mb-24"
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
          <ReactPasswordChecklist
            rules={["minLength", "specialChar", "number", "capital", "match"]}
            minLength={6}
            value={password}
            valueAgain={confirmPassword}
            onChange={(isValid) => {
              if (isValid) {
                setPassCheck(true);
              } else {
                setPassCheck(false);
              }
            }}
          />
          <div className="signup-checkbox-container signup-mt">
            <input
              type="checkbox"
              defaultChecked={false}
              onChange={(e) => {
                if (e.target.checked) {
                  setTermsChecked(true);
                } else {
                  setTermsChecked(false);
                }
              }}
              className="checkbox"
            />
            {/* <div className="signup-checkbox-text">
              I have read and agree to Brod&#39;s{" "}
              <span
                className="signup-blue-text"
                onClick={() => {
                  if (chosen === "client") {
                    setShowTermsClient(true);
                  } else {
                    setShowTermsTradie(true);
                  }
                }}
              >
                Terms and Conditions
              </span>{" "}
              and{" "}
              <span
                className="signup-blue-text"
                onClick={() => setShowPolicy(true)}
              >
                Privacy Policy
              </span>{" "}
              and understand how my personal information will be collected and
              used.
            </div> */}
            <div className="signup-checkbox-text">
              I have read and agree to Brod&#39;s{" "}
              <Link
                to={`/terms-and-conditions/${chosen}`}
                className="signup-link-text"
              >
                Terms and Conditions
              </Link>{" "}
              and{" "}
              <Link to={"/privacy-policy"} className="signup-link-text">
                Privacy Policy
              </Link>{" "}
              and understand how my personal information will be collected and
              used.
            </div>
          </div>
          <div className="signup-checkbox-container">
            <input
              type="checkbox"
              defaultChecked={false}
              onChange={(e) => {
                if (e.target.checked) {
                  setConsentChecked(true);
                } else {
                  setConsentChecked(false);
                }
              }}
              className="checkbox"
            />
            <div className="signup-checkbox-text">
              I consent to receiving essential service notifications via email.
            </div>
          </div>
          <div className="signup-checkbox-container">
            <input
              type="checkbox"
              defaultChecked={false}
              onChange={(e) => {
                if (e.target.checked) {
                  setUpdateChecked(true);
                } else {
                  setUpdateChecked(false);
                }
              }}
              className="checkbox"
            />
            <div className="signup-checkbox-text">
              I would like to receive updates about new features and platform
              improvements. <span className="signup-optional">(optional)</span>
            </div>
          </div>
          <button
            type="submit"
            className={
              !signupLoading && passCheck && termsChecked && consentChecked
                ? "signup-box-btn pointer"
                : "signup-box-btn signup-box-btn-disable link-disabled"
            }
            disabled={
              !signupLoading && passCheck && termsChecked && consentChecked
                ? false
                : true
            }
          >
            {signupLoading ? (
              <TailSpin
                stroke="#ffffff"
                speed={1}
                className="icon-bg-gray loading-btn"
              />
            ) : (
              "Sign up"
            )}
          </button>
        </form>
        <div className="to-login">
          Already have an account?{" "}
          <Link to={"/login"} className="login-link">
            Log in
          </Link>
        </div>

        {/* <div className="signup-separator">
          <div className="signup-separator-line" />
          <div>OR</div>
          <div className="signup-separator-line" />
        </div>
        <button
          type="button"
          className="google-login"
          onClick={() => googleLogin()}
        >
          <img src={GoogleIcon} />
          Sign up with Google
        </button> */}
      </div>
    );
  } else if (page === "clientDetails") {
    return (
      <div className="signup-info-box">
        <h1 className="signup-info-h1-client">Client Information</h1>
        <form onSubmit={detailsHandler} className="signup-info-form">
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
                placeholder="000000000"
                onChange={(e) => setContactNums(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="signup-info-halfw">
            <label className="signup-info-label">City</label>
            <input
              type="text"
              className="signup-info-input"
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div className="signup-info-halfw">
            <label className="signup-info-label">State</label>
            <input
              type="text"
              className="signup-info-input"
              onChange={(e) => setState(e.target.value)}
              required
            />
          </div>
          <div className="signup-info-halfw">
            <label className="signup-info-label">Postal Code</label>
            <input
              type="text"
              className="signup-info-input"
              placeholder="0000"
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="signup-info-btn pointer">
            Submit
          </button>
        </form>
      </div>
    );
  } else if (page === "tradieDetails") {
    return (
      <div className="signup-info-box">
        <div>
          <h1 className="signup-info-h1">Tradesperson Information</h1>
          <div className="signup-info-text">
            We will review your application before you can post a job ad. We
            will contact you if we need further clarification.
          </div>
        </div>
        <form onSubmit={detailsHandler} className="signup-info-form">
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
              className="signup-info-input signup-info-select pointer"
              defaultValue={""}
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
                placeholder="000000000"
                onChange={(e) => setContactNums(e.target.value)}
                required
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
              onChange={(e) => setAustralianBusinessNumber(e.target.value)}
              required
            />
          </div>
          <div className="signup-info-halfw">
            <label className="signup-info-label">
              Registered Business Name
            </label>
            <input
              type="text"
              className="signup-info-input"
              onChange={(e) => setRegisteredBusinessName(e.target.value)}
              required
            />
          </div>
          <div className="signup-info-halfw">
            <label className="signup-info-label">City</label>
            <input
              type="text"
              className="signup-info-input"
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div className="signup-info-halfw">
            <label className="signup-info-label">State</label>
            <input
              type="text"
              className="signup-info-input"
              onChange={(e) => setState(e.target.value)}
              required
            />
          </div>
          <div className="signup-info-halfw">
            <label className="signup-info-label">Postal Code</label>
            <input
              type="text"
              className="signup-info-input"
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </div>
          <div className="signup-info-maxw">
            <label className="signup-info-label">
              Upload Your Credentials (e.g., Qualifications, Licenses)
            </label>
            <label className="flex-center gap-8 pointer" htmlFor="imageUpload">
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
              {certificationFilesUploaded.map((file, i) => (
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

          <button type="submit" className="signup-info-btn pointer">
            Submit
          </button>
        </form>
      </div>
    );
  } else if (page === "otpChoose") {
    return (
      <>
        <div className="signup-contents">
          <h1 className="signup-h1">
            Verify your account through Email or SMS
          </h1>
          <div className="signup-choose">
            <div
              className={
                chosenOTP === "email"
                  ? "choose-box chosen-border"
                  : "choose-box"
              }
              onClick={() => setChosenOTP("email")}
            >
              {chosenOTP === "email" ? (
                <Mail width={60} height={60} color="#1F1F23" className="mb-8" />
              ) : (
                <Mail width={60} height={60} color="#8C8C8C" className="mb-8" />
              )}

              <div className="choose-text">
                Verify account through email address.
              </div>
              {chosenOTP === "email" ? (
                <img src={ActiveRadio} className="circle" />
              ) : (
                <Circle className="circle" />
              )}
            </div>
            <div
              className={
                chosenOTP === "sms" ? "choose-box chosen-border" : "choose-box"
              }
              onClick={() => setChosenOTP("sms")}
            >
              {chosenOTP === "sms" ? (
                <Phone
                  width={60}
                  height={60}
                  color="#1F1F23"
                  className="mb-8"
                />
              ) : (
                <Phone
                  width={60}
                  height={60}
                  color="#8C8C8C"
                  className="mb-8"
                />
              )}
              <div className="choose-text">
                Verify account through phone number.
              </div>
              {chosenOTP === "sms" ? (
                <img src={ActiveRadio} className="circle" />
              ) : (
                <Circle className="circle" />
              )}
            </div>
          </div>
          {loading ? (
            <button className="signup-otp-btn link-disabled">
              <TailSpin
                stroke="#ffffff"
                speed={1}
                className="icon-bg-black loading-btn"
              />
            </button>
          ) : chosenOTP === "email" ? (
            <button
              type="button"
              className="signup-otp-btn pointer"
              onClick={async () => {
                setLoading(true);
                await emailOtp(email).then((res) => {
                  setLoading(false);
                  setPage("otp");
                });
              }}
            >
              Get OTP in email address
            </button>
          ) : chosenOTP === "sms" ? (
            <button
              type="button"
              className="signup-otp-btn pointer"
              onClick={async () => {
                setLoading(true);
                await smsOtp(contactNumber).then((res) => {
                  setLoading(false);
                  setPage("otp");
                });
              }}
            >
              Get OTP in phone number
            </button>
          ) : (
            <button type="button" className="signup-button link-disabled">
              Choose to get OTP
            </button>
          )}
        </div>
      </>
    );
  } else {
    return (
      <form className="signup-box signup-otp">
        <h1 className="signup-box-h1 signup-otp-h1">OTP Verification</h1>
        {showOtpError && (
          <div className="show-error mb-20">You have entered wrong otp.</div>
        )}
        <label className="signup-otp-label mb-16">
          Enter OTP Code sent to{" "}
          <span className="signup-otp-chosen">
            {chosenOTP === "email" ? email : contactNumber}
          </span>
          .
        </label>
        <OTPInput
          containerStyle={"flex-between"}
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span className="signup-otp-separator" />}
          renderInput={(props) => {
            props.style.width = "48.4px";
            return <input {...props} className="signup-otp-input mb-24" />;
          }}
          required
        />
        <div className="mb-12">
          Didn't receive OTP code?{" "}
          {resendLoading ? (
            <TailSpin stroke="#1f1f23" speed={1} className="loading-btn" />
          ) : (
            <span className="signup-otp-resend pointer" onClick={resendHandler}>
              Resend Code
            </span>
          )}
        </div>
        {loading ? (
          <button type="button" className="signup-otp-btn link-disabled">
            <TailSpin
              stroke="#ffffff"
              speed={1}
              className="icon-bg-black loading-btn"
            />
          </button>
        ) : (
          <button
            type="submit"
            className="signup-otp-btn pointer"
            onClick={verifyOtpHandler}
          >
            Verify
          </button>
        )}
      </form>
    );
  }
};

export default SignUpBox;
