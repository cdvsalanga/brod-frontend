import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/LogIn.css";
import { Eye, EyeOff } from "lucide-react";

const LoginBox = () => {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="login-box">
      <h1 className="login-h1">Log in</h1>
      <form>
        <label className="login-label">Email address</label>
        <input type="text" className="login-input" />

        <label className="login-label">Password</label>
        <div className="pos-relative">
          <input
            type={showPass ? "text" : "password"}
            className="login-input m-24 input-pass"
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
