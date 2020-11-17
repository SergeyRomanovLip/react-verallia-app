import React, { useEffect, useContext, useState } from 'react'
import { ModalNew } from '../components/ModalNew'
import { Map } from '../components/Map'
import { Toolbar } from '../components/Toolbar'
import { getExistingMaps } from '../firebaseConfig'
import { Loader } from '../components/Loader'
import { AuthContext } from '../context/AuthContext'

export const MapPage = () => {
  const [preparedMap, setPreparedMap] = useState(null)
  const { user } = useContext(AuthContext)
  const [loaded, setLoaded] = useState(true)

  const getExistingMapsHandler = async (user) => {
    const res = await getExistingMaps(user)
    return res
  }

  useEffect(() => {
    setLoaded(false)
    console.log(user)
    getExistingMapsHandler(user)
      .then((res) => {
        if (res) {
          let existMap = []
          for (let img in res) {
            existMap.push(res[img].mapData)
          }
          if (existMap.length > 1) {
            console.log('У вас несколько карт, показана первая')
            setPreparedMap(existMap[0])
          } else {
            setPreparedMap(existMap[0])
          }
        } else {
          setPreparedMap(null)
        }
      })
      .then(() => {
        setLoaded(true)
      })
  }, [])

  return loaded ? (
    <ModalNew>
      <Toolbar />
      {preparedMap ? <Map mapImage={preparedMap} /> : <h1 className={'center'}>YOU SHOULD UPLOAD MAP</h1>}
    </ModalNew>
  ) : (
    <Loader />
  )
}
