import React, { useState } from "react";

function GridCell({ setMouse, mouse, setTempChoiseCall }) {
  const [choised, setChoised] = useState();

  function choise(e) {
    if (mouse === true && choised !== true) {
      setChoised(true);
      setTempChoiseCall.set(e.target);
    }
  }

  return (
    <div
      className={choised === true ? "cell choisen" : "cell"}
      onMouseDown={(e) => {
        setChoised(true);
        choise(e);
        setMouse(true);
      }}
      onMouseOver={(e) => {
        choise(e);
      }}
      onMouseUp={(e) => {
        setMouse(false);
        setTempChoiseCall.clear();
      }}
    ></div>
  );
}
export default GridCell;
