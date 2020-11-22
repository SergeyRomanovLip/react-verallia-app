import React, { useContext, useEffect, useState } from 'react'
import { ModalContext } from 'context/ModalContext'
import { AppContext } from 'context/AppContext'

function SVGComponent({ content, color }) {
  const { showModal } = useContext(ModalContext)

  return (
    <path
      id={content.id}
      key={content.id}
      onClick={() => {
        showModal('AreaClick', content)
      }}
      className={'SVGMapContainer-item'}
      style={color ? { fill: [color.rgba], stroke: [color.rgba] } : null}
      d={content.svg}
    ></path>
  )
}

export default SVGComponent
