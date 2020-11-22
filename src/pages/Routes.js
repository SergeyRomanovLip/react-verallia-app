import React, { useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { AppContext } from 'context/AppContext'
import { AuthContext } from 'context/AuthContext'
import { AuthPage } from './AuthPage'
import { MapPage } from './MapPage'
import { ProductPage } from './ProductPage'

export const Routes = () => {
  const { location } = useContext(AppContext)
  const { user } = useContext(AuthContext)

  if (user) {
    let loc = location.pathname
    if (!loc.includes('/product')) {
      loc = '/product/menu/'
    }
    return (
      <Switch>
        <Route path='/product/map/:layout' exact>
          <MapPage />
        </Route>
        <Route path='/product/menu/' exact>
          <ProductPage />
        </Route>
        <Redirect to={loc} />
      </Switch>
    )
  } else {
    return (
      <Switch>
        <Route path='/auth/:type' exact>
          <AuthPage />
        </Route>
        <Redirect to='/auth/signIn/' />
      </Switch>
    )
  }
}
