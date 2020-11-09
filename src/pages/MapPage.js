import React from 'react'
import { ModalNew } from '../components/ModalNew'
import { AppState } from '../components/redux/AppState'
import { Map } from '../components/Map'

export const MapPage = () => {
  return (
    <>
      <AppState>
        <ModalNew>
          <Map />
        </ModalNew>
      </AppState>
    </>
  )
}
