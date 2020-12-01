import { ModalContext } from 'context/ModalContext'
import React, { useContext, useEffect, useState } from 'react'

export const Label = ({ left, top, data, color }) => {
  const [animationReady, setAnimationReady] = useState(false)
  const { showModal } = useContext(ModalContext)

  useEffect(() => {
    setAnimationReady(false)
    setTimeout(() => {
      setAnimationReady(true)
    }, 100)
  }, [data])

  return (
    <div
      className={`works-sign ${animationReady ? 'anim rendered' : 'anim waiting'}`}
      style={{ position: ['absolute'], top: top + 'px', left: left + 'px', backgroundColor: color ? color.rgba : null }}
      onClick={() => {
        showModal('AreaClick', data)
      }}
    >
      <b>{data.name}</b>
      <hr></hr>
      <small>Notes - {data.listOfNotes.length}</small>
    </div>
  )
}
