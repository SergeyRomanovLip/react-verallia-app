import React from "react";
import { FirebaseState } from "./components/redux/FirebaseState";
import DataBaseLoading from "./DataBaseLoading";

function App() {
  return (
    <FirebaseState>
      <DataBaseLoading />
    </FirebaseState>
  );
}
export default App;
