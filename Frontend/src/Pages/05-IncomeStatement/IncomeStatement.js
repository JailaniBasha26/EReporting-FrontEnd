import React, { Component } from "react";
import { InputNumber } from "primereact/inputnumber";
import { TabView, TabPanel } from "primereact/tabview";
import { Button } from "primereact/button";
import { SelectButton } from "primereact/selectbutton";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Navbar from "../00-Corporate Page/Navbar"
import ScrolltoTop from "../ScrollTop/ScrollTop";
import Sidebar from "../Sidebar/Sidebar"
import Steps from "../Steps/steps";
import { connect } from "react-redux";
import moment from "moment";
import "./IncomeStatement.css";

const mapStateToProps = (state) => {
  return {
    annualReportType: state.annualReportType.annualReportType.values,
    companyInformation: state.companyInformation.companyInformation.values,
    financialYear: state.financialYear.financialYear.values,
    incomeStatement: state.incomeStatement.incomeStatement,
  };
};

let getIncomeStatementFieldsArray = [],
  wrongFields = [],
  headerWiseAmountArray = {},
  amountArray = [],
  total = 0,
  finalResultObj = {};

  

let SheetWisefinalResultObj = {
    value: { year: "", incomeStatement: {}, balanceSheet: {} },
  },
  tabYearOptionArray = [],
  resultArray = [];

let financialYearResultObj,
  tabYearOptionObj = { name: "", value: "", label: "" };
