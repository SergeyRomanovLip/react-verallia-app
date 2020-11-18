import React, { useContext, useEffect, useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Loader } from 'components/misc/Loader'
import { AppContext } from 'context/AppContext'
import { AuthContext } from 'context/AuthContext'
import { useWindowSize } from 'hooks/useWindowSize'
import { AuthPage } from './AuthPage'
import { MapPage } from './MapPage'
import { ProductPage } from './ProductPage'

export const Routes = () => {
  const { location, reboot } = useContext(AppContext)
  const { user } = useContext(AuthContext)
  const [resized, setResized] = useState(true)
  const size = useWindowSize()

  const throttleResize = () => {
    setTimeout(() => {
      if (resized) {
        setResized(false)
        setTimeout(function () {
          setResized(true)
        }, 1000)
      }
    })
  }

  useEffect(throttleResize, [size, reboot])

  if (user) {
    let loc = location.pathname
    if (!loc.includes('/product')) {
      loc = '/product/menu'
    }
    return resized ? (
      <Switch>
        <Route path='/product/map/:layout' exact>
          <MapPage />
        </Route>
        <Route path='/product/menu' exact>
          <ProductPage />
        </Route>
        <Redirect to={loc} />
      </Switch>
    ) : (
      <Loader />
    )
  } else {
    return (
      <Switch>
        <Route path='/auth/:type' exact>
          <AuthPage />
        </Route>
        <Redirect to='/auth/signIn' />
      </Switch>
    )
  }
}
