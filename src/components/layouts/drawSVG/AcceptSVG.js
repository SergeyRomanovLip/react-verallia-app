import React, { useContext, useState } from "react";
import { ModalContext } from "context/ModalContext";
import InputRow from "components/misc/inputRow";

export const AcceptSVG = ({ content }) => {
  const { removeModal } = useContext(ModalContext);
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
              content(nameOfArea);
              removeModal();
            }}
            className="infoWindow-body-form-button"
          >
            Add
          </div>
          <div
            onClick={() => {
              removeModal();
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
