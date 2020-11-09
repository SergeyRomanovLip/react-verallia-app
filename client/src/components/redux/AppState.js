import React, {
  useReducer,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { AppContext } from "../../context/AppContext";
import { useHistory } from "react-router-dom";
import { useHttp } from "../../hooks/http.hook";
// import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { reducer } from "./reducer";
import { Loader } from "../Loader";

const url = "https://verallia-int-map-database.firebaseio.com";

export const AppState = ({ children }) => {
  const history = useHistory();
  const [ready, setReady] = useState(false);
  const [appState, appDispatch] = useReducer(reducer, {
    layout: "subcontractors",
    wrapper: true,
    listOfAreas: true,
    listOfIncidents: true,
  });
  const auth = useContext(AuthContext);
  const { request } = useHttp();

  const getMDBState = useCallback(async () => {
    try {
      const res = await request("/api/map/getState", "GET", null, {
        Authorization: `Bearer ${auth.token}`,
      });
      if (res) {
        return res;
      }
      return false;
    } catch (e) {
      return { error: e };
    }
  }, []);

  const updateMDBState = async (newState) => {
    try {
      const data = await request(
        "/api/map/update",
        "POST",
        { newState },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
    } catch (e) {}
  };

  useEffect(() => {
    getMDBState(appState).then((res) => {
      setReady(false);
      console.log("Start of pending data...");
      if (!res) {
        console.log("Новый state создан");
        appDispatch([
          "initialize",
          {
            _id: auth.userId,
            layout: "subcontractors",
            listOfAreas: true,
            listOfIncidents: true,
          },
        ]);
        setReady(true);
      } else if (res.error) {
        alert(res.error);
      } else {
        appDispatch(["initialize", res]);
        console.log("Data pended");
        setReady(true);
      }
    });
  }, []);

  useEffect(() => {
    if (ready) {
      console.log("Start of updating...");
      updateMDBState(appState).then(() => {
        console.log("Data updated");
      });
    }
  }, [appState.listOfAreas, appState.listOfIncidents]);

  return (
    <AppContext.Provider
      value={{
        appState,
        appDispatch,
        ready,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
