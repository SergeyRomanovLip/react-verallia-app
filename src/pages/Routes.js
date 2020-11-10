import React, { useContext, useEffect, useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { AuthPage } from './AuthPage'
import { MapPage } from './MapPage'

export const Routes = () => {
  const { user } = useContext(AuthContext)
  const [isAtuh, setIsAuth] = useState(false)

  useEffect(() => {
    if (user) {
      user.uid ? setIsAuth(true) : setIsAuth(false)
    } else {
      setIsAuth(false)
    }
  }, [user])

  if (isAtuh) {
    return (
      <Switch>
        <Route path={`/map/:layout`} exact>
          <MapPage />
        </Route>
        <Redirect to='/map/subcontractors' />
      </Switch>
    )
  } else {
    return (
      <Switch>
        <Route path='/:type' exact>
          <AuthPage />
        </Route>
        <Route path='/:type' exact>
          <AuthPage />
        </Route>
        <Redirect to='/signIn' />
      </Switch>
    )
  }
}
