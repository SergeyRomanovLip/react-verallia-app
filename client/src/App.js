import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { FirebaseState } from "./components/redux/FirebaseState";
import DataBaseLoading from "./DataBaseLoading";
import { useRouts } from "./pages/routes";

function App() {
  const routes = useRouts(false);

  return (
    <Router>
      <div>{routes}</div>
    </Router>

    // <FirebaseState>
    //   <DataBaseLoading />
    // </FirebaseState>
  );
}
export default App;
