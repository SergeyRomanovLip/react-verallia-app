import React, { useEffect, useRef, useState } from 'react'
import { resizeFile } from 'components/utilities/ResizeFile'
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
              fun(resizedMap, thumb, mapName)
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
