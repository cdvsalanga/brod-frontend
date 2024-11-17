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
      setLoading(true);
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
        setLoading(false);
        if (res.isSuspended) {
          alert(
            `You are suspended for ${res.weeksSuspended} ${
              res.weeksSuspended === 1 ? "week" : "weeks"
            }. Please contact us if you have concerns.`
          );
          localStorage.removeItem("userInfo");
          navigate("/");
          return;
        } else if (res.status === "Declined") {
          alert(
            `You are declined by the admin. Please contact us if you have concerns.`
          );
          localStorage.removeItem("userInfo");
          navigate("/");
          return;
        }
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

  const googleLoginHandler = async (res) => {
    console.log(res);

    setLoading(true);

    await googleLoginClient(
      res.email,
      res.email_verified.toString(),
      res.name,
      res.picture,
      res.given_name,
      res.family_name
    ).then((res) => {
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
      {/* <div className="login-separator mb-32">
        <div className="login-separator-line" />
        <div>OR</div>
        <div className="login-separator-line" />
      </div> */}
      {/* Google and apple logins */}
      {/* <GoogleLogin
        onSuccess={(res) => {
          console.log(res);
          googleLoginHandler(jwtDecode(res.credential));
        }}
        onError={() => alert("Login Failed")}
        disabled={loading}
      /> */}
    </div>
  );
};

export default LoginBox;
