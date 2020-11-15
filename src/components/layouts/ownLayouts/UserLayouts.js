import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../context/AppContext'
import { UserDrawSVGLayout } from './UserDrawSVGLayout'

export const UserLayouts = ({ layout, wrapperState, SVGReady, handlerSetSVGReady }) => {
  const [layoutContent, setLayoutContent] = useState({
    type: false
  })
  const { appState } = useContext(AppContext)
  const [components, setComponents] = useState([])

  useEffect(() => {
    if (appState.userLayouts[layout]) {
      const componentData = appState.userLayouts[layout]
      setLayoutContent({
        type: componentData.type,
        name: componentData.name,
        fields: componentData.fields
      })
    } else {
      setLayoutContent({
        type: false
      })
    }
  }, [appState])

  useEffect(() => {
    if (layoutContent.type) {
      console.log(layoutContent.type)
      if (layoutContent.type === 'drawing') {
        setComponents(<UserDrawSVGLayout handlerSetSVGReady={handlerSetSVGReady} name={layoutContent.name}></UserDrawSVGLayout>)
      }
    }
  }, [layoutContent])

  return <>{components}</>
}
