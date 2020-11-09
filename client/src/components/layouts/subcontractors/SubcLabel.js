import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";

function SubcLabel({ left, top, listOfWorks }) {
  const [data, setData] = useState(0);
  const { appState } = useContext(AppContext);
  useEffect(() => {
    let works = 0;
    for (let work in listOfWorks) {
      if (work != "updated") {
        works += 1;
        setData(works);
      }
    }
  }, [appState]);
  return (
    <div
      className="works-sign"
      style={{ position: ["absolute"], top: top + "px", left: left + "px" }}
    >
      Companies - {data}
    </div>
  );
}

export default SubcLabel;
