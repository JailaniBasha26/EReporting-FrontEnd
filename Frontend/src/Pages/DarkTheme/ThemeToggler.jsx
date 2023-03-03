import React from "react";
import { icons } from "react-icons";
import { BsSun, BsFillMoonFill } from "react-icons/bs";
import "./styles.css";

export const ThemeToggler = ({ darkMode, setDarkMode }) => {
  return (
    <div>
      {darkMode == true ? (
        <button
          className="btn-light"
          onClick={(e) => {
            setDarkMode(!darkMode);
          }}
        >
          <BsSun />
        </button>
      ) : (
        <button
          className="btn-dark"
          onClick={(e) => {
            setDarkMode(!darkMode);
          }}
        >
          <BsFillMoonFill />
        </button>
      )}
    </div>
  );
};
