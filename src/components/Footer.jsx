import React from "react";
import "../styles/Footer.css";
import logo from "../assets/logos/footer.png";
import linkedin from "../assets/logos/linkedin.svg";
import facebook from "../assets/logos/facebook.svg";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

const Footer = () => {
  const isMobile = useMediaQuery({ query: "(max-width:768px)" });
  return (
    <footer>
      <div className="footer">
        <img src={logo} className="footer-logo" />
        <div className="footer-items">
          <div className="footer-links">
            <Link to={"/privacy-policy"} className="link link-none">
              Privacy Policy
            </Link>
            <div className="link">Terms of Use</div>
            <Link
              to={`/terms-and-conditions/client`}
              className="link link-none"
            >
              Terms & Conditions
            </Link>
            {!isMobile && (
              <div className="link link-copyright">© Brod 2024</div>
            )}
          </div>
          <div className="footer-socials">
            <img src={linkedin} className="social-img" />
            <div className="social">Linkedin</div>
            <img src={facebook} className="social-img" />
            <div className="social">Facebook</div>
          </div>
          {isMobile && <div className="link link-copyright">© Brod 2024</div>}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
