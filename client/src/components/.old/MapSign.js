import React, { useEffect, useRef, useContext } from 'react'
import parse from 'html-react-parser'
import { ActualDataContext } from '../redux/context'

function MapSign({ room, click, getRects }) {
  const inputRef = useRef()
  const actualDataContext = useContext(ActualDataContext)

  useEffect(() => {
    actualDataContext.actualDataDispatch(['updateElPosition', [room[0][0], inputRef.current.getBoundingClientRect()]])
  }, [])

  let roomNode = {
    node: parse(room[1].el, {
      replace: (domNode) => {
        return domNode
      },
    }),
  }
  return (
    <g
      ref={inputRef}
      onClick={() => {
        click('InfoSubc', room[0][0])
      }}
    >
      {roomNode.node}
    </g>
  )
}

export default MapSign
