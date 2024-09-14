import React, { useState } from "react";
import "../styles/SignUp.css";
import ClientIcon from "../assets/icons/client.svg";
import TradeIcon from "../assets/icons/trade.svg";
import ClientActiveIcon from "../assets/icons/client-active.svg";
import TradeActiveIcon from "../assets/icons/trade-active.svg";
import ActiveRadio from "../assets/icons/active-radio.svg";
import { Circle } from "lucide-react";
import { Link } from "react-router-dom";

const SignUpChoose = () => {
  const [chosen, setChosen] = useState("");

  return (
    <>
      <div className="signup-contents">
        <h1 className="signup-h1">Sign up as client or Tradesperson</h1>
        <div className="signup-choose">
          <div
            className={
              chosen === "client" ? "choose-box chosen-border" : "choose-box"
            }
            onClick={() => setChosen("client")}
          >
            {chosen === "client" ? (
              <img src={ClientActiveIcon} className="client-icon" />
            ) : (
              <img src={ClientIcon} className="client-icon" />
            )}

            <div className="choose-text">
              I am a client; I will hire someone.
            </div>
            {chosen === "client" ? (
              <img src={ActiveRadio} className="circle" />
            ) : (
              <Circle className="circle" />
            )}
          </div>
          <div
            className={
              chosen === "trade" ? "choose-box chosen-border" : "choose-box"
            }
            onClick={() => setChosen("trade")}
          >
            {chosen === "trade" ? (
              <img src={TradeActiveIcon} className="trade-icon" />
            ) : (
              <img src={TradeIcon} className="trade-icon" />
            )}
            <div className="choose-text">
              I am a tradesperson; I will post my service.
            </div>
            {chosen === "trade" ? (
              <img src={ActiveRadio} className="circle" />
            ) : (
              <Circle className="circle" />
            )}
          </div>
        </div>
        {chosen === "client" ? (
          <Link to={"/signup?client"} className="signup-btn-link">
            Create account as client
          </Link>
        ) : chosen === "trade" ? (
          <Link to={"/signup?tradesperson"} className="signup-btn-link">
            Create account as tradesperson
          </Link>
        ) : (
          <button className="signup-button">Create account</button>
        )}
        <div className="to-login">
          Already have an account?{" "}
          <Link to={"/login"} className="login-link">
            Log in
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignUpChoose;
