import React, { Component } from "react";
import { Accordion, AccordionTab } from "primereact/accordion";
import { InputNumber } from "primereact/inputnumber";
import { TabView, TabPanel } from "primereact/tabview";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { SelectButton } from "primereact/selectbutton";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import NavBar from "../00-Corporate Page/Navbar";
import ScrolltoTop from "../ScrollTop/ScrollTop";
import Sidebar from "../Sidebar/Sidebar";
import Steps from "../Steps/steps";
import { connect } from "react-redux";
import moment from "moment";
import "./PlayGround.css";

let mockResponse = {};
let formattedYearHeader = [];
let yearHeadingFieldWiseAmount = {};
let yearHeadingWiseSum = {};
let wrongFields = [];
let isSumFieldNames = [
  "Operating income, inventory changes, etc",
  "Operating costs",
  "Financial posts",
  "Closing dispositions",
  "Taxes",
];
let headersList = [];

const mapStateToProps = (state) => {
  return {
    annualReportType: state.annualReportType.annualReportType.values,
    companyInformation: state.companyInformation.companyInformation.values,
    financialYear: state.financialYear.financialYear,
  };
};
class AccordionDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: null,
      test: "",
      showNegativeValueAlert: false,
      negativeFieldName: "",
      currentFieldHeadingName: "",
    };
    this.amountOnChange = this.amountOnChange.bind(this);
  }

  amountOnChange(
    financialYearValue,
    headingValue,
    fieldNameValue,
    isAcceptNegativeValue,
    e
  ) {
    this.setState({
      currentFieldHeadingName: headingValue,
    });
    if (
      yearHeadingFieldWiseAmount[financialYearValue][headingValue] == undefined
    ) {
      yearHeadingFieldWiseAmount[financialYearValue][headingValue] = {};
    }

    yearHeadingFieldWiseAmount[financialYearValue][headingValue][
      fieldNameValue
    ] = e.value;

    let kkr = yearHeadingFieldWiseAmount[financialYearValue][headingValue];
    let sum = 0;

    Object.keys(kkr).map((yearWiseData, idx) => {
      sum += kkr[yearWiseData];

      if (yearHeadingWiseSum[financialYearValue] == undefined) {
        yearHeadingWiseSum[financialYearValue] = {};
      }

      if (yearHeadingWiseSum[financialYearValue][headingValue] == undefined) {
        yearHeadingWiseSum[financialYearValue][headingValue] = {};
      }

      yearHeadingWiseSum[financialYearValue][headingValue] = sum;
    });

    let fieldNameWithYear = fieldNameValue + "**" + financialYearValue;
    if (e.value > 0 && isAcceptNegativeValue) {
      wrongFields.push(fieldNameWithYear);

      this.setState({
        showNegativeValueAlert: true,
        negativeFieldName: fieldNameWithYear,
      });
    } else if (wrongFields.includes(fieldNameWithYear)) {
      //REMOVE CORRECTED FIELDS
      wrongFields = wrongFields.filter((name) => {
        return name !== fieldNameWithYear;
      });
    }
    //REMOVE DUPLICATE FIELDS
    wrongFields = wrongFields.filter(function (elem, pos) {
      return wrongFields.indexOf(elem) == pos;
    });

    this.setState({
      test: "",
    });
  }

  componentDidMount() {
    const { financialYear } = this.props;
    let financialYearValues = financialYear.values;

    //TODO: REMOVE IT
    financialYearValues = {
      0: {
        from: "2022-12-31T18:30:00.000Z",
        to: "2023-02-22T18:30:00.000Z",
      },
      1: {
        from: "2021-12-31T18:30:00.000Z",
        to: "2022-12-30T18:30:00.000Z",
      },
    };

    let selectedFinancialYears = [];
    formattedYearHeader = [];
    Object.keys(financialYearValues).map(function (key) {
      selectedFinancialYears.push(
        moment(financialYearValues[key].from).format("YYYY")
      );

      let formattedDate =
        moment(financialYearValues[key].from).format("YYYY-MM-DD") +
        " - " +
        moment(financialYearValues[key].to).format("YYYY-MM-DD");

      formattedYearHeader.push(formattedDate);

      yearHeadingFieldWiseAmount[formattedDate] = {};
    });
    const uniqueFinancialYears = Array.from(new Set(selectedFinancialYears));

    let financialYears = uniqueFinancialYears.toString();
    axios
      .get("/getIncomeStatementFieldsByFinancialYears/" + financialYears)
      .then((response) => {
        mockResponse = response.data;

        {
          Object.keys(mockResponse).map((heading, idx) => {
            let responseArray = mockResponse[heading];
            headersList.push(heading.split("@#%#@")[1]);
          });
        }

        headersList = headersList.filter(function (elem, pos) {
          return headersList.indexOf(elem) == pos;
        });

        this.setState({
          test: "response",
        });
      });
  }

  render() {
    console.log(headersList);

    return (
      <div>
        <NavBar />
        <Row style={{ width: "100%" }}>
          <Col xs={1} sm={1} md={1} lg={1} xl={1} style={{ width: "64px" }}>
            <Sidebar />
          </Col>

          <Col xs={11} sm={11} md={11} lg={11} xl={11}>
            <Row className="ISFYStyle">
              <div className="parentIS">
                <Col xs={5} sm={5} md={5} lg={5} xl={5}></Col>
                <Col
                  xs={7}
                  sm={7}
                  md={7}
                  lg={7}
                  xl={7}
                  className="ISAmountBoxCol"
                >
                  {formattedYearHeader.map((selectedYear, fyIdx) => {
                    return (
                      <InputNumber
                        mode="decimal"
                        inputId="integeronly"
                        className="ISFY"
                        placeholder={selectedYear}
                        // disabled={true}
                      />
                    );
                  })}
                </Col>
                {/* {formattedYearHeader.map((i, idx) => {
                  return (
                    <div className="child">
                      <Col
                        xs={7}
                        sm={7}
                        md={7}
                        lg={7}
                        xl={7}
                        className="incomeStatementAmountBoxCol"
                      >
                        <InputNumber
                          mode="decimal"
                          inputId="integeronly"
                          className="incomeStatementAmountBox"
                        />
                      </Col>
                    </div>
                  );
                })} */}
              </div>
            </Row>

            {Object.keys(mockResponse).map((heading, idx) => {
              let responseArray = mockResponse[heading];
              let header = heading.split("@#%#@")[1];
              return (
                <div>
                  <Accordion multiple activeIndex={[idx]}>
                    <AccordionTab header={header}>
                      {responseArray.map((i, idx) => {
                        {
                          return (
                            <div>
                              <Row className="ISFields">
                                <Col xs={5} sm={5} md={5} lg={5} xl={5}>
                                  <label className="ISFieldsStyle">
                                    {i.name}
                                  </label>
                                </Col>
                                <Col
                                  xs={7}
                                  sm={7}
                                  md={7}
                                  lg={7}
                                  xl={7}
                                  className="ISAmountBoxCol"
                                >
                                  {formattedYearHeader.map(
                                    (selectedYear, fyIdx) => {
                                      return (
                                        <InputNumber
                                          mode="decimal"
                                          inputId="integeronly"
                                          className="ISAmountBox"
                                        />
                                      );
                                    }
                                  )}
                                </Col>
                              </Row>
                            </div>
                          );
                        }
                      })}
                    </AccordionTab>
                  </Accordion>
                </div>
              );
            })}

            {/* {headersList && headersList.length > 0 && (
              <div>
                <Accordion multiple activeIndex={[0]}>
                  {headersList.map((accordiontHeading, Idx) => {
                    return (
                      <AccordionTab header={accordiontHeading}>
                        <p>{accordiontHeading}</p>
                        {responseArray.map((i, idx) => {

                        })}
                      </AccordionTab>
                    );
                  })}
                </Accordion>
              </div>
            )} */}
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(AccordionDemo);
