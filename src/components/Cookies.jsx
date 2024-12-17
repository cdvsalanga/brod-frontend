import React, { useState } from "react";
import "../styles/Cookies.css";
import { Cookie, X } from "lucide-react";

const Cookies = (showCookies) => {
  const [isCookies, setIsCookies] = useState(showCookies);
  if (isCookies) {
    return (
      <div className="cookies cookies-color">
        <h2 className="flex-center gap-8 cookies-color mb-24">
          <Cookie
            width={32}
            height={32}
            color="#1f1f23"
            fill="#FFFFFF"
            className="cookies-color"
          />
          Cookies Consent
        </h2>
        <div className="cookies-color mb-24">
          We use cookies to improve your experience on Brod.
        </div>
        <div className="cookies-color flex-center gap-12">
          <button
            className="cookies-btn pointer"
            onClick={() => {
              document.cookie = "cookieBy= Brod; max-age=" + 60 * 60 * 24 * 30;
              setIsCookies(false);
            }}
          >
            Accept
          </button>
          <button
            className="cookies-btn pointer"
            onClick={() => setIsCookies(false)}
          >
            Decline
          </button>
        </div>
        <X
          color="#FFFFFF"
          fill="#1F1F23"
          className="cookies-color cookies-close pointer"
          onClick={() => setIsCookies(false)}
        />
      </div>
    );
  }
};

export default Cookies;
