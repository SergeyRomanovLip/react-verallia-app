import React, { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../../context/ModalContext";
import { AppContext } from "../../../context/AppContext";

function SVGComponent({ ID, d }) {
  const { showModal } = useContext(ModalContext);
  const { appState } = useContext(AppContext);
  const [checked, setCheked] = useState(false);

  useEffect(() => {
    let checkedStat = [];
    if (appState.listOfAreas[ID]) {
      if (Object.keys(appState.listOfAreas[ID].listOfWorks).length > 0) {
        Object.keys(appState.listOfAreas[ID].listOfWorks).map((e) => {
          if (appState.listOfAreas[ID].listOfWorks[e].checked === "no") {
            return checkedStat.push(false);
          } else return checkedStat.push(true);
        });
      }
      if (checkedStat.includes(false)) {
        setCheked(false);
      } else {
        setCheked(true);
      }
    }
  }, [appState, ID]);

  return (
    <path
      id={ID}
      key={ID}
      onClick={() => {
        showModal("InfoSubc", ID);
      }}
      className={
        checked ? "SVGMapContainer-item" : "SVGMapContainer-itemUnchecked"
      }
      d={d}
    ></path>
  );
}

export default SVGComponent;
