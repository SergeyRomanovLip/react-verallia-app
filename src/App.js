import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthState } from './components/redux/AuthState'
import { Routes } from './pages/Routes'

function App() {
  return (
    <AuthState>
      <Router>
        <div className='container'>{<Routes />}</div>
      </Router>
    </AuthState>
  )
}
export default App
