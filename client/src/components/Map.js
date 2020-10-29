//Сделать отдельный компонент "элемент карты"
//Сделать отдельный компонент "tooltip"
import React, { useContext, useRef, useEffect, useState } from "react";
import { ActualDataContext } from "./redux/context";
import DrawSVGLayout from "./layouts/drawSVG/DrawSVGLayout";
import { Incidents } from "./layouts/incidents/Incidents";
import SubcLabel from "./layouts/subcontractors/SubcLabel";

function Map({ clickOnRoom }) {
  const actualDataContext = useContext(ActualDataContext);
  const actualDataState = useContext(ActualDataContext).actualDataState;
  const layout = useContext(ActualDataContext).actualDataState.layout;

  const [wrapperState, setWrapperState] = useState(false);

  const inputRef = useRef();
  let actualDataStateArray = [];

  useEffect(() => {
    actualDataContext.actualDataDispatch([
      "updateWrapperPosition",
      inputRef.current.getBoundingClientRect(),
    ]);
    setWrapperState(true);
    window.addEventListener("resize", () => {
      actualDataContext.actualDataDispatch([
        "updateWrapperPosition",
        inputRef.current.getBoundingClientRect(),
      ]);
    });
  }, []);

  for (let el in actualDataState) {
    if (el !== "wrapper") {
      actualDataStateArray.push([[el], actualDataState[el]]);
    }
  }

  return (
    <div ref={inputRef} className="mapWrapper">
      {wrapperState && layout === "incidents" ? (
        <Incidents click={clickOnRoom} />
      ) : null}

      {wrapperState && layout === "subcontractors"
        ? Object.keys(actualDataState.listOfAreas).map((e, i) => {
            if (actualDataState.listOfAreas[e].size) {
              return (
                <SubcLabel key={i} options={actualDataState.listOfAreas[e]} />
              );
            }
          })
        : null}
      {wrapperState && layout === "subcontractors" ? (
        <DrawSVGLayout click={clickOnRoom} />
      ) : null}
    </div>
  );
}

export default Map;
