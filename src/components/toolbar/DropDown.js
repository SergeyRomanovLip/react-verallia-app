import React, { useState } from 'react'

export const DropDown = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false)
  const setIsOpenHandler = (e) => {
    e.stopPropagation()
    isOpen ? setIsOpen(false) : setIsOpen(true)
  }

  return (
    <div
      onClick={(e) => {
        setIsOpenHandler(e)
      }}
      className={!isOpen ? 'dropDown-wrapper' : 'dropDown-wrapper active'}
    >
      <div className='dropDown-header'>{title}</div>
      <ul className={!isOpen ? 'dropDown-list' : 'dropDown-list active'}>
        {items
          ? items.map((e, i) => {
              if (e) {
                return (
                  <li key={i} className='dropDown-list-item'>
                    {e}
                  </li>
                )
              }
              return null
            })
          : null}
      </ul>
    </div>
  )
}
