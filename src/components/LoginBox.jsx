import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/LogIn.css";
import { Eye, EyeOff } from "lucide-react";
import {
  getUserDetails,
  googleLoginClient,
  login,
} from "../action/userActions";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { TailSpin } from "react-loading-icons";

const LoginBox = () => {
  const [showPass, setShowPass] = useState(false);
  const [showError, setShowError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  const [loading, setLoading] = useState(false);

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
          (userInfo.contactNumber = res.contactNumber),
          (userInfo.profilePicture = res.profilePicture)
        );
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        setLoading(false);

        if (res.role === "Admin") {
          navigate("/admin");
        } else if (res.role === "Tradie") {
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
    setLoading(true);
    await login(email, password).then((err) => {
      if (err) {
        setShowError(true);
      }

      setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
    });
  };

  return (
    <div className="login-box">
      <h1 className="login-h1 mb-24">Log in</h1>
      {showError && (
        <div className="show-error mb-20">
          You have entered an invalid username or password.
        </div>
      )}
      <form onSubmit={submitHandler}>
        <label className="login-label">Email address</label>
        <input
          type="email"
          className="login-input"
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading ? true : false}
        />

        <label className="login-label">Password</label>
        <div className="pos-relative">
          <input
            type={showPass ? "text" : "password"}
            className="login-input mb-24 input-pass"
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading ? true : false}
          />
          {showPass ? (
            <Eye onClick={() => setShowPass(false)} className="show-pass" />
          ) : (
            <EyeOff onClick={() => setShowPass(true)} className="show-pass" />
          )}
        </div>

        <button
          type="submit"
          className={
            loading ? "login-button mb-24" : "login-button pointer mb-24"
          }
          disabled={loading ? true : false}
        >
          {loading ? (
            <TailSpin stroke="#ffffff" speed={1} className="icon-bg-black" />
          ) : (
            "Log in"
          )}
        </button>
      </form>
      <div className="to-signup">
        Don't have an account?{" "}
        <Link
          to={"/signup"}
          className={loading ? "signup-link link-disabled" : "signup-link"}
        >
          Sign Up
        </Link>{" "}
      </div>
      <div className="login-separator mb-32">
        <div className="login-separator-line" />
        <div>OR</div>
        <div className="login-separator-line" />
      </div>
      {/* Google and apple logins */}
      <GoogleLogin
        onSuccess={(res) => console.log(jwtDecode(res.credential))}
        onError={() => console.log("Login Failed")}
        disabled={loading ? true : false}
      />
    </div>
  );
};

export default LoginBox;
