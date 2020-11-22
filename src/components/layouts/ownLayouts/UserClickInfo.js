import React, { useContext } from 'react'
import { ModalContext } from 'context/ModalContext'
import { AppContext } from 'context/AppContext'

export const UserClickInfo = ({ content }) => {
  const { removeModal } = useContext(ModalContext)
  const { appDispatch } = useContext(AppContext)

  const deleteArea = () => {
    appDispatch(['deleteUserArea', content])
  }

  return (
    <div className='infoWindow'>
      <div className='infoWindow-header'>
        {content.name}
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
      <div className='infoWindow-body'>
        <ul className='infoWindow-listOfWorks-workContaineer'>
          {Object.keys(content).map((e, i) => {
            if (e !== 'id' && e !== 'name' && e !== 'svg') {
              return (
                <li key={i}>
                  <b>{e}: </b>
                  {content[e]}
                </li>
              )
            } else return null
          })}
        </ul>
        <div className='infoWindow-body-form'>
          <div
            id='add-new-work'
            onClick={() => {
              deleteArea()
              removeModal()
            }}
            className='infoWindow-body-form-button'
          >
            Remove
          </div>
        </div>
      </div>
    </div>
  )
}
