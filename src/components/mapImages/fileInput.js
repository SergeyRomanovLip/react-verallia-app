import React, { useCallback, useEffect, useRef, useState } from 'react'
import { resizeFile } from 'components/utilities/ResizeFile'
import { MultiInput } from 'components/misc/multyInput'

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

  const resizeFileHandler = useCallback(async () => {
    if (map) {
      setLoaded(false)
      setResizedMap(await resizeFile(map, maxWidth, maxHeight))
      setThumb(await resizeFile(map, 200, 200))
      setLoaded(true)
    }
  }, [map, maxWidth, maxHeight])

  useEffect(() => {
    resizeFileHandler()
  }, [map, resizeFileHandler])

  return (
    <div style={{ margin: 5 + 'px' }}>
      <input
        className={'infoWindow-body-form-input'}
        ref={file}
        type='file'
        id='fileInput'
        onClick={(e) => {
          stopPropag(e)
        }}
        onChange={uploadHandler}
      />
      {resizedMap && loaded ? (
        <div className={'infoWindow-body-imgContainer'}>
          <img alt={'mapThumbnail'} src={thumb}></img>
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
    </div>
  )
}
