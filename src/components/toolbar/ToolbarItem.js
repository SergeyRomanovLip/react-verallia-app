import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

function empty() {
  console.log('the function is not defined')
}

export const ToolbarItem = ({ data, link, fun }) => {
  const [iSshown, setIsShown] = useState(false)

  useEffect(() => {}, [iSshown])

  return (
    <>
      <NavLink
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
        className={'toolbar-item'}
        to={link}
      >
        {iSshown ? (
          <div
            style={{
              position: 'absolute',
              top: -20 + 'px',
              padding: 2 + 'px',
              color: 'white',
              borderRadius: 5 + 'px',
              fontSize: 'smaller',
              backgroundColor: 'darkred',
            }}
            onClick={() => {
              fun ? fun() : empty()
            }}
          >
            Remove layout?
          </div>
        ) : null}
        {data}
      </NavLink>
      <div className={'toolbar-item-border'}></div>
    </>
  )
}
