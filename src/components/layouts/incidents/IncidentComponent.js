import React, { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import { ModalContext } from "../../../context/ModalContext";

export const IncidentComponent = ({
  left,
  top,
  id,
  name,
  victimName,
  department,
  status,
  startDate,
  finishDate,
}) => {
  const { showModal } = useContext(ModalContext);
  const { appState } = useContext(AppContext);
  const ID = id;
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        showModal("InfoIncident", ID);
      }}
      className={"incidentLayout-sign"}
      style={{ position: "absolute", top: top + "px", left: left + "px" }}
    >
      {name ? name : "Наименование отсутствует"}
      <hr></hr>
      {startDate ? startDate : "Дата отсутствует"}
    </div>
  );
};
