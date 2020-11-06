import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Loader } from "./components/Loader";
import { Navbar } from "./components/Navbar";
import { FirebaseState } from "./components/redux/FirebaseState";
// import { Loader } from './components/utilities/Loader'
import { AuthContext } from "./context/AuthContext";
import DataBaseLoading from "./DataBaseLoading";
import { useAuth } from "./hooks/auth.hook";
import { useRouts } from "./pages/routes";

function App() {
  const { token, login, logout, userId, ready } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRouts(isAuthenticated);

  if (!ready) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        userId,
        isAuthenticated,
      }}
    >
      <Router>
        {isAuthenticated && <Navbar />}
        <div className="container">{routes}</div>
      </Router>
    </AuthContext.Provider>
  );
}
export default App;
