import React from "react";
import ReactDOM from "react-dom";
import "./sass/App.sass";
import "./sass/loader.sass";
import "./sass/map.sass";
import "./sass/miscellaneous.sass";
import "./sass/toolbar.sass";
import "./sass/Auth.sass";
import "react-datetime/css/react-datetime.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
