import React from "react";
import "./Footer.css";

export default class Footer extends React.Component {
  render() {
    return (
      <div>
        <footer className="footerdiv">
          <div className="waves">
            <div className="wave" id="wave1"></div>
            <div className="wave" id="wave2"></div>
            <div className="wave" id="wave3"></div>
            <div className="wave" id="wave4"></div>
          </div>

          <footer className="footer-distributed">
            <div className="footer-left">
              <h3>
                Rebel<span>Skool</span>
              </h3>
              <p className="footer-links">
                <a href="/" className="link-1">
                  Home
                </a>
                <a href="/">Blog</a>
                <a href="/">Pricing</a>
                <a href="/">About</a>
                <a href="/">Faq</a>
                <a href="/">Contact</a>
              </p>

              <p className="footer-company-name">RebelSkool llc © 2021</p>
            </div>

            <div class="footer-center">
              <div>
                <i class="fa fa-map-marker"></i>
                <p>
                  <span>444 S. Cedros Ave</span>Borås, Sweden
                </p>
              </div>

              <div>
                <i class="fa fa-phone"></i>
                <p>+46 72-151 17 71</p>
              </div>

              <div>
                <i class="fa fa-envelope"></i>
                <p>
                  <a href="mailto:support@company.com">info@rebelskool.com</a>
                </p>
              </div>
            </div>

            <div class="footer-right">
              <p class="footer-company-about">
                <span>About the company</span>
                Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce
                euismod convallis velit, eu auctor lacus vehicula sit amet.
              </p>
              <div class="footer-icons">
                <a href="/">
                  <i class="fa fa-facebook"></i>
                </a>
                <a href="/">
                  <i class="fa fa-twitter"></i>
                </a>
                <a href="/">
                  <i class="fa fa-linkedin"></i>
                </a>
                <a href="/">
                  <i class="fa fa-github"></i>
                </a>
              </div>
            </div>

            {/* <ul className="menu">
            <li className="menu__item">
              <a className="menu__link" href="#">
                Home
              </a>
            </li>
            <li className="menu__item">
              <a className="menu__link" href="#">
                About us
              </a>
            </li>
            <li className="menu__item">
              <a className="menu__link" href="#">
                Contact us
              </a>
            </li>
          </ul> */}
          </footer>
        </footer>
      </div>
    );
  }
}
