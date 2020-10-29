import React, { useState } from "react";
import InputRow from "../../misc/inputRow";

export const AcceptSVG = ({ options, remove }) => {
  const [nameOfArea, setNameOfArea] = useState("Undefined");
  return (
    <div className="infoWindow">
      <div className="infoWindow-header">
        <b>Add new area?</b>
      </div>
      <div className="infoWindow-body">
        <hr />
        <InputRow
          text={"Write area name"}
          data={"areaName"}
          fun={(e, r) => {
            setNameOfArea(r);
          }}
          type={"text"}
        ></InputRow>
        <div className="infoWindow-body-form">
          <div
            onClick={() => {
              options.content(nameOfArea);
              remove();
            }}
            className="infoWindow-body-form-button"
          >
            Add
          </div>
          <div
            onClick={() => {
              remove();
            }}
            className="infoWindow-body-form-button"
          >
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
};
