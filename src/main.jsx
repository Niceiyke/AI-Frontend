// index.js
import React from "react";
import ReactDOM from "react-dom";
import General_Routes from "./Router"; // The Routes component
import "./index.css";


ReactDOM.render(
  <React.StrictMode>
    <General_Routes/>
  </React.StrictMode>,
  document.getElementById("root")
);
