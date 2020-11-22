import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from 'context/AppContext'
import SubcLabel from './SubcLabel'
import { useZoom } from 'hooks/useZoom'
import { isEmptyObj } from 'components/utilities/isEmptyObj'

export const SubcLabelContainer = ({ wrapper, layout }) => {
  const { appState, ready } = useContext(AppContext)
  const [updateLabels, setUpdateLabels] = useState(false)
  useEffect(() => {
    setUpdateLabels((prevState) => {
      return prevState ? false : true
    })
  }, [appState])

  const zoom = useZoom()
  const labels =
    isEmptyObj(appState.layouts) && appState.layouts[layout]
      ? Object.keys(appState.layouts[layout].listOfAreas).map((e, i) => {
          const data = document.querySelector(`#${e}`)
          if (data) {
            let rect = data.getBoundingClientRect()
            let top = rect.top - wrapper.y * zoom + rect.height / 8 + window.scrollY
            let left = rect.left - wrapper.x * zoom + rect.width / 2 + window.scrollX
            return <SubcLabel key={i} top={top} left={left} data={appState.layouts[layout].listOfAreas[e]} />
          }

          return null
        })
      : null

  return ready ? labels : null
}
