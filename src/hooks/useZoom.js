import { useState, useEffect } from 'react'

export const useZoom = () => {
  const [zoom, setZoom] = useState(1)

  const handleResize = (e) => {
    let target = e.path.filter((e) => {
      return e.id === 'mapWrapper'
    })

    if (e.altKey && target.length > 0) {
      if (e.deltaY === +100) {
        setZoom((prevState) => {
          if (prevState > 0.5) {
            return prevState - 0.07
          } else return 0.5
        })
      } else if (e.deltaY === -100) {
        setZoom((prevState) => {
          if (prevState < 1.8) {
            return prevState + 0.07
          } else return 1.8
        })
      }
    }
  }

  useEffect(() => {
    document.body.addEventListener('wheel', (e) => {
      handleResize(e)
    })
    return () => {
      document.body.removeEventListener('wheel', (e) => {
        handleResize(e)
      })
    }
  }, [])

  return zoom
}
