import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from 'context/AppContext'
import { UserDrawSVGLayout } from './UserDrawSVGLayout'
import { UserLabelContainer } from './UserLabelContainer'

export const UserLayouts = ({ layout, wrapperState, SVGReady, handlerSetSVGReady }) => {
  const [layoutContent, setLayoutContent] = useState({
    type: false,
  })
  const { appState } = useContext(AppContext)
  const [components, setComponents] = useState([])

  useEffect(() => {
    if (appState.userLayouts) {
      if (appState.userLayouts[layout]) {
        const componentData = appState.userLayouts[layout]
        setLayoutContent({
          type: componentData.hasOwnProperty('type') ? componentData.type : null,
          name: componentData.hasOwnProperty('name') ? componentData.name : null,
          fields: componentData.hasOwnProperty('fields') ? componentData.fields : null,
          color: componentData.hasOwnProperty('color') ? componentData.color : null,
        })
      } else {
        setLayoutContent({
          type: false,
        })
      }
    }
  }, [appState, layout])

  useEffect(() => {
    if (layoutContent.type) {
      if (layoutContent.type === 'drawing') {
        setComponents(
          <>
            <UserDrawSVGLayout
              color={layoutContent.color}
              handlerSetSVGReady={handlerSetSVGReady}
              name={layoutContent.name}
            ></UserDrawSVGLayout>
            <UserLabelContainer name={layoutContent.name} color={layoutContent.color}></UserLabelContainer>
          </>
        )
      }
    }
  }, [layoutContent])

  return <>{components}</>
}
