import React, { useContext } from 'react'
import { ModalContext } from 'context/ModalContext'

export const ShowChoiseOfMap = ({ content }) => {
  const { removeModal } = useContext(ModalContext)
  console.log(content)
  return (
    <div className='infoWindow'>
      <div className='infoWindow-header'>
        Upload new map
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
      <ul>
        {Object.keys(content.existMap).map((e, i) => {
          return (
            <li
              key={i}
              onClick={() => {
                content.setPreparedMapHandler(content.existMap[e])
                removeModal()
              }}
            >
              <ul>
                <li>{e}</li>
                <li>
                  <img alt={'mapThumb'} src={content.existMap[e].thumb}></img>
                </li>
              </ul>
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
