import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "context/AppContext";

function SubcLabel({ left, top, listOfWorks }) {
  const [data, setData] = useState(0);
  const [color, setColor] = useState("");
  const { appState } = useContext(AppContext);
  useEffect(() => {
    let works = 0;
    let checked = [];
    for (let work in listOfWorks) {
      if (work !== "updated") {
        works += 1;
        setData(works);
        if (listOfWorks[work].checked === "no") {
          checked.push(listOfWorks[work]);
        }
      }
    }
    checked.length > 0 ? setColor("purple") : setColor("");
  }, [appState, listOfWorks]);
  return (
    <div
      className={`works-sign ${color}`}
      style={{ position: ["absolute"], top: top + "px", left: left + "px" }}
    >
      Companies - {data}
    </div>
  );
}

export default SubcLabel;
