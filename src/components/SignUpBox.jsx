import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUpBox = ({ chosen }) => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  return (
    <div className="signup-box">
      {chosen === "client" ? (
        <h1 className="signup-box-h1">Sign up as client</h1>
      ) : (
        <h1 className="signup-box-h1">Sign up as tradesperson</h1>
      )}
      <form>
        <label className="signup-label">Email address</label>
        <input type="text" className="signup-input" />

        <label className="signup-label">Password</label>
        <div className="pos-relative">
          <input
            type={showPass ? "text" : "password"}
            className="signup-input"
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
        <Link to={"/signup/1"}>
          <button type="submit" className="signup-box-btn">
            Sign up
          </button>
        </Link>
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
