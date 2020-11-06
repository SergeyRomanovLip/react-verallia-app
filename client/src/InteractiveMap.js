import React, { useEffect, useReducer, useState, useContext } from "react";
import Toolbar from "./components/Toolbar";
import Map from "./components/Map";
import Modal from "./components/Modal";
import "react-datetime/css/react-datetime.css";
import { reducer } from "./components/redux/reducer";
import { ActualDataContext } from "./components/redux/context";
import { FirebaseContext } from "./components/redux/frebaseContext";

function InteractiveMap({ initialState }) {
  const { loading, updateDBState, updateMDBState } = useContext(
    FirebaseContext
  );

  const [actualData, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!loading) {
      updateDBState(actualData);
      updateMDBState(actualData);
    }
  }, [actualData]);

  const [modalState, setModalState] = useState({
    type: null,
    content: null,
  });

  function click(type, options) {
    setModalState({
      type: type,
      content: options,
    });
  }
  function removeModal() {
    setModalState({
      type: null,
      content: null,
    });
  }

  return (
    <ActualDataContext.Provider
      value={{
        actualDataState: actualData,
        actualDataDispatch: dispatch,
      }}
    >
      <Toolbar />
      <Map clickOnRoom={click} />
      <Modal click={click} modalState={modalState} remove={removeModal} />
    </ActualDataContext.Provider>
  );
}

export default InteractiveMap;
