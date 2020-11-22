import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AppContext } from 'context/AppContext'
import { UserLabel } from './UserLabel'
import { useZoom } from 'hooks/useZoom'

export const LabelContainer = ({ wrapper, name, color }) => {
  const { appState, ready } = useContext(AppContext)
  const [arrayOfAreas, setArrayOfAreas] = useState([])
  const [labels, setLabels] = useState([])
  const zoom = useZoom()

  useEffect(() => {
    const arrayOfAreas = []
    for (let area in appState.userLayouts[name].listOfAreas) {
      arrayOfAreas.push(appState.userLayouts[name].listOfAreas[area])
    }
    setArrayOfAreas(arrayOfAreas)
  }, [appState, name])

  const getArrayOfAreas = useCallback(
    (e, i) => {
      const data = document.querySelector(`#${e.id}`)
      if (data) {
        let rect = data.getBoundingClientRect()
        let top = rect.top - appState.wrapper.y * zoom + rect.height / 8 + window.scrollY
        let left = rect.left - appState.wrapper.x * zoom + rect.width / 2 + window.scrollX
        return <UserLabel key={i} top={top} left={left} dataForLabel={e} color={color} />
      }
      return null
    },
    [appState.wrapper.y, appState.wrapper.x, color]
  )

  useEffect(() => {
    const labels = arrayOfAreas.map((e, i) => {
      return getArrayOfAreas(e, i)
    })
    setLabels(labels)
  }, [arrayOfAreas, getArrayOfAreas])

  return ready ? labels : null
}
