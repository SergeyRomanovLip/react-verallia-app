import React, { useContext, useState, useEffect } from "react";
import InteractiveMap from "./InteractiveMap";
import { FirebaseContext } from "./components/redux/frebaseContext";
import { Loader } from "./components/utilities/Loader";

export function DataBaseLoading() {
  const [ready, setReady] = useState(false);
  const [initialState, setInitialState] = useState();
  const { loading, getDBState } = useContext(FirebaseContext);

  useEffect(() => {
    getDBState().then((res) => {
      if (res.data !== null) {
        setInitialState(res.data);
        setReady(true);
      } else {
        setInitialState({
          layout: "subcontractors",
          wrapper: true,
          listOfAreas: true,
          listOfIncidents: true,
        });
        setReady(true);
      }
    });
  }, []);

  return ready ? (
    <InteractiveMap initialState={initialState}>
      {loading ? <Loader></Loader> : null}
    </InteractiveMap>
  ) : (
    <Loader />
  );
}

export default DataBaseLoading;
