import React, { useEffect, useRef, useState } from 'react'
import Resizer from 'react-image-file-resizer'

export const FileInput = () => {
  const [map, setMap] = useState(false)
  const [resizedMap, setResizedMap] = useState(false)
  const file = useRef()

  const stopPropag = (e) => {
    e.stopPropagation()
  }
  const uploadHandler = () => {
    setMap(file.current.files[0])
  }
  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        1800,
        1800,
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
      setResizedMap(await resizeFile(map))
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
      {resizedMap ? <img src={resizedMap}></img> : null}
      <button>Upload file</button>
    </form>
  )
}
