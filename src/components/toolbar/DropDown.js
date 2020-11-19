import React, { useState } from 'react'

export const DropDown = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false)
  const setIsOpenHandler = (e) => {
    e.stopPropagation()
    isOpen ? setIsOpen(false) : setIsOpen(true)
  }
  const animationHandler = () => {}

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
          ? items.map((e) => {
              if (e) {
                return <li className='dropDown-list-item'>{e}</li>
              }
            })
          : null}
      </ul>
    </div>
  )
}
