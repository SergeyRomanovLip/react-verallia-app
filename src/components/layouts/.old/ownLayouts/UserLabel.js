import React from 'react'

export const UserLabel = ({ left, top, dataForLabel, color }) => {
  return (
    <div
      className={`works-sign `}
      style={{
        position: ['absolute'],
        width: 150 + 'px',
        top: top + 'px',
        left: left + 'px',
        backgroundColor: color ? color.rgba : null,
      }}
    >
      {Object.keys(dataForLabel).map((e, i) => {
        if (e !== 'id' && e !== 'name' && e !== 'svg') {
          return (
            <li style={{ listStyleType: ['none'] }} key={i}>
              <b>{e}: </b>
              {dataForLabel[e]}
            </li>
          )
        } else return null
      })}
    </div>
  )
}
