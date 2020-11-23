import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ModalNew } from 'components/ModalNew'
import { AppState } from 'components/redux/AppState'
import { AuthState } from 'components/redux/AuthState'
import { Routes } from 'pages/Routes'

function App() {
  return (
    <AuthState>
      <Router>
        <AppState>
          <ModalNew>
            <div className='container'>{<Routes />}</div>
          </ModalNew>
        </AppState>
      </Router>
    </AuthState>
  )
}
export default App
