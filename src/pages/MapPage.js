import React from 'react'
import { ModalNew } from '../components/ModalNew'
import { AppState } from '../components/redux/AppState'
import { Map } from '../components/Map'
import { Toolbar } from '../components/Toolbar'

export const MapPage = () => {
  return (
    <>
      <ModalNew>
        <Toolbar />
        <Map />
      </ModalNew>
    </>
  )
}
