import React from "react";
import ReactDOM from "react-dom";
import "./sass/App.sass";
import "./sass/loader.sass";
import "./sass/map.sass";
import "./sass/miscellaneous.sass";
import "./sass/toolbar.sass";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
