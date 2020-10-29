import React, { useContext, useState, useEffect } from "react";
import { ActualDataContext } from "../../../App";
import GridCell from "./GridCell";
import GridModal from "./GridModal";

function GridLayout({ click }) {
  const [mouse, setMouse] = useState(false);
  const [tempChoise, setTempChoise] = useState([]);
  const actualDataState = useContext(ActualDataContext).actualDataState;

  let tempChoosen = [];

  const setTempChoiseCall = {
    set(choosen) {
      tempChoosen.push(choosen);
    },
    clear() {
      setTempChoise(tempChoosen);
      tempChoosen = [];
      click("GridAccept", null);
    },
  };

  function createCell(rows) {
    let array = [];
    let i = 0;
    while (i < rows) {
      array.push(
        <GridCell
          setMouse={setMouse}
          mouse={mouse}
          setTempChoiseCall={setTempChoiseCall}
        />
      );
      i++;
    }
    return array;
  }
  function createRow(columns, rows) {
    let array = [];
    let i = 0;
    while (i < columns) {
      array.push(
        <div
          style={{
            position: ["relative"],
            height: [15 + "px"],
            width: [15 + "px"],
          }}
        >
          {createCell(rows)}
        </div>
      );
      i++;
    }
    return (
      <div style={{ display: ["flex"], flexDirection: ["inline"] }}>
        {array}
      </div>
    );
  }
  function createGrid(columns, rows) {
    return createRow(columns, rows);
  }

  if (actualDataState.wrapper !== undefined) {
    const wrapper = {
      height: actualDataState.wrapper.height,
      width: actualDataState.wrapper.width,
    };
    let columns = wrapper.width / 15;
    let rows = wrapper.height / 15;

    return createGrid(columns, rows);
  } else {
    return null;
  }
}
export default GridLayout;
