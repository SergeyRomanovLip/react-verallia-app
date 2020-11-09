import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Loader } from "./components/Loader";
import { Toolbar } from "./components/Toolbar";
import { AuthContext } from "./context/AuthContext";
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
        {isAuthenticated && <Toolbar />}
        <div className="container">{routes}</div>
      </Router>
    </AuthContext.Provider>
  );
}
export default App;
