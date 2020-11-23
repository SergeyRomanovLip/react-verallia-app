import React, { useContext, useRef, useEffect, useState, useCallback } from 'react'
import DrawSVGLayout from './layouts/DrawSVGLayout'
import { AppContext } from 'context/AppContext'
import { useParams } from 'react-router-dom'
import { Loader } from './misc/Loader'
import { LabelContainer } from './layouts/LabelContainer'
import { useZoom } from 'hooks/useZoom'
import { useWindowSize } from 'hooks/useWindowSize'
import { ModalContext } from 'context/ModalContext'
export const Map = ({ mapImage }) => {
  const { appDispatch, color, ready } = useContext(AppContext)
  const { showModal } = useContext(ModalContext)
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
        backgroundImage: `url(${mapImage})`,
      }}
      className='mapWrapper'
    >
      {wrapper && resized ? (
        layout !== 'no layouts' ? (
          <>
            <DrawSVGLayout
              handlerSetSVGReady={handlerSetSVGReady}
              wrapper={wrapper}
              mapWidth={mapWidth}
              mapHeight={mapHeight}
              layout={layout}
            />
            {SVGReady ? <LabelContainer wrapper={wrapper} layout={layout} /> : null}
          </>
        ) : (
          <div
            className={'center'}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              showModal('CreateOwnLayout', '')
            }}
          ></div>
        )
      ) : (
        <Loader />
      )}
    </div>
  )
}

export default Map
