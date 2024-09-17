import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/LogIn.css";
import { Eye, EyeOff } from "lucide-react";
import { login } from "../action/userAction";
import { useNavigate } from "react-router-dom";

const LoginBox = () => {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userInfo, setUserInfo] = useState(localStorage.getItem("userInfo"));

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/services");
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    await login(email, password);

    setUserInfo(localStorage.getItem("userInfo"));
  };

  return (
    <div className="login-box">
      <h1 className="login-h1">Log in</h1>
      <form onSubmit={submitHandler}>
        <label className="login-label">Email address</label>
        <input
          type="text"
          className="login-input"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="login-label">Password</label>
        <div className="pos-relative">
          <input
            type={showPass ? "text" : "password"}
            className="login-input m-24 input-pass"
            onChange={(e) => setPassword(e.target.value)}
          />
          {showPass ? (
            <Eye onClick={() => setShowPass(false)} className="show-pass" />
          ) : (
            <EyeOff onClick={() => setShowPass(true)} className="show-pass" />
          )}
        </div>

        <button type="submit" className="login-button m-24">
          Log in
        </button>
      </form>
      <div className="to-signup">
        Don't have an account?{" "}
        <Link to={"/signup"} className="signup-link">
          Sign Up
        </Link>{" "}
      </div>
      <div className="login-separator">
        <div className="login-separator-line" />
        <div>OR</div>
        <div className="login-separator-line" />
      </div>
      {/* Google and apple logins */}
    </div>
  );
};

export default LoginBox;