class IncomeStatement extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      incomeStatementFieldsObj: {},
      Merchandise: 0,
      activeIndex1: 0,
      selectedFinancialYear: "",
      selectedSheet: "",
      selectedFinancialYearTabValue: "",
    };
    this.amountOnChange = this.amountOnChange.bind(this);
    this.navigateToBalanceSheet = this.navigateToBalanceSheet.bind(this);
    this.yearOnClick = this.yearOnClick.bind(this);
    
  }
  
  navigateToBalanceSheet() {
    //console.log('yes');
    //navigateToBalanceSheet;
    const {
      annualReportType,
      incomeStatement,
      companyInformation,
      financialYear,
    } = this.props;

    const { selectedFinancialYear, selectedSheet } = this.state;

    let SheetWisefinalResultObj = {
      value: { year: "", selectedSheet: "", result: {} },
    };
    let replaceIdx;
    let isYearAlreadyPresent = false;

    SheetWisefinalResultObj.value.result = { finalResultObj };
    SheetWisefinalResultObj.value.selectedSheet = selectedSheet;
    SheetWisefinalResultObj.value.year = selectedFinancialYear;

    resultArray.length &&
      resultArray.map((i, idx) => {
        if (i.value.year == selectedFinancialYear) {
          replaceIdx = idx;
          isYearAlreadyPresent = true;
          let finalResultObjValue = i.value.result.finalResultObj;
          finalResultObj = {
            ...finalResultObjValue,
            ...finalResultObj,
          };
        }
      });
    if (!isYearAlreadyPresent) {
      resultArray.push(SheetWisefinalResultObj);
    } else {
      if (replaceIdx > -1) {
        resultArray.splice(replaceIdx, 1);
        SheetWisefinalResultObj.value.result = { finalResultObj };
        resultArray.push(SheetWisefinalResultObj);
      }
    }

    incomeStatement.values = resultArray;
    finalResultObj = {};
  }
  componentDidMount() {
    const {
      annualReportType,
      incomeStatement,
      companyInformation,
      financialYear,
    } = this.props;

    let year = "";

    tabYearOptionArray = [];
    if (financialYear != undefined) {
      financialYearResultObj = Object.values(financialYear);
      financialYearResultObj &&
        financialYearResultObj.length &&
        financialYearResultObj.map((i, idx) => {
          let formattedFromDate = moment(i.from).format("YYYY-MM-DD");
          let formattedToDate = moment(i.to).format("YYYY-MM-DD");

          tabYearOptionObj = { name: "", value: "" };

          tabYearOptionObj.name = formattedFromDate + "  -  " + formattedToDate;

          tabYearOptionObj.value =
            formattedFromDate + "  -  " + formattedToDate;

          tabYearOptionArray.push(tabYearOptionObj);

          if (idx == 0) {
            year = moment(i.from).format("YYYY");
            this.setState({
              selectedFinancialYear: year,
              selectedSheet: "Income Statement",
              selectedFinancialYearTabValue: tabYearOptionObj.name,
            });
          }
        });

      getIncomeStatementFieldsArray = [];
      axios
        .get("/getIncomeStatementFieldsByYear/" + year)
        .then((response) => {
          let getIncomeStatementFieldsResponse = response.data;

          Object.keys(getIncomeStatementFieldsResponse).map((i) => {
            let getIncomeStatementFieldsResponseObj = {
              header: "",
              fields: [],
            };

            getIncomeStatementFieldsResponseObj.header = i;
            getIncomeStatementFieldsResponse[i] &&
              getIncomeStatementFieldsResponse[i].length > 0 &&
              getIncomeStatementFieldsResponse[i].map((j) => {
                getIncomeStatementFieldsResponseObj.fields.push(
                  j.name +
                    "@#%#@" +
                    j.issumfield +
                    "@#%#@" +
                    j.acceptonlynegativevalues
                );
              });
            getIncomeStatementFieldsArray.push(
              getIncomeStatementFieldsResponseObj
            );

            this.setState({
              incomeStatementFieldsObj: response.data,
            });
          });
        })
        .catch((error) => {});
    }
  }

  amountOnChange(
    value,
    fieldName,
    acceptOnlyNegativeValues,
    headerIdx,
    fieldIdx
  ) {
    const { selectedFinancialYear, selectedSheet } = this.state;
    let amount = value.value;
    this.setState({
      Merchandise: 0,
    });

    finalResultObj[fieldName] = amount;
    total = total + amount;

    SheetWisefinalResultObj.value.year = selectedFinancialYear;
    SheetWisefinalResultObj.value.incomeStatement = finalResultObj;

    if (acceptOnlyNegativeValues == "true") {
      if (amount > 0) {
        wrongFields.push(fieldName);
      } else if (wrongFields.includes(fieldName)) {
        //REMOVE CORRECT FIELDS
        wrongFields = wrongFields.filter((Person) => {
          return Person !== fieldName;
        });
      }
      //REMOVE DUPLICATE FIELDS
      wrongFields = wrongFields.filter(function (elem, pos) {
        return wrongFields.indexOf(elem) == pos;
      });
    }

    if (headerWiseAmountArray[headerIdx] != undefined) {
      amountArray = headerWiseAmountArray[headerIdx];
    } else {
      amountArray = [];
    }
    amountArray[fieldIdx] = amount;
    headerWiseAmountArray[headerIdx] = amountArray;
  }

  yearOnClick(e) {
    // let selectedTabYear = moment(e).format("YYYY");
    let selectedTabYear = e.value.split("-")[0];
    this.setState({
      activeIndex1: 0,
      selectedFinancialYear: selectedTabYear,
      selectedFinancialYearTabValue: e.value,
    });

    getIncomeStatementFieldsArray = [];
    headerWiseAmountArray = [];
    //sum = 0;
    axios
      .get("/getIncomeStatementFieldsByYear/" + selectedTabYear)
      .then((response) => {
        let getIncomeStatementFieldsResponse = response.data;

        Object.keys(getIncomeStatementFieldsResponse).map((i) => {
          let getIncomeStatementFieldsResponseObj = {
            header: "",
            fields: [],
          };

          getIncomeStatementFieldsResponseObj.header = i;
          getIncomeStatementFieldsResponse[i] &&
            getIncomeStatementFieldsResponse[i].length > 0 &&
            getIncomeStatementFieldsResponse[i].map((j) => {
              getIncomeStatementFieldsResponseObj.fields.push(
                j.name +
                  "@#%#@" +
                  j.issumfield +
                  "@#%#@" +
                  j.acceptonlynegativevalues
              );
            });
          getIncomeStatementFieldsArray.push(
            getIncomeStatementFieldsResponseObj
          );

          this.setState({
            incomeStatementFieldsObj: response.data,
          });
        });
      })
      .catch((error) => {});
  }
  render() {
     console.log(getIncomeStatementFieldsArray,'///****//');
    const {
      incomeStatementFieldsObj,
      activeIndex1,
      selectedFinancialYearTabValue,
    } = this.state;
    const { financialYear, incomeStatement } = this.props;

    let sum = 0;

    let operatingResults,
      profitAfterFinancialItems = 0,
      profitBeforeTax = 0,
      thisYearResults = 0,
      totalSumObj = {};
//console.log(financialYear);
console.log(selectedFinancialYearTabValue);
    return (
      <div className="carousel-demo">
        <Navbar />
        {/* <Sidebar/> */}

        {financialYear != undefined && (
          <div>
            <div className="card">
              <div className="pt-2 pb-4">
                <SelectButton
                  value={selectedFinancialYearTabValue}
                  options={tabYearOptionArray}
                  onChange={(e) => this.yearOnClick(e)}
                  optionLabel="name"
                />
              </div>

              <TabView
                activeIndex={this.state.activeIndex1}
                onTabChange={(e) =>
                  this.setState({
                    activeIndex1: e.index,
                    selectedSheet: e.originalEvent.target.innerText,
                  })
                }
              >
                <TabPanel header="Income Statement">
                  <div className="incomeStatement">
                    <div className="incomeStatementPadding">
                      {getIncomeStatementFieldsArray.map((result, idx) => {
                        let headerIdx = result.header.split("@#%#@")[0];
                        if (headerWiseAmountArray[headerIdx] != undefined) {
                          sum = headerWiseAmountArray[headerIdx].reduce(
                            (partialSum, a) => partialSum + a,
                            0
                          );
                        }

                        totalSumObj[headerIdx] = sum;
                        operatingResults = totalSumObj[1] + totalSumObj[2];
                        profitAfterFinancialItems =
                          operatingResults + totalSumObj[3];
                        profitBeforeTax =
                          profitAfterFinancialItems + totalSumObj[4];
                        thisYearResults = profitBeforeTax + totalSumObj[5];
                        let i = 0;
                        return (
                          <div>
                            <h5 className="incomeStatementHeader" key={idx}>
                              <Row className="fields">
                                <Col
                                  xs={8}
                                  sm={8}
                                  md={8}
                                  lg={8}
                                  xl={8}
                                  id="headingStyle"
                                >
                                  {result.header.split("@#%#@")[1]}
                                </Col>

                                <Col
                                  xs={4}
                                  sm={4}
                                  md={4}
                                  lg={4}
                                  xl={4}
                                  id="headingStyle"
                                >
                                  SEK {sum}
                                </Col>
                              </Row>
                            </h5>
                            {result.fields.map((fields, idx) => {
                              let splittedFieldsValue = [];
                              splittedFieldsValue = fields.split("@#%#@");
                              i++;
                              return (
                                <div>
                                  <Row className="fields">
                                    <Col
                                      xs={8}
                                      sm={8}
                                      md={8}
                                      lg={8}
                                      xl={8}
                                      id="fieldsCol"
                                    >
                                      {splittedFieldsValue[1] == "false" ? (
                                        <label key={fields}>
                                          {splittedFieldsValue[0]}
                                        </label>
                                      ) : (
                                        <label
                                          className="isSumField"
                                          key={fields}
                                        >
                                          {splittedFieldsValue[0]}
                                        </label>
                                      )}
                                      <br />
                                      <br />
                                    </Col>
                                    <Col
                                      xs={4}
                                      sm={4}
                                      md={4}
                                      lg={4}
                                      xl={4}
                                      id="fieldsCol"
                                    >
                                      {splittedFieldsValue[1] == "false" ? (
                                        <div className="inputFieldWithWarning">
                                          <InputNumber
                                            mode="decimal"
                                            inputId="integeronly"
                                            style={{ height: "24px" }}
                                            onValueChange={(e) => {
                                              this.amountOnChange(
                                                e,
                                                splittedFieldsValue[0],
                                                splittedFieldsValue[2],
                                                headerIdx,
                                                idx
                                              );
                                            }}
                                          />

                                          {wrongFields.includes(
                                            splittedFieldsValue[0]
                                          ) && (
                                            <div>
                                              &nbsp;&nbsp;
                                              <i
                                                className="fa fa-exclamation-triangle"
                                                id="negativeNumberWarningIcon"
                                              ></i>
                                              &nbsp;&nbsp;
                                              <label className="negativeNumber">
                                                Enter Negative Number
                                              </label>
                                            </div>
                                          )}
                                        </div>
                                      ) : (
                                        <label style={{ height: "30px" }}>
                                          SEK {""}
                                          {splittedFieldsValue[0] ==
                                          "Operating results"
                                            ? operatingResults
                                            : splittedFieldsValue[0] ==
                                              "Profit after financial items"
                                            ? profitAfterFinancialItems
                                            : splittedFieldsValue[0] ==
                                              "Profit before tax"
                                            ? profitBeforeTax
                                            : thisYearResults}
                                        </label>
                                      )}
                                    </Col>
                                  </Row>
                                </div>
                              );
                            })}
                          </div>
                        );
                      })}
                      <center>
                

                        <Button
                          label="Previous"
                          aria-label="Annual Report"
                          onClick={() => this.props.history.push('/year')}
                          id="annualReportBtn"
                          className="btn_Annual"
                          style={{
                            width: "157px",
                            height: "44px",
                            fontSize: "1.2rem",
                          }}
                        />
                        <Button
                          label="Save & Continue"
                          aria-label="Annual Report"
                          onClick={() => this.navigateToBalanceSheet()}
                          id="annualReportBtn"
                          className="btn_Annual"
                          style={{
                            width: "227px",
                            height: "44px",
                            fontSize: "1.2rem",
                          }}
                        />
                      </center>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel header="Balance Sheet">
                  <p>Work in progress</p>
                </TabPanel>
              </TabView>
            </div>
          </div>
        )}
        <ScrolltoTop />
      </div>
    );
  }
}
export default connect(mapStateToProps, null)(IncomeStatement);
