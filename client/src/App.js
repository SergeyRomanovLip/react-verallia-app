import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { FirebaseState } from './components/redux/FirebaseState'
import { AuthContext } from './context/AuthContext'
import DataBaseLoading from './DataBaseLoading'
import { useAuth } from './hooks/auth.hook'
import { useRouts } from './pages/routes'

function App() {
  const { token, login, logout, userId } = useAuth()
  const isAuthenticated = !!token
  const routes = useRouts(isAuthenticated)

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

    // <FirebaseState>
    //   <DataBaseLoading />
    // </FirebaseState>
  )
}
export default App
