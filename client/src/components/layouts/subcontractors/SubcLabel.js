import React, { useContext, useEffect, useState } from "react";
import { ActualDataContext } from "../../redux/context";

function SubcLabel({ options }) {
  const [data, setData] = useState(0);
  const actualDataState = useContext(ActualDataContext).actualDataState;
  const dataOfArea = actualDataState.listOfAreas[options.id].listOfWorks;

  useEffect(() => {
    let works = 0;
    for (let work in dataOfArea) {
      works += 1;
      setData(works);
    }
  });

  let sizes = options.size;
  let top = sizes.top + sizes.height / 8;
  let left = sizes.left + sizes.width / 2;

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
