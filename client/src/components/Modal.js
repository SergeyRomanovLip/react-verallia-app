import React from "react";
import { AcceptSVG } from "./layouts/drawSVG/AcceptSVG";
import GridModal from "./layouts/gridLayout/GridModal";
import { AcceptIncident } from "./layouts/incidents/AcceptIncident";
import AddNewWork from "./layouts/subcontractors/AddNewWork";
import InfoSubc from "./layouts/subcontractors/InfoSubc";

function removeHandler(e, handler) {
  e.preventDefault();
  if (e.target === e.currentTarget) {
    handler();
  }
}

function Modal({ click, modalState, remove }) {
  if (modalState.type == null) {
    return null;
  } else {
    switch (modalState.type) {
      case "InfoSubc":
        return (
          <div
            onClick={(e) => {
              removeHandler(e, remove);
            }}
            className="modal"
          >
            <InfoSubc
              content={modalState.content}
              click={click}
              remove={remove}
            ></InfoSubc>
          </div>
        );
      case "AddNewWork":
        return (
          <div
            onClick={(e) => {
              removeHandler(e, remove);
            }}
            className="modal"
          >
            <AddNewWork
              content={modalState.content}
              click={click}
              remove={remove}
            ></AddNewWork>
          </div>
        );
      case "GridAccept":
        return (
          <div
            onClick={(e) => {
              removeHandler(e, remove);
            }}
            className="modal"
          >
            <GridModal />
          </div>
        );
      case "AcceptSVG":
        return (
          <div
            onClick={(e) => {
              removeHandler(e, remove);
            }}
            className="modal"
          >
            <AcceptSVG options={modalState} remove={remove} />
          </div>
        );
      case "AcceptIncident":
        return (
          <div
            onClick={(e) => {
              removeHandler(e, remove);
            }}
            className="modal"
          >
            <AcceptIncident options={modalState} remove={remove} />
          </div>
        );
      default:
        return null;
    }
  }
}
export default Modal;
