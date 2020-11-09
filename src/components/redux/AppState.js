import axios from 'axios'
import React, { useReducer, useContext, useState, useEffect, useCallback } from 'react'
import { AppContext } from '../../context/AppContext'
import { reducer } from './reducer'
import { generateStateDocument, getExistingState, writeStateLog } from '../../firebaseConfig'
import { AuthContext } from '../../context/AuthContext'

export const AppState = ({ children }) => {
  const url = 'https://verallia-int-map-database.firebaseio.com'
  const [ready, setReady] = useState(false)
  const [appState, appDispatch] = useReducer(reducer, {
    layout: 'subcontractors',
    wrapper: true,
    listOfAreas: {},
    listOfIncidents: {}
  })
  const { user } = useContext(AuthContext)

  const initializing = () => {
    setReady(false)
    getExistingState(user).then((res) => {
      console.log('Start of pending data...')
      if (!res) {
        console.log('Новый state создан')
        appDispatch([
          'initialize',
          {
            _id: {},
            layout: 'subcontractors',
            listOfAreas: {},
            listOfIncidents: {}
          }
        ])
      } else if (res.error) {
        alert(res.error)
      } else {
        appDispatch(['initialize', res])
        console.log('Data pended')
        // }
        setReady(true)
      }
    })
  }

  const updating = () => {
    if (ready) {
      if (appState.listOfAreas && appState.listOfIncidents) {
        console.log('Start of updating...')
        generateStateDocument(user, {
          layout: appState.layout,
          listOfAreas: appState.listOfAreas,
          listOfIncidents: appState.listOfIncidents
        })
          .then(() => {
            writeStateLog(user, {
              layout: appState.layout,
              listOfAreas: appState.listOfAreas,
              listOfIncidents: appState.listOfIncidents
            })
          })
          .then(() => {
            console.log('Data updated')
          })
      }
    }
  }

  useEffect(initializing, [])

  useEffect(updating, [appState.listOfAreas, appState.listOfIncidents])

  return (
    <AppContext.Provider
      value={{
        appState,
        appDispatch,
        ready
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
