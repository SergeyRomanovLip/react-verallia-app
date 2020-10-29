import React, { useReducer } from "react";
import { FirebaseContext } from "./frebaseContext";
import { firebaseReducer } from "./firebaseReducer";
import axios from "axios";
import { HIDE_LOADER, SHOW_LOADER } from "./types";

const url = "https://verallia-int-map-database.firebaseio.com";

export const FirebaseState = ({ children }) => {
  const initialState = {
    loading: false,
  };

  const [state, dispatch] = useReducer(firebaseReducer, initialState);

  const showLoader = () => {
    dispatch({ type: SHOW_LOADER });
  };
  const hideLoader = () => {
    dispatch({ type: HIDE_LOADER });
  };

  const getDBState = async () => {
    showLoader();
    try {
      const res = await axios.get(`${url}/state.json`);
      console.log("gettingData", res.data);
      return res;
    } catch (e) {
      throw new Error(e);
    } finally {
      hideLoader();
    }
  };
  const updateDBState = async (newState) => {
    showLoader();
    try {
      const res = await axios.put(`${url}/state.json`, newState);
      console.log("Sended to server data", res.data);
    } finally {
      hideLoader();
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        updateDBState,
        getDBState,
        showLoader,
        loading: state.loading,
        newState: state,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
