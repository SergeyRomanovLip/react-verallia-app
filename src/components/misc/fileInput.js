import React, { useEffect, useRef, useState } from 'react'

export const FileInput = () => {
  const [map, setMap] = useState(false)
  const file = useRef()

  const stopPropag = (e) => {
    e.stopPropagation()
  }
  const uploadHandler = () => {
    toBase64(file.current.files[0]).then((res) => {
      setMap(res)
    })
  }

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })

  const fromBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })

  useEffect(() => {
    console.log(map)
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
      <button onClick={uploadHandler}>Upload file</button>
    </form>
  )
}
