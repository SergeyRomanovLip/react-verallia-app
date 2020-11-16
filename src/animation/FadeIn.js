import React, { useEffect, useState } from 'react'

export const FadeIn = ({ children }) => {
  const [start, setStart] = useState(false)
  const [end, setEnd] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setStart(true)
    }, 700)
  }, [children])

  return <div className={'activated'}>{children}</div>
}
