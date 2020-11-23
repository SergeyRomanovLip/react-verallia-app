import React, { useContext, useEffect, useState } from 'react'
import { ModalContext } from 'context/ModalContext'

function SVGComponent({ content, color }) {
  const { showModal } = useContext(ModalContext)
  const [animationReady, setAnimationReady] = useState(false)

  useEffect(() => {
    setAnimationReady(false)
    setTimeout(() => {
      setAnimationReady(true)
    }, 150)
  }, [color])

  return (
    <path
      id={content.id}
      key={content.id}
      onClick={() => {
        showModal('AreaClick', content)
      }}
      className={`SVGMapContainer-item ${animationReady ? 'anim rendered' : 'anim waiting'}`}
      style={color ? { fill: [color.rgba], stroke: [color.rgba] } : null}
      d={content.svg}
    ></path>
  )
}

export default SVGComponent
