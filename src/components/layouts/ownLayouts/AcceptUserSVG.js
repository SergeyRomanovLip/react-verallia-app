import React, { useContext, useState } from 'react'
import { AppContext } from '../../../context/AppContext'
import { ModalContext } from '../../../context/ModalContext'
import { MultiInput } from '../../misc/multyInput'

export const AcceptUserSVG = ({ content }) => {
  const { removeModal } = useContext(ModalContext)
  const { appState, appDispatch } = useContext(AppContext)
  const [userSVGData, setUserSVGData] = useState(null)

  const userSVGDataHandler = (data, field) => {
    setUserSVGData({
      ...userSVGData,
      [field]: data
    })
  }

  return (
    <div className='infoWindow'>
      <div className='infoWindow-header'>
        <b>Add new area?</b>
      </div>
      <div className='infoWindow-body'>
        <hr />
        {appState.userLayouts[content[0]].fields.map((e, i) => {
          return (
            <MultiInput
              key={i}
              text={Object.keys(e)}
              data={Object.keys(e)}
              fun={(data, field) => {
                userSVGDataHandler(field, data)
              }}
              type={Object.values(e)}
            ></MultiInput>
          )
        })}

        <div className='infoWindow-body-form'>
          <div
            onClick={() => {
              appDispatch(['addNewUserArea', { ...userSVGData, ...content[1] }])
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
