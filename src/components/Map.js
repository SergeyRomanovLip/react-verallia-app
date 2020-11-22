import React, { useContext, useRef, useEffect, useState, useCallback } from 'react'
import DrawSVGLayout from './layouts/drawSVG/DrawSVGLayout'
import { AppContext } from 'context/AppContext'
import { useParams } from 'react-router-dom'
import { Loader } from './misc/Loader'
import { SubcLabelContainer } from './layouts/drawSVG/SubcLabelContainer'
import { useZoom } from 'hooks/useZoom'
import { useWindowSize } from 'hooks/useWindowSize'

export const Map = ({ mapImage }) => {
  const { appDispatch, ready } = useContext(AppContext)
  const { layout } = useParams()
  const inputRef = useRef()
  const zoom = useZoom()
  const size = useWindowSize()
  const [wrapper, setWrapper] = useState()
  const [mapWidth, setMapWidth] = useState(1800)
  const [mapHeight, setMapHeight] = useState(1800)
  const [SVGReady, setSVGReady] = useState(false)
  const [resized, setResized] = useState(true)

  const throttleResize = () => {
    setTimeout(() => {
      if (resized) {
        setResized(false)
        setTimeout(function () {
          setResized(true)
        }, 1000)
      }
    })
  }

  useEffect(throttleResize, [size])

  const handlerSetSVGReady = useCallback(() => {
    setSVGReady(true)
  }, [])

  useEffect(() => {
    if (ready) {
      appDispatch(['setLayout', layout])
      let rect = inputRef.current.getBoundingClientRect()
      rect.x = rect.x / zoom + window.scrollX / zoom
      rect.y = rect.y / zoom + window.scrollY / zoom
      setWrapper(rect)
    }
  }, [ready, appDispatch, layout, zoom, resized])

  useEffect(() => {
    let tempImg = document.createElement('img')
    tempImg.setAttribute('src', mapImage)
    setMapWidth(tempImg.naturalWidth)
    setMapHeight(tempImg.naturalHeight)
    tempImg.remove()
  }, [mapImage])

  return (
    <div
      id={'mapWrapper'}
      ref={inputRef}
      style={{
        width: mapWidth * zoom + 'px',
        height: mapHeight * zoom + 'px',
        backgroundImage: `url(${mapImage})`
      }}
      className='mapWrapper'
    >
      {wrapper && resized ? (
        <>
          <DrawSVGLayout handlerSetSVGReady={handlerSetSVGReady} wrapper={wrapper} mapWidth={mapWidth} mapHeight={mapHeight} layout={layout} />
          {SVGReady ? <SubcLabelContainer wrapper={wrapper} layout={layout} /> : null}
        </>
      ) : (
        <Loader />
      )}
    </div>
  )
}

export default Map
