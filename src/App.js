import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ModalNew } from 'components/ModalNew'
import { AppState } from 'components/redux/AppState'
import { AuthState } from 'components/redux/AuthState'
import { Routes } from 'pages/Routes'

function App() {
  return (
    <AuthState>
      <AppState>
        <ModalNew>
          <Router>
            <div className='container'>{<Routes />}</div>
          </Router>
        </ModalNew>
      </AppState>
    </AuthState>
  )
}
export default App
