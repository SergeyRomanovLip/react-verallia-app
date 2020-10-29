import React, { useContext, useState } from "react";
import { IDgenerator } from "../../utilities/IDgenerator";
import { ActualDataContext } from "../../redux/context";
import SVGComponent from "./SVGComponent";
import { FirebaseContext } from "../../redux/frebaseContext";

function DrawSVGLayout({ click }) {
  const { actualDataState, actualDataDispatch } = useContext(ActualDataContext);
  const [throttleState, setThrottleState] = useState(false);
  const [drawingStat, setDrawingStat] = useState(false);
  const [drawingSVG, setDrawingSVG] = useState("");

  let wrapperTop = actualDataState.wrapper.y;
  let wrapperleft = actualDataState.wrapper.x;
  let timesPerSecond = 13;

  let myAttr = {
    d: "",
    set(e) {
      this.d = this.d + e;
      setDrawingSVG(drawingSVG + this.d);
    },
  };

  function throttle(e) {
    if (!throttleState) {
      drawing(e, "drawing");
      setThrottleState(true);
      setTimeout(function () {
        setThrottleState(false);
      }, 1000 / timesPerSecond);
    }
  }

  function drawing(e, state) {
    if (state === "start") {
      setDrawingStat(true);
      myAttr.set(`M ${e.pageX - wrapperleft} ${e.pageY - wrapperTop}`);
    }
    if (drawingStat === true) {
      switch (state) {
        case "drawing":
          myAttr.set(`L ${e.pageX - wrapperleft} ${e.pageY - wrapperTop}`);
          break;
        case "finish":
          setDrawingStat(false);
          if (drawingSVG.length > 50) {
            let ID = IDgenerator();
            click("AcceptSVG", (name) => {
              actualDataDispatch([
                "addNewArea",
                ID,
                {
                  id: ID,
                  name: name,
                  checked: true,
                  listOfWorks: true,
                  svg: [drawingSVG + "Z"],
                },
              ]);
            });
          }
          setDrawingSVG("");
          break;
      }
    }
  }

  const arrayOfAreas = [];
  for (let area in actualDataState.listOfAreas) {
    arrayOfAreas.push(actualDataState.listOfAreas[area]);
  }
  return (
    <svg
      className="SVGMapContainer"
      viewBox="0 0 800 1130"
      xmlSpace="http://www.w3.org/2000/svg"
      onMouseDown={(e) => {
        drawing(e, "start");
      }}
      onMouseMove={(e) => {
        if (drawingStat) {
          throttle(e);
        }
      }}
      onMouseUp={(e) => {
        drawing(e, "finish");
      }}
    >
      <path d={drawingSVG}></path>
      {arrayOfAreas.length > 0
        ? arrayOfAreas.map((e) => {
            return (
              <SVGComponent key={e.id} ID={e.id} click={click} d={e.svg} />
            );
          })
        : null}
    </svg>
  );
}

export default DrawSVGLayout;
