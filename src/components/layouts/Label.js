import React from 'react'

export const Label = ({ left, top, data, color }) => {
  return (
    <div className={`works-sign`} style={{ position: ['absolute'], top: top + 'px', left: left + 'px', backgroundColor: color ? color.rgba : null }}>
      <b>{data.name}</b>
      <hr></hr>
      <small>Notes - {data.listOfNotes.length}</small>
    </div>
  )
}
