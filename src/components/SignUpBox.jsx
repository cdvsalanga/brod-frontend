import { Eye, EyeOff, Upload, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import "../styles/Signup.css";
import "../styles/SignUpInfo.css";
import { Link, useNavigate } from "react-router-dom";
import { getUserDetails, signup } from "../action/userActions";

const SignUpBox = ({ chosen }) => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [showError, setShowError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role] = useState(chosen === "client" ? "Client" : "Tradie");
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      const userDetails = getUserDetails(userInfo.userId);
      userDetails.then((res) => {
        setUserInfo(
          (userInfo.role = res.role),
          (userInfo.status = res.status),
          (userInfo.postalCode = res.postalCode),
          (userInfo.profilePicture = res.profilePicture)
        );
        localStorage.setItem("userInfo", JSON.stringify(userInfo));

        if (res.role === "Admin") {
          navigate("/admin");
        } else if (res.role === "Tradie") {
          if (res.status === "Approved") {
            navigate(`/tradesperson/dashboard/${userInfo.userId}`);
          } else {
            navigate(`/signup/${userInfo.userId}`);
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
      await signup(email, password, role);

      setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
    } else {
      setShowError(true);
    }
  };

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
};

export default SignUpBox;
