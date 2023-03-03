import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import "./steps.css";


let selectedOption = "",
  optionValues = [
    { name: "+ New Annual Report", id: "N1" },
    { name: "Profile", id: "list1" },
    { name: "settings", id: "list2" },
  ];
class steps extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  Newtablist(e) {
    console.log("Hi");
    if (e.value.name === "Profile") {
      console.log("Inside If");
      this.props.history.push("/IncomeStatement");
    }
  }


  componentDidMount() {
    let ls = JSON.parse(localStorage.getItem("localData"));
    console.log(ls, "****");

    ls.length &&
      ls.map((i, idx) => {
        const bb = { name: "", id: "" };
        (bb.name = i.companyName), (bb.id = i.organizationNumber);
        optionValues.push(bb);
      });
  }

  render() {
    return (
      <div>
        <div className="TabLS">
          <Route
            render={({ history }) => (
              <span>
                <Dropdown
                  //value={this.state.Newrecord}
                  options={optionValues}
                  onChange={(e) => {
                    selectedOption = e.value.name;
                    if (selectedOption == "+ New Annual Report") {
                      history.push("/fileSIE");
                    }
                  }}
                  optionLabel="name"
                  placeholder="New +"
                  id="dropdown-id"
                />
              </span>
            )}
          />
        </div>
      </div>
    );
  }
}

export default steps;
