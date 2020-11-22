import React, { useReducer, useContext, useState, useEffect } from 'react'
import { AppContext } from 'context/AppContext'
import { reducer } from './reducer'
import { generateStateDocument, getExistingState, writeStateLog } from 'backend/firebaseConfig'
import { AuthContext } from 'context/AuthContext'
import { useLocation, useParams } from 'react-router-dom'

export const AppState = ({ children }) => {
  const location = useLocation()
  const [ready, setReady] = useState(false)
  const [updated, setUpdated] = useState(false)
  const [reboot, setReboot] = useState(false)
  const [mapImage, setMapImage] = useState(null)
  const [appState, appDispatch] = useReducer(reducer, {
    layouts: {}
  })

  const { user } = useContext(AuthContext)
  const [color, setColor] = useState()

  const initializing = () => {
    setReady(false)
    if (user) {
      getExistingState(user, mapImage).then((res) => {
        console.log('Start of pending data...')
        if (!res) {
          console.log('Новый state создан')
          appDispatch([
            'initialize',
            {
              layouts: {}
            }
          ])
          setReady(true)
          setUpdated(true)
        } else {
          console.log('Второй путь, диспатчинг с сервера')
          appDispatch(['initialize', res])
          console.log('Data pended')
          setReady(true)
          setUpdated(true)
        }
      })
    }
  }
  const appReboot = () => {
    setReboot(reboot ? false : true)
  }
  const updateState = () => {
    if (ready) {
      setUpdated(false)
      console.log('Start of updating...')
      generateStateDocument(user, { layouts: appState.layouts }, mapImage)
        // .then(() => {
        //   writeStateLog(user, { layouts })
        // })
        .then(() => {
          console.log('Data updated')
          setUpdated(true)
        })
    }
  }

  useEffect(initializing, [user, mapImage])
  useEffect(updateState, [appState.layouts])
  useEffect(() => {
    let layout = location.pathname.substr(location.pathname.lastIndexOf('/') + 1)
    if (appState.layouts && appState.layouts[layout]) {
      setColor(appState.layouts[layout].color)
    }
  }, [appState])
  return (
    <AppContext.Provider
      value={{
        location,
        updated,
        appState,
        appDispatch,
        ready,
        appReboot,
        reboot,
        mapImage,
        setMapImage,
        color
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
