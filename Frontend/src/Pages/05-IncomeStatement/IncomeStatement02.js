import React, { Component } from "react";
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
import "./IncomeStatement02.css";
import ReCAPTCHA from "react-google-recaptcha";

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

const mapStateToProps = (state) => {
  return {
    annualReportType: state.annualReportType.annualReportType.values,
    companyInformation: state.companyInformation.companyInformation.values,
    financialYear: state.financialYear.financialYear,
  };
};

class IncomeStatement02 extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
        this.setState({
          test: "response",
        });
      });
  }

  render() {
    const { showNegativeValueAlert, currentFieldHeadingName } = this.state;
    console.log(wrongFields, "$$$$$");

    return (
      <div>
        <NavBar />
        <Row>
          <Col
            xs={1}
            sm={1}
            md={1}
            lg={1}
            xl={1}
            style={{ width: "min-content" }}
          >
            <Sidebar />
          </Col>

          <Col xs={11} sm={11} md={11} lg={11} xl={11}>
            <div className="parentDivIncomeStatement">
              <Row className="incomeStatementFYStyle">
                <div className="parentX">
                  <Col xs={5} sm={5} md={5} lg={5} xl={5}></Col>
                  {formattedYearHeader.map((i, idx) => {
                    return (
                      <div className="child">
                        <Col xs={7} sm={7} md={7} lg={7} xl={7}>
                          <label className="financialYears">{i}</label>
                        </Col>
                      </div>
                    );
                  })}
                </div>
              </Row>

              {Object.keys(mockResponse).map((heading, idx) => {
                let responseArray = mockResponse[heading];
                let header = heading.split("@#%#@")[1];
                return (
                  <div>
                    <br />
                    <br />

                    <Row className="incomeStatementHeaderStyle">
                      <Col xs={5} sm={5} md={5} lg={5} xl={5} id="headingStyle">
                        {header}
                      </Col>

                      <Col
                        xs={7}
                        sm={7}
                        md={7}
                        lg={7}
                        xl={7}
                        className="incomeStatementAmountBoxCol"
                      >
                        {formattedYearHeader.map((i, idx) => {
                          let sum = "SEK " + 0;

                          if (yearHeadingWiseSum[i] != undefined) {
                            if (yearHeadingWiseSum[i][header] != undefined) {
                              sum = "SEK " + yearHeadingWiseSum[i][header];
                            }
                          }

                          return (
                            <div className="parent">
                              <InputText
                                className="incomeStatementHeadingSum"
                                value={sum}
                                disabled={true}
                              />
                            </div>
                          );
                        })}
                      </Col>
                    </Row>

                    {responseArray.map((i, idx) => {
                      let yearsInResponse = i.year.split(",");
                      return (
                        <div>
                          <Row className="incomeStatementFields">
                            <Col xs={5} sm={5} md={5} lg={5} xl={5}>
                              <label className="incomeStatementFieldsStyle">
                                {i.name}
                              </label>
                            </Col>
                            <Col
                              xs={7}
                              sm={7}
                              md={7}
                              lg={7}
                              xl={7}
                              className="incomeStatementAmountBoxCol"
                            >
                              {formattedYearHeader.map(
                                (selectedYear, fyIdx) => {
                                  let year = selectedYear.split("-")[0];
                                  let bb = i.name + "**" + selectedYear;
                                  console.log(bb, "?? BB");

                                  let fieldTotalValue;
                                  let yearHeadingWiseSumForSelectedYear =
                                    yearHeadingWiseSum[selectedYear];

                                  if (
                                    yearHeadingWiseSumForSelectedYear !=
                                    undefined
                                  ) {
                                    if (i.name == "Operating results") {
                                      if (
                                        yearHeadingWiseSumForSelectedYear[
                                          isSumFieldNames[0]
                                        ] != undefined &&
                                        yearHeadingWiseSumForSelectedYear[
                                          isSumFieldNames[1]
                                        ] != undefined
                                      ) {
                                        fieldTotalValue =
                                          yearHeadingWiseSumForSelectedYear[
                                            isSumFieldNames[0]
                                          ] +
                                          yearHeadingWiseSumForSelectedYear[
                                            isSumFieldNames[1]
                                          ];
                                      }
                                    }

                                    if (
                                      i.name == "Profit after financial items"
                                    ) {
                                      if (
                                        yearHeadingWiseSumForSelectedYear[
                                          isSumFieldNames[0]
                                        ] != undefined &&
                                        yearHeadingWiseSumForSelectedYear[
                                          isSumFieldNames[1]
                                        ] != undefined &&
                                        yearHeadingWiseSumForSelectedYear[
                                          isSumFieldNames[2]
                                        ] != undefined
                                      ) {
                                        fieldTotalValue =
                                          yearHeadingWiseSumForSelectedYear[
                                            isSumFieldNames[0]
                                          ] +
                                          yearHeadingWiseSumForSelectedYear[
                                            isSumFieldNames[1]
                                          ] +
                                          yearHeadingWiseSumForSelectedYear[
                                            isSumFieldNames[2]
                                          ];
                                      }
                                    }

                                    if (i.name == "Profit before tax") {
                                      if (
                                        yearHeadingWiseSumForSelectedYear[
                                          isSumFieldNames[0]
                                        ] != undefined &&
                                        yearHeadingWiseSumForSelectedYear[
                                          isSumFieldNames[1]
                                        ] != undefined &&
                                        yearHeadingWiseSumForSelectedYear[
                                          isSumFieldNames[2]
                                        ] != undefined &&
                                        yearHeadingWiseSumForSelectedYear[
                                          isSumFieldNames[3]
                                        ] != undefined
                                      ) {
                                        fieldTotalValue =
                                          yearHeadingWiseSumForSelectedYear[
                                            isSumFieldNames[0]
                                          ] +
                                          yearHeadingWiseSumForSelectedYear[
                                            isSumFieldNames[1]
                                          ] +
                                          yearHeadingWiseSumForSelectedYear[
                                            isSumFieldNames[2]
                                          ] +
                                          yearHeadingWiseSumForSelectedYear[
                                            isSumFieldNames[3]
                                          ];
                                      }
                                    }
                                    if (i.name == "This year's results") {
                                      if (
                                        yearHeadingWiseSumForSelectedYear[
                                          isSumFieldNames[0]
                                        ] != undefined &&
                                        yearHeadingWiseSumForSelectedYear[
                                          isSumFieldNames[1]
                                        ] != undefined &&
                                        yearHeadingWiseSumForSelectedYear[
                                          isSumFieldNames[2]
                                        ] != undefined &&
                                        yearHeadingWiseSumForSelectedYear[
                                          isSumFieldNames[3]
                                        ] != undefined &&
                                        yearHeadingWiseSumForSelectedYear[
                                          isSumFieldNames[4]
                                        ] != undefined
                                      ) {
                                        fieldTotalValue =
                                          yearHeadingWiseSumForSelectedYear[
                                            isSumFieldNames[0]
                                          ] +
                                          yearHeadingWiseSumForSelectedYear[
                                            isSumFieldNames[1]
                                          ] +
                                          yearHeadingWiseSumForSelectedYear[
                                            isSumFieldNames[2]
                                          ] +
                                          yearHeadingWiseSumForSelectedYear[
                                            isSumFieldNames[3]
                                          ] +
                                          yearHeadingWiseSumForSelectedYear[
                                            isSumFieldNames[4]
                                          ];
                                      }
                                    }
                                  }
                                  return (
                                    <div className="parent">
                                      {yearsInResponse.includes(year) ? (
                                        <div>
                                          {i.issumfield ? (
                                            <InputNumber
                                              mode="decimal"
                                              inputId="integeronly"
                                              className="incomeStatementAmountBoxDisabled"
                                              disabled={true}
                                              placeholder={fieldTotalValue}
                                            />
                                          ) : (
                                            <div>
                                              <InputNumber
                                                mode="decimal"
                                                inputId="integeronly"
                                                onValueChange={(e) => {
                                                  this.amountOnChange(
                                                    selectedYear,
                                                    header,
                                                    i.name,
                                                    i.acceptonlynegativevalues,
                                                    e
                                                  );
                                                }}
                                                className={
                                                  wrongFields.includes(bb) &&
                                                  "incomeStatementNegativeAmountBox"
                                                }
                                              />
                                              {wrongFields.includes(bb) && (
                                                <i
                                                  className="fa fa-exclamation-circle"
                                                  id="negativeNumberWarningIcon"
                                                  title="Negative Value is Recommended"
                                                ></i>
                                              )}
                                            </div>
                                          )}
                                        </div>
                                      ) : (
                                        <div>
                                          <InputNumber
                                            mode="decimal"
                                            inputId="integeronly"
                                            className="incomeStatementAmountBoxDisabled"
                                            disabled={true}
                                            tooltip="This field is not applicable for the selected financial year"
                                          />
                                        </div>
                                      )}
                                    </div>
                                  );
                                }
                              )}
                            </Col>
                          </Row>

                          <br />
                        </div>
                      );
                    })}
                  </div>
                );
              })}

              <center className="incomeStatementSaveBtnCenter">
                <Button
                  label="Previous"
                  aria-label="Annual Report"
                  // onClick={() => this.props.history.push('/year')}
                  id="annualReportBtn"
                  className="incomeStatementSaveBtn"
                />
                <Button
                  label="Save & Continue"
                  aria-label="Annual Report"
                  // onClick={() => this.navigateToBalanceSheet()}
                  id="annualReportBtn"
                  className="incomeStatementSaveBtn"
                />
              </center>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(IncomeStatement02);
