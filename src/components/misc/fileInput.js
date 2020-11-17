import React, { useEffect, useRef, useState } from 'react'
import Resizer from 'react-image-file-resizer'
import { MultiInput } from './multyInput'

export const FileInput = ({ maxWidth, maxHeight, fun }) => {
  const [loaded, setLoaded] = useState(false)
  const [map, setMap] = useState(null)
  const [resizedMap, setResizedMap] = useState(null)
  const [mapName, setMapName] = useState(null)
  const [thumb, setThumb] = useState(null)
  const file = useRef()

  const stopPropag = (e) => {
    e.stopPropagation()
  }
  const uploadHandler = () => {
    setMap(file.current.files[0])
  }
  const resizeFile = (file, maxWidth, maxHeight) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        maxWidth,
        maxHeight,
        'JPEG',
        100,
        0,
        (uri) => {
          resolve(uri)
        },
        'base64'
      )
    })

  const resizeFileHandler = async () => {
    if (map) {
      setLoaded(false)
      setResizedMap(await resizeFile(map, maxWidth, maxHeight))
      setThumb(await resizeFile(map, 200, 200))
      setLoaded(true)
    }
  }

  useEffect(() => {
    resizeFileHandler()
  }, [map])

  return (
    <form>
      <label>
        <input
          ref={file}
          type='file'
          id='fileInput'
          onClick={(e) => {
            stopPropag(e)
          }}
          onChange={uploadHandler}
        />
      </label>
      {resizedMap && loaded ? (
        <div>
          <img src={thumb}></img>
          <MultiInput
            text={'Enter name of map'}
            data={null}
            fun={(field, data) => {
              setMapName(data)
            }}
            type={'text'}
          ></MultiInput>
          <div
            onClick={() => {
              fun(resizedMap, mapName)
            }}
            className='infoWindow-body-form-button'
          >
            Upload new map
          </div>
        </div>
      ) : null}
    </form>
  )
}
