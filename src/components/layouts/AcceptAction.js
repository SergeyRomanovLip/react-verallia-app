import InputRow from 'components/misc/inputRow'
import { ModalContext } from 'context/ModalContext'
import React, { useContext, useState } from 'react'

export const AcceptAction = ({ content }) => {
  const password = '13579'
  const [passwordState, setPassword] = useState('')

  const { removeModal } = useContext(ModalContext)
  return (
    <div className='infoWindow'>
      <div className='infoWindow-header'>
        <b>Are you sure to delete?</b>
      </div>
      <div className='infoWindow-body'>
        <hr />
        <InputRow
          text={'password'}
          data={'password'}
          fun={(e, r) => {
            setPassword(r)
          }}
          type={'text'}
        ></InputRow>
        <div className='infoWindow-body-form'>
          <div
            onClick={() => {
              if (passwordState === password) {
                content()
                removeModal()
              } else {
                alert('Wrong password')
              }
            }}
            className='infoWindow-body-form-button'
          >
            Delete
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
