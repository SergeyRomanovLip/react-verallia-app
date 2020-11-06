import React, { useReducer, useContext, useState, useEffect } from "react";
import { ModalContext } from "../context/ModalContext";
import { AcceptSVG } from "./layouts/drawSVG/AcceptSVG";
import GridModal from "./layouts/gridLayout/GridModal";
import { AcceptIncident } from "./layouts/incidents/AcceptIncident";
import AddNewWork from "./layouts/subcontractors/AddNewWork";
import InfoSubc from "./layouts/subcontractors/InfoSubc";

export const ModalNew = ({ children }) => {
  const [modalState, setModalState] = useState({
    type: null,
    content: null,
  });
  const [modalContent, setModalContent] = useState(null);

  const removeHandler = (e, handler) => {
    e.preventDefault();
    if (e.target === e.currentTarget) {
      handler();
    }
  };

  const click = (type, options) => {
    setModalState({
      type: type,
      content: options,
    });
  };
  const remove = () => {
    setModalState({
      type: null,
      content: null,
    });
  };

  if (modalState.type == null) {
    setModalContent(null);
  } else {
    switch (modalState.type) {
      case "InfoSubc":
        setModalContent(
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
        setModalContent(
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
        setModalContent(
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
        setModalContent(
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
        setModalContent(
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
        setModalContent(null);
    }
  }
  return (
    <ModalContext.Provider value={{ setModalState }}>
      {children}
    </ModalContext.Provider>
  );
};
