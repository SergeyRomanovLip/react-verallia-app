import React from 'react'
import { useState, useEffect } from 'react'

export const useZoom = () => {
  const [zoom, setZoom] = useState(1)

  const handleResize = (e) => {
    if (e.altKey) {
      if (e.deltaY === +100) {
        setZoom((prevState) => {
          if (prevState > 0.5) {
            return prevState - 0.03
          } else return 0.5
        })
      } else if (e.deltaY === -100) {
        setZoom((prevState) => {
          if (prevState < 1.5) {
            return prevState + 0.03
          } else return 1.5
        })
      }
    }
  }

  useEffect(() => {
    document.body.addEventListener('wheel', (e) => {
      handleResize(e)
    })
    return () =>
      document.body.removeEventListener('wheel', (e) => {
        handleResize(e)
      })
  }, [])

  return zoom
}
