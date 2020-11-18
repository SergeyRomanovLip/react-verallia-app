import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from 'context/AppContext'
import { UserLabel } from './UserLabel'

export const UserLabelContainer = ({ name, color }) => {
  const { appState, ready } = useContext(AppContext)
  const [arrayOfAreas, setArrayOfAreas] = useState([])
  const [labels, setLabels] = useState([])

  useEffect(() => {
    const arrayOfAreas = []
    for (let area in appState.userLayouts[name].listOfAreas) {
      arrayOfAreas.push(appState.userLayouts[name].listOfAreas[area])
    }
    setArrayOfAreas(arrayOfAreas)
  }, [appState, name])

  useEffect(() => {
    const labels = arrayOfAreas.map((e, i) => {
      const data = document.querySelector(`#${e.id}`)
      if (data) {
        let rect = data.getBoundingClientRect()
        let top = rect.top - appState.wrapper.y + rect.height / 8 + window.scrollY
        let left = rect.left - appState.wrapper.x + rect.width / 2 + window.scrollX
        return <UserLabel key={i} top={top} left={left} dataForLabel={e} color={color} />
      }
      return null
    })
    setLabels(labels)
  }, [arrayOfAreas])

  return ready ? labels : null
}
