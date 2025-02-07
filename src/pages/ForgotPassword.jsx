import React, { useState } from "react";
import "../styles/LogIn.css";
import Header from "../components/Header";
import { TailSpin } from "react-loading-icons";
import { forgotPassword } from "../action/userActions";

const ForgotPassword = () => {
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);

    await forgotPassword(email).then((res) => {
      if (res.message === "Request failed with status code 404") {
        setShowError(true);
        setShowSuccess(false);
        setLoading(false);
      } else if (res.message === "Password sent successfully") {
        setShowSuccess(true);
        setShowError(false);
        setLoading(false);
      }
    });
  };
  return (
    <>
      <Header />
      <div className="login-box">
        <h1 className="login-h1 mb-24">Forgot Password</h1>

        <form onSubmit={submitHandler}>
          <div className="mb-20">
            Enter your email address to receive your password.
          </div>
          {showError && (
            <div className="show-error mb-20">
              You are not registered. Please sign up to continue.
            </div>
          )}
          {showSuccess && (
            <div className="show-success mb-20">
              Your password was sent to your email.
            </div>
          )}
          <label className="login-label">Email address</label>
          <input
            type="email"
            className="login-input"
            placeholder="email@example.com"
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading ? true : false}
          />

          <button
            type="submit"
            className={
              loading ? "login-button mb-24" : "login-button pointer mb-24"
            }
            disabled={loading ? true : false}
          >
            {loading ? (
              <TailSpin
                stroke="#ffffff"
                speed={1}
                className="icon-bg-black loading-btn"
              />
            ) : (
              "Continue"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
