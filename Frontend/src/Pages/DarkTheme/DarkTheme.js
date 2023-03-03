import React, { Component } from "react";
import { ThemeToggler } from "./ThemeToggler";
import { useDarkMode } from "./UseDarkMode";

import "./styles.css";

// I wouldn't normally call a component something like this.
// It's just to convey what it is doing for the purpose of the article
const UseDarkModeHookWrapperComponent = ({ render }) => {
  const [darkMode, setDarkMode] = useDarkMode(false); //hook

  // Uses the render prop called render that will expose the value and
  // setter for the custom hook
  return render(darkMode, setDarkMode);
};

export default class DarkTheme extends Component {
  render() {
   
    return (
      <UseDarkModeHookWrapperComponent
        render={(darkMode, setDarkMode) => {
          return (
            <div>
              <ThemeToggler darkMode={darkMode} setDarkMode={setDarkMode} />
              
            </div>
          );
        }}
      />
    );
  }
}
