import React, { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { ModalContext } from '../../context/ModalContext'
import { FileInput } from '../misc/fileInput'

export const ShowUploadNewMap = () => {
  const { removeModal } = useContext(ModalContext)
  const [image, setImage] = useState(null)
  const { appDispatch } = useContext(AppContext)

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
      <FileInput />
      <div className='infoWindow-body'>
        <div className='infoWindow-body-form'>
          <div
            onClick={() => {
              removeModal()
            }}
            className='infoWindow-body-form-button'
          >
            Upload new map
          </div>
        </div>
      </div>
    </div>
  )
}
