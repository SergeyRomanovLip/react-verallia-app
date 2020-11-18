import React, { useContext } from 'react'
import { ModalContext } from 'context/ModalContext'
import { uploadMapImage } from 'backend/firebaseConfig'
import { AuthContext } from 'context/AuthContext'
import { FileInput } from './fileInput'

export const ShowUploadNewMap = () => {
  const { removeModal } = useContext(ModalContext)
  const { user } = useContext(AuthContext)

  const uploadMapImageHandler = async (map, thumb, mapName) => {
    try {
      const res = await uploadMapImage(user, map, thumb, mapName)
      console.log('Map was successfully uploaded', res)
    } catch (e) {
      alert(e)
    } finally {
      removeModal()
    }
  }

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
      <div className='infoWindow-body'>
        <div className='infoWindow-body-form'>
          <FileInput maxWidth={1200} maxHeight={1200} fun={uploadMapImageHandler} />
        </div>
      </div>
    </div>
  )
}
