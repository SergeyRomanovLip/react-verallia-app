import React, { useContext, useState } from 'react'
import { AppContext } from '../../../context/AppContext'
import { ModalContext } from '../../../context/ModalContext'
import InputRow from '../../misc/inputRow'

export const AcceptUserSVG = ({ content }) => {
  const { removeModal } = useContext(ModalContext)
  const { appState } = useContext(AppContext)
  const [userSVGData, setUserSVGData] = useState('Undefined')
  return (
    <div className='infoWindow'>
      <div className='infoWindow-header'>
        <b>Add new area?</b>
      </div>
      <div className='infoWindow-body'>
        <hr />
        {appState.userLayouts[content[0]].fields.map((e, i) => {
          console.log(e)
          return (
            <InputRow
              key={i}
              text={Object.keys(e)}
              data={'areaName'}
              fun={(e, r) => {
                setUserSVGData(r)
              }}
              type={Object.values(e)}
            ></InputRow>
          )
        })}

        <div className='infoWindow-body-form'>
          <div
            onClick={() => {
              content[1](userSVGData)
              removeModal()
            }}
            className='infoWindow-body-form-button'
          >
            Add
          </div>
          <div
            onClick={() => {
              removeModal()
            }}
            className='infoWindow-body-form-button'
          >
            Cancel
          </div>
        </div>
      </div>
    </div>
  )
}
