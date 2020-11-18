import React from 'react'
import ReactDOM from 'react-dom'
import 'sass/App.sass'
import 'sass/loader.sass'
import 'sass/map.sass'
import 'sass/miscellaneous.sass'
import 'sass/toolbar.sass'
import 'sass/Auth.sass'
import 'sass/toolbarVertical.sass'
import 'react-datetime/css/react-datetime.css'
import 'sass/Animations.sass'
import App from 'App'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
