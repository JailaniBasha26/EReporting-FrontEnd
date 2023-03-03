import { useEffect, useState } from "react";
import React from "react";


export function useDarkMode() {
  // Taken from https://usehooks.com/useDarkMode/

  // For this to persist, we'd use localStorage or some other kind
  // of way to persist between sessions.
  // see e.g. https://usehooks.com/useLocalStorage/
  const [enabledState, setEnabledState] = useState(false);
  const enabled = enabledState;

  useEffect(() => {
    const className = "dark-mode";
    const element = document.body;
    if (enabled == true) {
      element.classList.add(className);
    } else {
      element.classList.remove(className);
    }
  }, [enabled]);
  return [enabled, setEnabledState];
}
