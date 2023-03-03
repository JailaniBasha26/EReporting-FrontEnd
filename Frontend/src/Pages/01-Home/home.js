import React, { Component } from "react";
import { Carousel } from "primereact/carousel";
import axios from "axios";
import "./home.css";
import { Button } from "primereact/button";
import Navbar from "../00-Corporate Page/Navbar";
import { connect } from "react-redux";
import ScrolltoTop from "../ScrollTop/ScrollTop";

const mapStateToProps = (state) => {
  return {
    annualReportType: state.annualReportType.annualReportType.values,
    companyInformation: state.companyInformation.companyInformation.values,
    financialYear: state.financialYear.financialYear,
    incomeStatement: state.incomeStatement.incomeStatement,
  };
};
class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carouselUrls: [],
    };
    this.carouselRender = this.carouselRender.bind(this);
  }

  componentDidMount() {
    let { companyInformation, financialYear } = this.props;

    if (companyInformation != undefined) {
      companyInformation.isExistingOrganization = false;
      companyInformation.organizationname = "";
      companyInformation.organizationno = "";
      companyInformation.postaladdress = "";
      companyInformation.zipcode = "";
    }

    if (financialYear != undefined) {
      financialYear.values = {};
    }
    axios
      .get("/getCarouselImages")
      .then((response) => {
        this.setState({
          carouselUrls: response.data,
        });
      })
      .catch((error) => {});
  }

  carouselRender(product) {
    return (
      <div className="product-item">
        <div className="product-item-content">
          <div className="mb-3">
            <img src={product} alt={product} className="product-image" />
          </div>
        </div>
      </div>
    );
  }

  annualReport() {
    this.props.history.push("/fileSIE");
  }

  render() {
    const { carouselUrls, incomeStatementFieldsObj } = this.state;
    return (
      <div className="carousel-demo">
        <Navbar />
        <div className="carouselCard">
          <Carousel
            value={carouselUrls}
            numVisible={1}
            numScroll={1}
            autoplayInterval={300000}
            circular
            itemTemplate={this.carouselRender}
          />
        </div>

        <div className="main_container">
          <div className="main_content">
            {/* <h1 className="main_heading"> WELCOME! </h1> */}
            <p className="main_para">
              Make your annual report according to regulations K2 through our
              E-Reporting system - directly in the browser.
            </p>
            <div className="main_btn">
              <center>
                <Button
                  label="BEGIN"
                  aria-label="Annual Report"
                  onClick={() => this.annualReport()}
                  id="annualReportBtn"
                  className="btn_Annual"
                />
              </center>
            </div>
          </div>
        </div>
        <ScrolltoTop />
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(home);
