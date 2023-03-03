import React, { Component } from "react";
import { Carousel } from "primereact/carousel";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Button } from "primereact/button";
import Steps from "../Steps/steps";
import { connect } from "react-redux";
import "./Fill_SIE.css";
import Navbar from "../00-Corporate Page/Navbar"
import Sidebar from "../Sidebar/Sidebar";
import ScrolltoTop from "../ScrollTop/ScrollTop";


const mapStateToProps = (state) => {
  return {
    annualReportType: state.annualReportType.annualReportType,
  };
};

class Fill_SIE extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  navigateToInformationPage(e) {
    let { annualReportType } = this.props;
    const reportType = {
      type: e,
    };
    annualReportType.values = reportType;
    annualReportType.values.status = true;
    this.props.history.push("/info");
    console.log("Its navigating");
  }

  render() {
    return (
      <div>
        <Navbar />
        <Sidebar />
        <center>
          <div className="fill-sub">
            <div>
              <p className="fill-sub2">Hey!</p>
              <p className="fill-sub3">
                Choose how you want to start your annual report.
              </p>
            </div>
            <div className="fill-btn-div">
              <Button
                label="Fill in by hand"
                aria-label="Annual Report"
                onClick={(e) =>
                  this.navigateToInformationPage("Fill in by hand")
                }
                id="annualReportBtn"
                className="btn_Annual"
              />

              <Button
                label="Import SIE File"
                aria-label="Annual Report"
                onClick={(e) =>
                  this.props.history.push("/HooksTry")
                }
                id="annualReportBtn"
                className="btn_Annual"
              />
              
            </div>
          </div>
        </center>
        <ScrolltoTop />
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(Fill_SIE);
