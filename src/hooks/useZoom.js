import React from 'react'
import { useState, useEffect } from 'react'

export const useZoom = () => {
  const [zoom, setZoom] = useState(1)

  const handleResize = (e) => {
    if (e === +1) {
      setZoom((prevState) => {
        if (prevState > 0.5) {
          return prevState - 0.03
        } else return 0.5
      })
    } else if (e === -1) {
      setZoom((prevState) => {
        if (prevState < 1.2) {
          return prevState + 0.03
        } else return 1.2
      })
    }
  }

  useEffect(() => {
    window.addEventListener('wheel', (e) => {
      if (e.altKey) {
        e.preventDefault()
        e.stopPropagation()
        handleResize(e.deltaY / 100)
      }
    })
    return () =>
      window.removeEventListener('wheel', (e) => {
        if (e.altKey) {
          e.preventDefault()
          e.stopPropagation()
          handleResize(e.deltaY / 100)
        }
      })
  }, [])

  return zoom
}
