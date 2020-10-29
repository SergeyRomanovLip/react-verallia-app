import React, { useContext, useEffect, useRef, useState } from "react";
import { ActualDataContext } from "../../redux/context";

function SVGComponent({ ID, click, d }) {
  const actualDataDispatch = useContext(ActualDataContext).actualDataDispatch;
  const actualDataState = useContext(ActualDataContext).actualDataState;
  const inputRef = useRef();

  const [checked, setCheked] = useState(false);

  useEffect(() => {
    actualDataDispatch([
      "updateSizeOfArea",
      ID,
      {
        left:
          inputRef.current.getBoundingClientRect().x -
          actualDataState.wrapper.x,
        top:
          inputRef.current.getBoundingClientRect().y -
          actualDataState.wrapper.y,
        height: inputRef.current.getBoundingClientRect().height,
        width: inputRef.current.getBoundingClientRect().width,
      },
    ]);
  }, []);
  useEffect(() => {
    let checkedStat = [];
    if (Object.keys(actualDataState.listOfAreas[ID].listOfWorks).length > 0) {
      Object.keys(actualDataState.listOfAreas[ID].listOfWorks).map((e) => {
        if (actualDataState.listOfAreas[ID].listOfWorks[e].checked === "no") {
          checkedStat.push(false);
        } else checkedStat.push(true);
      });
    }
    if (checkedStat.includes(false)) {
      setCheked(false);
    } else {
      setCheked(true);
    }
  });

  return (
    <path
      ref={inputRef}
      key={ID}
      onClick={() => {
        click("InfoSubc", ID);
      }}
      className={
        checked ? "SVGMapContainer-item" : "SVGMapContainer-itemUnchecked"
      }
      d={d}
    ></path>
  );
}

export default SVGComponent;
