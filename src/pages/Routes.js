import React, { useContext, useEffect, useState } from 'react'
import { Switch, Route, Redirect, useHistory } from 'react-router-dom'
import { AppContext } from 'context/AppContext'
import { AuthContext } from 'context/AuthContext'
import { AuthPage } from './AuthPage'
import { MapPage } from './MapPage'
import { ProductPage } from './ProductPage'

export const Routes = () => {
  const { location } = useContext(AppContext)
  const { user } = useContext(AuthContext)
  const [loc, setLoc] = useState('/product/menu/')

  useEffect(() => {
    let existLoc = location.pathname
    if (!existLoc.split('/').includes('product')) {
      setLoc('/product/menu/')
    } else {
      setLoc(existLoc)
    }
  }, [])

  if (user) {
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
