import React, { useState } from "react";
import InputRow from "../../misc/inputRow";

export const AcceptIncident = ({ options, remove }) => {
  const [dataOfIncident, setDataOfIncident] = useState({
    name: "",
    type: "",
    description: "",
  });

  function getData(e, r) {
    setDataOfIncident({ ...dataOfIncident, [e]: r });
  }

  return (
    <div className="infoWindow">
      <div className="infoWindow-header">
        <b>Add new incident?</b>
      </div>
      <div className="infoWindow-body">
        <hr />
        <InputRow
          text={"Short name"}
          data={"name"}
          fun={(e, r) => {
            getData(e, r);
          }}
          type={"text"}
        ></InputRow>
        <InputRow
          text={"Type"}
          data={"type"}
          fun={(e, r) => {
            getData(e, r);
          }}
          type={"text"}
        ></InputRow>
        <InputRow
          text={"Description"}
          data={"description"}
          fun={(e, r) => {
            getData(e, r);
          }}
          type={"text"}
        ></InputRow>
        <div className="infoWindow-body-form">
          <div
            onClick={() => {
              options.content(dataOfIncident);
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
