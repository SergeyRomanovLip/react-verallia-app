import React, { useEffect, useState } from 'react'

export const Label = ({ left, top, data, color }) => {
  const [animationReady, setAnimationReady] = useState(false)

  useEffect(() => {
    setAnimationReady(false)
    setTimeout(() => {
      setAnimationReady(true)
    }, 150)
  }, [data])

  return (
    <div
      className={`works-sign ${animationReady ? 'anim rendered' : 'anim waiting'}`}
      style={{ position: ['absolute'], top: top + 'px', left: left + 'px', backgroundColor: color ? color.rgba : null }}
    >
      <b>{data.name}</b>
      <hr></hr>
      <small>Notes - {data.listOfNotes.length}</small>
    </div>
  )
}
