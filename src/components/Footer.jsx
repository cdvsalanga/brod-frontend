import React from "react";
import "../styles/Footer.css";
import logo from "../assets/logos/footer.png";
import linkedin from "../assets/logos/linkedin.svg";
import facebook from "../assets/logos/facebook.svg";

const Footer = () => {
  return (
    <footer>
      <img src={logo} className="footer-logo" />
      <div className="footer-items">
        {/* elements below */}
        <div className="footer-links">
          {/* elements 1 */}
          <div className="link">Privacy Policy</div>
          <div className="link">Terms of Use</div>
          <div className="link">Terms & Conditions</div>
          <div className="link">© Brod 2024</div>
        </div>
        <div className="footer-socials">
          {/* elements 2 */}
          <img src={linkedin} className="social-img" />
          <div className="social">Linkedin</div>
          <img src={facebook} className="social-img" />
          <div className="social">Facebook</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
