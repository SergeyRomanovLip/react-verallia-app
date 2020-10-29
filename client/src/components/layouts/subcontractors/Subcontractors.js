import React, { useContext } from "react";
import { ActualDataContext } from "./../../../App";
import SubcLabel from "./SubcLabel";

function Subcontractors() {
  const actualDataContext = useContext(ActualDataContext);
  let labels = [];
  if (Object.keys(actualDataContext.actualDataState).length > 0) {
    for (let room in actualDataContext.actualDataState) {
      if (room !== "wrapper") {
        if (
          Object.keys(actualDataContext.actualDataState[room].listOfWorks)
            .length > 0
        ) {
          console.log(actualDataContext.actualDataState[room]);

          let dangerousLevel = 0;
          let qantityOfSbcCompanies = 0;
          let qantityOfSbcEmployees = 0;

          for (let works in actualDataContext.actualDataState[room]
            .listOfWorks) {
            if (
              actualDataContext.actualDataState[room].listOfWorks[works]
                .checked === false
            ) {
              dangerousLevel += 1;
            }
            qantityOfSbcCompanies += 1;
            if (
              actualDataContext.actualDataState[room].listOfWorks[works]
                .workerQuantityInput
            ) {
              qantityOfSbcEmployees += Number(
                actualDataContext.actualDataState[room].listOfWorks[works]
                  .workerQuantityInput
              );
            }
            for (let type in actualDataContext.actualDataState[room]
              .listOfWorks[works].typesOfWorks) {
              if (
                actualDataContext.actualDataState[room].listOfWorks[works]
                  .typesOfWorks[type] === true
              ) {
              }
            }
          }
          if (
            Object.keys(actualDataContext.actualDataState[room].listOfWorks)
              .length > 1
          ) {
            dangerousLevel =
              dangerousLevel *
              Object.keys(actualDataContext.actualDataState[room].listOfWorks)
                .length;
          }
          labels.push({
            room: room,
            sizes: actualDataContext.actualDataState[room].roomSizes,
            wrapper: actualDataContext.actualDataState,
            dangerousLevel: dangerousLevel,
            qantityOfSbcCompanies: qantityOfSbcCompanies,
            qantityOfSbcEmployees: qantityOfSbcEmployees,
          });
        }
      }
    }
  }
  return labels
    ? labels.map((e, i) => {
        console.log(e);
        return <SubcLabel key={i} options={e} />;
      })
    : null;
}

export default Subcontractors;
