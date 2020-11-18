import React, { useContext } from 'react'
import { ModalContext } from 'context/ModalContext'

export const UserSVGComponent = ({ content, color }) => {
  const { showModal } = useContext(ModalContext)

  return (
    <path
      id={content.id}
      key={content.id}
      onClick={() => {
        showModal('UserClickInfo', content)
      }}
      className={'SVGMapContainer-item'}
      style={color ? { fill: [color.rgba], stroke: [color.rgba] } : null}
      d={content.svg}
    ></path>
  )
}
