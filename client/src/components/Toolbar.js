import React, { useContext } from "react";
import "../sass/toolbar.sass";
import { ActualDataContext } from "./redux/context";

function Toolbar() {
  const actualDataDispatch = useContext(ActualDataContext).actualDataDispatch;
  const actualDataState = useContext(ActualDataContext).actualDataState;

  function setLayout(layout) {
    actualDataDispatch(["setLayout", layout]);
  }

  return (
    <div id="toolbar" className="toolbar">
      <img className="toolbar-img" src="/logoVerallia.jpg" alt="logo" />
      <ul className="toolbar-list">
        <div
          onClick={() => {
            setLayout("subcontractors");
          }}
          id="SubcontractorsButton"
          data-text="subcontractors"
          className={`toolbar-item ${
            actualDataState.layout === "subcontractors" ? "active" : ""
          }`}
        >
          Subcontractors
        </div>
        <div className={"toolbar-item-border"}></div>
        <div
          onClick={() => {
            setLayout("incidents");
          }}
          id="IncidentsButton"
          data-text="incidents"
          className={`toolbar-item ${
            actualDataState.layout === "incidents" ? "active" : ""
          }`}
        >
          Incidents
        </div>
        <div className={"toolbar-item-border"}></div>
        <div className="toolbar-item">Some button</div>
      </ul>
      <div className="toolbar-status">
        <div id="toolbar-status-text" calss="toolbar-status-text">
          {actualDataState.layout} layout
        </div>
      </div>
    </div>
  );
}
export default Toolbar;
