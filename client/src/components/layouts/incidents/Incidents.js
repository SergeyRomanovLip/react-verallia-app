import React, { useContext } from "react";
import { ActualDataContext } from "../../redux/context";
import { IDgenerator } from "../../utilities/IDgenerator";
import { IncidentComponent } from "./IncidentComponent";

export const Incidents = ({ click }) => {
  const actualDataState = useContext(ActualDataContext).actualDataState;
  const actualDataDispatch = useContext(ActualDataContext).actualDataDispatch;

  let wrapperTop = actualDataState.wrapper.y;
  let wrapperleft = actualDataState.wrapper.x;

  const arrayOfIncidents = [];
  for (let incident in actualDataState.listOfIncidents) {
    arrayOfIncidents.push(actualDataState.listOfIncidents[incident]);
  }

  function addNewIncident(left, top) {
    let ID = IDgenerator();
    click("AcceptIncident", (options) => {
      actualDataDispatch([
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
