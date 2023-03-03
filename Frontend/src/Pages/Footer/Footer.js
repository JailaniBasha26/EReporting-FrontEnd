import React, { Component } from "react";
import { Route } from "react-router-dom";

import {FaFacebookSquare,FaTwitter} from "react-icons/fa";
import {BsInstagram,BsLinkedin}from "react-icons/bs";
import logoft from "./logoft.png";
import { Image } from "primereact/image";
import "./Footer.css";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      {
        /* footer section start here */
      } <div >
      (
        <footer className="footer" id="contact">
          <div className="box-container">
            <div className="mainBox">
              <div className="content">
                <Image src={logoft} alt="6255" className="fter">
                  {" "}
                </Image>
                <h1 className="logoName"> Footer Page </h1>
              </div>

              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta
                accusamus maxime quod.
              </p>
            </div>
            <div className="box">
              <h3>Quick link</h3>
              <a href="#">
                {" "}
                <i className="fas fa-arrow-right"></i>Home
              </a>
              <a href="#">
                {" "}
                <i className="fas fa-arrow-right"></i>product
              </a>
              <a href="#">
                {" "}
                <i className="fas fa-arrow-right"></i>blogs
              </a>
              <a href="#">
                {" "}
                <i className="fas fa-arrow-right"></i>review
              </a>
              <a href="#">
                {" "}
                <i className="fas fa-arrow-right"></i>contact
              </a>
            </div>
            <div className="box">
              <h3>Extra link</h3>
              <a href="#">
                {" "}
                <i className="fas fa-arrow-right"></i>Account info
              </a>
              <a href="#">
                {" "}
                <i className="fas fa-arrow-right"></i>order item
              </a>
              <a href="#">
                {" "}
                <i className="fas fa-arrow-right"></i>privacy policy
              </a>
              <a href="#">
                {" "}
                <i className="fas fa-arrow-right"></i>payment method
              </a>
              <a href="#">
                {" "}
                <i className="fas fa-arrow-right"></i>our services
              </a>
            </div>
            <div className="box">
              <h3>Contact Info</h3>
              <a href="#">
                {" "}
                <i class="fas fa-phone"></i>+91 12222 34444
              </a>
              <a href="#">
                {" "}
                <i className="fas fa-envelope"></i>rebelskool@gmail.com
              </a>
            </div>
          </div>
          <div className="share">
          <FaFacebookSquare  className="fab-fa-facebook-f"/>
         <FaTwitter className="fab-fa-twitter" />
          <BsInstagram className="fab-fa-instagram" />
          <BsLinkedin className="fab-fa-linkedin" />
          </div>
        </footer>
      )
    );
  }
}

export default Footer;
