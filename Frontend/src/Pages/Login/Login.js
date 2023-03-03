import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { FaUser } from "react-icons/fa";
import { InputText } from "primereact/inputtext";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
//import { SelectButton } from 'primereact/selectbutton';
import { TabView, TabPanel } from "primereact/tabview";

import "./Login.css";

function Login() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [message,setMessage] = useState('');
  const handleOnChange = (e) => {
    setEmail(e.target.value)
  };
  const emailValidation = () => {
    const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    if(regEx.test(email)){
      setMessage('Email is Valid');
    } else if(!regEx.test(email) && email !== "") {
      setMessage('Email is not Valid');
    } else {
      setMessage('');
    }
  } 

  const [activeIndex, setActiveIndex] = useState(0);

  const header = <div className="font-bold mb-3">Pick a password</div>;
  const footer = (
    <div>
      <Divider />
      <p className="mt-2">Suggestions</p>
      <ul className="pl-2 ml-2 mt-0 line-height-3">
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </div>
  );

  return (
    <div>
      <Button className="user-btn" onClick={() => setVisible(true)}>
        <FaUser />
      </Button>
      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        position="right"
        className="user-sidebar"
      >
        <div>
          <h2>
            <center>LOGIN</center>
          </h2>
        </div>
        <br></br>
        <br></br>
        <TabView
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
          className="flex flex-wrap gap-2 mb-3"
        >
          <TabPanel header="Login" headerClassName="head-one">
            <div className="m-0">
              <br></br>
              <InputText
                value={email}
                onChange={(e) => {handleOnChange}
                 //setEmail(e.target.value)
                }
                placeholder="E-mail Address"
                className="inputtext"
              />
              {message}
              <br></br>
              <br></br>

              <Password
                // value={value}
                // onChange={(e) => setValue(e.target.value)}
                placeholder="Password"
                // header={header}
                // footer={footer}
                toggleMask
                feedback={false}
                className="password"
              />
              <br></br>
              <br></br>
              <center>
                <Button
                  label="LOGIN"
                  severity="success"
                  className="login-btn"
                  onClick={emailValidation}
                />
              </center>
              <br></br>
              <center>
                <Button
                  label="FORGOT PASSWORD?"
                  severity="success"
                  className="forgot-btn"
                />
              </center>
            </div>
          </TabPanel>
          <TabPanel header="Sign Up" headerClassName="head-one">
            <p className="m-0">
              <div className="m-0">
                <br></br>
                <InputText
                  //value={value}
                  //onChange={(e) => setValue(e.target.value)}
                  placeholder="E-mail Address"
                  className="inputtext"
                />
                <br></br>
                <br></br>

                <Password
                  // value={value}
                  // onChange={(e) => setValue(e.target.value)}
                  placeholder="Password"
                  header={header}
                  footer={footer}
                  toggleMask
                  className="password"
                />
                <br></br>
                <br></br>
                <Password
                  // value={value}
                  // onChange={(e) => setValue(e.target.value)}
                  placeholder="Confirm Password"
                  // header={header}
                  // footer={footer}
                  toggleMask
                  feedback={false}
                  className="password"
                />
                <br></br>
                <br></br>
                <center>
                  <Button
                    label="SIGN UP"
                    severity="success"
                    className="login-btn"
                  />
                </center>
                <br></br>
              </div>{" "}
            </p>
          </TabPanel>
        </TabView>
      </Sidebar>
    </div>
  );
}

export default Login;
