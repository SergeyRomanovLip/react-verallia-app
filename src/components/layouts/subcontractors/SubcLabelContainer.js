import React, { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import SubcLabel from "./SubcLabel";

export const SubcLabelContainer = () => {
  const { appState, ready } = useContext(AppContext);

  const labels = Object.keys(appState.listOfAreas).map((e, i) => {
    if (appState.listOfAreas[e].listOfWorks) {
      const data = document.querySelector(`#${appState.listOfAreas[e].id}`);
      if (data) {
        let rect = data.getBoundingClientRect();
        let top =
          rect.top - appState.wrapper.y + rect.height / 8 + window.scrollY;
        let left =
          rect.left - appState.wrapper.x + rect.width / 2 + window.scrollX;
        return (
          <SubcLabel
            key={i}
            top={top}
            left={left}
            listOfWorks={appState.listOfAreas[e].listOfWorks}
          />
        );
      }
    }
    return null;
  });

  return ready ? labels : null;
};
