import React from "react";

export const IncidentComponent = ({ left, top, name, type, description }) => {
  return (
    <div
      className={"incidentLayout-sign"}
      style={{ position: "absolute", top: top + "px", left: left + "px" }}
    >
      {type}, {name}
    </div>
  );
};
