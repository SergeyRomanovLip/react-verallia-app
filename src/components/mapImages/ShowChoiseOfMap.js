import React, { useContext } from 'react'
import { ModalContext } from 'context/ModalContext'

export const ShowChoiseOfMap = ({ content }) => {
  const { removeModal } = useContext(ModalContext)
  return (
    <div className='infoWindow'>
      <div className='infoWindow-header'>
        Choose your map
        <span
          onClick={() => {
            removeModal()
          }}
          className='infoWindow-body-form-button-close'
          id='deleteWork'
        >
          ✖
        </span>
      </div>
      <ul className={'infoWindow-body-chooseList'}>
        {Object.keys(content.existMap).map((e, i) => {
          return (
            <li
              key={i}
              onClick={() => {
                content.setPreparedMapHandler(content.existMap[e])
                removeModal()
              }}
            >
              <div>
                <h3>{e}</h3>
                <img alt={'mapThumb'} src={content.existMap[e].thumb}></img>
              </div>
            </li>
          )
        })}
      </ul>
      <div className='infoWindow-body'>
        <div className='infoWindow-body-form'></div>
      </div>
    </div>
  )
}
