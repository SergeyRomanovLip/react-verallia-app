import React, { useContext, useRef, useEffect, useState, useCallback } from 'react'
import DrawSVGLayout from './layouts/drawSVG/DrawSVGLayout'
import { Incidents } from './layouts/incidents/Incidents'
import { ModalContext } from 'context/ModalContext'
import { AppContext } from 'context/AppContext'
import { useParams } from 'react-router-dom'
import { Loader } from './misc/Loader'
import { SubcLabelContainer } from './layouts/subcontractors/SubcLabelContainer'
import { UserLayouts } from './layouts/ownLayouts/UserLayouts'
import { useZoom } from 'hooks/useZoom'

export const Map = ({ mapImage }) => {
  const { showModal } = useContext(ModalContext)
  const { appDispatch, ready, mapWidth, mapHeight } = useContext(AppContext)
  const [wrapperState, setWrapperState] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [SVGReady, setSVGReady] = useState(false)
  const { layout } = useParams()
  const inputRef = useRef()
  const zoom = useZoom()

  const handlerSetSVGReady = useCallback(() => {
    setSVGReady(true)
  }, [])
  useEffect(() => {
    if (!ready) {
      setLoaded(false)
    }
    if (ready) {
      setWrapperState(false)
      appDispatch(['setLayout', layout])
      let rect = inputRef.current.getBoundingClientRect()
      rect.x = rect.x / zoom + window.scrollX / zoom
      rect.y = rect.y / zoom + window.scrollY / zoom
      appDispatch(['updateWrapperPosition', rect])
      setWrapperState(true)
      setLoaded(true)
    }
  }, [ready, appDispatch, layout, zoom])

  return (
    <div
      ref={inputRef}
      style={{ width: mapWidth * zoom + 'px', height: mapHeight * zoom + 'px', backgroundImage: `url(${mapImage})` }}
      className='mapWrapper'
    >
      {!loaded ? <Loader /> : null}
      {wrapperState && layout === 'incidents' ? <Incidents click={showModal} /> : null}
      {SVGReady && layout === 'subcontractors' ? <SubcLabelContainer /> : null}
      {wrapperState && layout === 'subcontractors' ? <DrawSVGLayout handlerSetSVGReady={handlerSetSVGReady} /> : null}
      {layout.split('||')[1] === 'user' ? (
        <UserLayouts
          layout={layout.split('||')[0]}
          wrapperState={wrapperState}
          SVGReady={SVGReady}
          handlerSetSVGReady={handlerSetSVGReady}
        />
      ) : null}
    </div>
  )
}

export default Map
