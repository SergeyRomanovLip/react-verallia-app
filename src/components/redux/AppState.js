import React, { useReducer, useContext, useState, useEffect } from 'react'
import { AppContext } from 'context/AppContext'
import { reducer } from './reducer'
import { generateStateDocument, getExistingState, writeStateLog } from 'backend/firebaseConfig'
import { AuthContext } from 'context/AuthContext'
import { useLocation } from 'react-router-dom'

export const AppState = ({ children }) => {
  const location = useLocation()
  const [ready, setReady] = useState(false)
  const [updated, setUpdated] = useState(false)
  const [reboot, setReboot] = useState(false)
  const [mapImage, setMapImage] = useState(null)
  const [mapWidth, setMapWidth] = useState(1800)
  const [mapHeight, setMapHeight] = useState(1800)
  const [appState, appDispatch] = useReducer(reducer, {
    wrapper: true,
    listOfAreas: {},
    listOfIncidents: {},
    userLayouts: {},
  })
  const { user } = useContext(AuthContext)

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
              _id: {},
              // layout: 'subcontractors',
              listOfAreas: {},
              listOfIncidents: {},
              userLayouts: {},
            },
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
      if (appState.listOfAreas && appState.listOfIncidents) {
        console.log('Start of updating...')
        generateStateDocument(
          user,
          {
            // layout: appState.layout,
            listOfAreas: appState.listOfAreas,
            listOfIncidents: appState.listOfIncidents,
            userLayouts: appState.userLayouts,
          },
          mapImage
        )
          .then(() => {
            writeStateLog(user, {
              // layout: appState.layout,
              listOfAreas: appState.listOfAreas,
              listOfIncidents: appState.listOfIncidents,
              userLayouts: appState.userLayouts,
            })
          })
          .then(() => {
            console.log('Data updated')
            setUpdated(true)
          })
      }
      console.log(window.location.pathname)
    }
  }

  useEffect(initializing, [user, mapImage])
  useEffect(updateState, [appState.listOfAreas, appState.listOfIncidents, appState.userLayouts])
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
        mapWidth,
        mapHeight,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
