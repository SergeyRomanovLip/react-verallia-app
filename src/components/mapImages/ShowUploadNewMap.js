import React, { useContext, useState } from 'react'
import { ModalContext } from 'context/ModalContext'
import { uploadMapImage } from 'backend/firebaseConfig'
import { AuthContext } from 'context/AuthContext'
import { FileInput } from './fileInput'
import { Loader } from 'components/misc/Loader'
import { AppContext } from 'context/AppContext'

export const ShowUploadNewMap = () => {
  const { removeModal } = useContext(ModalContext)
  const { user } = useContext(AuthContext)
  const [loaded, setLoader] = useState(true)
  const { appReboot } = useContext(AppContext)

  const uploadMapImageHandler = async (map, thumb, mapName) => {
    try {
      setLoader(false)
      const res = await uploadMapImage(user, map, thumb, mapName)
      console.log('Map was successfully uploaded', res)
    } catch (e) {
      alert(e)
    } finally {
      localStorage.removeItem('map')
      appReboot()
      removeModal()
      setLoader(true)
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
          <FileInput maxWidth={1800} maxHeight={1800} fun={uploadMapImageHandler} />
        </div>
      </div>
      {!loaded ? <Loader /> : null}
    </div>
  )
}
