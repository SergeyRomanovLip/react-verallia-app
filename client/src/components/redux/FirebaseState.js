import React, { useReducer, useContext, useState } from "react";
import { FirebaseContext } from "./frebaseContext";
import { firebaseReducer } from "./firebaseReducer";
import { useHistory } from "react-router-dom";
import { useHttp } from "../../hooks/http.hook";
import axios from "axios";
import { HIDE_LOADER, SHOW_LOADER } from "./types";
import { AuthContext } from "../../context/AuthContext";

const url = "https://verallia-int-map-database.firebaseio.com";

export const FirebaseState = ({ children }) => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const { request } = useHttp();
  const [link, setLink] = useState("");

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

  const updateMDBState = async (newState) => {
    console.log(newState);
    try {
      const data = await request(
        "api/map/update",
        "POST",
        { newState },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      history.push(`/map`);
    } catch (e) {}
  };

  return (
    <FirebaseContext.Provider
      value={{
        updateMDBState,
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
