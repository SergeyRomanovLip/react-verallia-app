import React, { useEffect, useContext, useState, useCallback } from 'react'
import { Map } from 'components/Map'
import { Toolbar } from 'components/toolbar/Toolbar'
import { getExistingMaps } from 'backend/firebaseConfig'
import { Loader } from 'components/misc/Loader'
import { AuthContext } from 'context/AuthContext'
import { ModalContext } from 'context/ModalContext'
import { AppContext } from 'context/AppContext'

export const MapPage = () => {
  const [preparedMap, setPreparedMap] = useState(null)
  const { user } = useContext(AuthContext)
  const [loaded, setLoaded] = useState(true)
  const { showModal } = useContext(ModalContext)
  const { setMapImage, ready, reboot } = useContext(AppContext)

  const getExistingMapsHandler = async (user) => {
    const res = await getExistingMaps(user)
    return res
  }
  const setPreparedMapHandler = useCallback(
    (map) => {
      if (map) {
        setMapImage(map.mapName)
        setPreparedMap(map.mapData)
        localStorage.setItem('map', JSON.stringify(map))
      }
    },
    [setMapImage]
  )

  useEffect(() => {
    setLoaded(false)
    getExistingMapsHandler(user)
      .then((res) => {
        if (res) {
          let existMap = {}
          for (let img in res) {
            existMap = {
              ...existMap,
              [img]: res[img]
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
            setPreparedMapHandler(existMap[Object.keys(existMap).join()])
          }
        }
      })
      .then(() => {
        setLoaded(true)
      })
  }, [reboot])

  return loaded ? (
    <>
      <Toolbar />
      {preparedMap && ready ? (
        <Map mapImage={preparedMap} />
      ) : (
        <h1 className={'center'}>
          {preparedMap ? (
            <Loader />
          ) : (
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => {
                showModal('UploadNewMap')
              }}
            >
              UPLOAD MAP
            </div>
          )}
        </h1>
      )}
    </>
  ) : (
    <Loader />
  )
}
