import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Captcha.css";

export default () => {
  const SECURITY_CODE_LENGTH = 5;
  const [values, setValues] = useState({ securityCode: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [securityCode, setSecurityCode] = useState("");
  const [captchaCode, setCaptchaCode] = useState("");

  const generateSecurityCodeImage = (captchaCode) => {
    const code = captchaCode;
    const securityCodeImageElement =
      document.getElementById("securityCodeImage");
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 50;
    canvas.height = 20;

    const imgElement = document.createElement("img");

    imgElement.addEventListener("load", loadImage);
    imgElement.src = `data:image/svg+xml,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="150" height="100"><foreignObject width="100%" height="100%">
      <div xmlns="http://www.w3.org/1999/xhtml" style="display:block;"><span style="margin:auto;">${code}</span></div>
      </foreignObject></svg>`
    )}`;

    function loadImage(e) {
      ctx.drawImage(e.target, 0, 0);
      securityCodeImageElement.src = canvas.toDataURL();
    }

    setSecurityCode(code);
  };

  const onChange = (event) => {
    const { target } = event;
    const { name, value } = target;

    event.persist();
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (event) => {
    setIsSubmitting(true);

    if (event) event.preventDefault();

    setTimeout(() => {
      axios
        .get("/getCaptchaCode")
        .then((response) => {
          if (response.data != "") {
            if (values.securityCode !== securityCode) {
              alert("Invalid security code!");
              generateSecurityCodeImage(response.data);
              setIsSubmitting(false);

              return;
            }

            alert("Easy peasy lemon squeeze");
            generateSecurityCodeImage(response.data);
            setIsSubmitting(false);
          }
        })
        .catch((error) => {});
      values.securityCode = "";
    }, 1000);
  };

  useEffect(() => {
    axios
      .get("/getCaptchaCode")
      .then((response) => {
        generateSecurityCodeImage(response.data);
      })
      .catch((error) => {});
  }, []);

  return (
    <div className="relative w-auto h-auto m-auto">
      <form onSubmit={onSubmit}>
        <div>
          <div
            style={{ width: "15%", paddingLeft: "1rem", marginBottom: "1%" }}
            className="captchaImgDiv"
          >
            <img
              id="securityCodeImage"
              alt="Security Code Challange"
              style={{
                objectFit: "contain",
                width: "100%",
                height: "100%",
                paddingLeft: ".5rem",
                paddingRight: ".5rem",
                marginLeft: "3%",
              }}
            />
          </div>
          <div style={{ paddingLeft: "1rem", display: "flex" }}>
            <label htmlFor="securityCode" style={{ display: "inline-block" }}>
              Captcha Code
            </label>
            <input
              id="securityCode"
              style={{ width: "10%" }}
              type="text"
              name="securityCode"
              required
              onChange={onChange}
              value={values.securityCode}
            />
            <button
              type="submit"
              style={{ marginLeft: "1rem" }}
              disabled={isSubmitting}
            >
              {isSubmitting ? <span>Submitting</span> : <span>Submit</span>}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
