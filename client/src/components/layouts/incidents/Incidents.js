import React, { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import { IDgenerator } from "../../utilities/IDgenerator";
import { IncidentComponent } from "./IncidentComponent";

export const Incidents = ({ click }) => {
  const { appState, appDispatch } = useContext(AppContext);

  let wrapperTop = appState.wrapper.y;
  let wrapperleft = appState.wrapper.x;

  const arrayOfIncidents = [];
  for (let incident in appState.listOfIncidents) {
    arrayOfIncidents.push(appState.listOfIncidents[incident]);
  }

  function addNewIncident(left, top) {
    let ID = IDgenerator();
    click("AcceptIncident", (options) => {
      appDispatch([
        "addNewIncident",
        ID,
        {
          id: ID,
          left: left - wrapperleft,
          top: top - wrapperTop,
          name: options.name,
          description: options.description,
          type: options.type,
        },
      ]);
    });
  }

  return (
    <div
      onClick={(e) => {
        addNewIncident(e.pageX, e.pageY);
      }}
      className={"incidentLayout"}
    >
      {arrayOfIncidents.map((e, i) => {
        return (
          <IncidentComponent
            key={i}
            top={e.top}
            left={e.left}
            description={e.description}
            name={e.name}
            type={e.type}
          />
        );
      })}
    </div>
  );
};
