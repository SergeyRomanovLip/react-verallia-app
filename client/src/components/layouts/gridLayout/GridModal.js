import React from "react";

function GridModal() {
  return (
    <div className="infoWindow">
      <div className="infoWindow-header">
        <b>Add new work?</b>
      </div>
      <div className="infoWindow-body">
        <div className="infoWindow-body-form">
          <div
            onClick={() => {
              console.log("added");
            }}
            className="infoWindow-body-form-button"
          >
            Add
          </div>
          <div
            onClick={() => {
              console.log("cancelled");
            }}
            className="infoWindow-body-form-button"
          >
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
}

export default GridModal;
