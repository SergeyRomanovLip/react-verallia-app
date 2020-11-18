import React, { useEffect, useContext, useState } from 'react'
import { Map } from 'components/Map'
import { Toolbar } from 'components/toolbar/Toolbar'
import { getExistingMaps } from 'backend/firebaseConfig'
import { Loader } from 'components/misc/Loader'
import { AuthContext } from 'context/AuthContext'
import { ModalContext } from 'context/ModalContext'

export const MapPage = () => {
  const [preparedMap, setPreparedMap] = useState(null)
  const { user } = useContext(AuthContext)
  const [loaded, setLoaded] = useState(true)
  const { showModal } = useContext(ModalContext)

  const getExistingMapsHandler = async (user) => {
    const res = await getExistingMaps(user)
    return res
  }
  const setPreparedMapHandler = (map) => {
    if (map) {
      setPreparedMap(map.mapData)
      localStorage.setItem('map', JSON.stringify(map))
    }
  }

  useEffect(() => {
    setLoaded(false)
    getExistingMapsHandler(user)
      .then((res) => {
        if (res) {
          let existMap = {}
          for (let img in res) {
            existMap = {
              ...existMap,
              [img]: res[img],
            }
          }
          return existMap
        } else {
          setPreparedMap(null)
          return null
        }
      })
      .then((existMap) => {
        if (existMap) {
          if (Object.keys(existMap).length > 1) {
            showModal('ChooseMap', { existMap, setPreparedMapHandler })
          } else {
            setPreparedMapHandler(
              existMap[
                Object.keys(existMap).map((e) => {
                  return e
                })
              ]
            )
          }
        }
      })
      .then(() => {
        setLoaded(true)
      })
  }, [])

  return loaded ? (
    <>
      <Toolbar />
      {preparedMap ? <Map mapImage={preparedMap} /> : <h1 className={'center'}>YOU SHOULD UPLOAD MAP</h1>}
    </>
  ) : (
    <Loader />
  )
}
