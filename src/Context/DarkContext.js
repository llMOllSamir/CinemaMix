import axios from "axios";
import React, { useState } from "react";
import { createContext } from "react";

export let darkContext = createContext(0);

export default function DarkContext(props) {
  let [isdark, setIsDark] = useState(true);
  // check last mood was on

  let checkDarkMood = () => {
    if (localStorage.getItem("isDark")) {
      if (localStorage.getItem("isDark") === "false") {
        setIsDark(false);
        darkMood();
      } else {
        darkMood();
      }
    }
  };

  // make dark mood toggle
  let darkMood = () => {
    if (isdark) {
      document.body.style.transition = "all 1s";
      document.body.style.backgroundColor = "black";
      document.body.style.color = "white";
      localStorage.setItem("isDark", true);
      setTimeout(() => {
        document.body.style.transition = "all 0s";
      }, 10);
    } else {
      document.body.style.transition = "all 1s";
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
      localStorage.setItem("isDark", false);
      setTimeout(() => {
        document.body.style.transition = "all 0s";
      }, 10);
    }
  };

  return (
    <darkContext.Provider
      value={{ isdark, setIsDark, checkDarkMood, darkMood }}
    >
      {props.children}
    </darkContext.Provider>
  );
}
