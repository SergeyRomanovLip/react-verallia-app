import SVGComponent from './SVGComponent'
import React, { useContext, useEffect, useState } from 'react'
import { IDgenerator } from 'components/utilities/IDgenerator'
import { ModalContext } from 'context/ModalContext'
import { AppContext } from 'context/AppContext'
import { useZoom } from 'hooks/useZoom'

export const DrawSVGLayout = ({ wrapper, handlerSetSVGReady, mapWidth, mapHeight, layout }) => {
  const { showModal } = useContext(ModalContext)
  const { appState, appDispatch } = useContext(AppContext)
  const [throttleState, setThrottleState] = useState(false)
  const [drawingStat, setDrawingStat] = useState(false)
  const [drawingSVG, setDrawingSVG] = useState('')
  const [arrayOfAreas, setArrayOfAreas] = useState([])
  const zoom = useZoom()

  useEffect(() => {
    handlerSetSVGReady(true)
    return () => {
      handlerSetSVGReady(false)
    }
  }, [handlerSetSVGReady])

  useEffect(() => {
    if (appState.layouts[layout] && appState.layouts[layout].listOfAreas) {
      const arrayOfAreas = []
      for (let area in appState.layouts[layout].listOfAreas) {
        arrayOfAreas.push(appState.layouts[layout].listOfAreas[area])
      }
      setArrayOfAreas(arrayOfAreas)
    }
    return () => {
      setArrayOfAreas([])
    }
  }, [appState.layouts, layout])

  let myAttr = {
    d: '',
    set(e) {
      this.d = this.d + e
      setDrawingSVG(drawingSVG + this.d)
    }
  }

  function throttle(e) {
    if (!throttleState) {
      drawing(e, 'drawing')
      setThrottleState(true)
      setTimeout(function () {
        setThrottleState(false)
      }, 1000 / 15)
    }
  }

  function drawing(e, state) {
    if (state === 'start') {
      setDrawingStat(true)
      myAttr.set(`M ${e.pageX / zoom - wrapper.x} ${e.pageY / zoom - wrapper.y}`)
    }
    if (drawingStat === true) {
      switch (state) {
        case 'drawing':
          myAttr.set(`L ${e.pageX / zoom - wrapper.x} ${e.pageY / zoom - wrapper.y}`)
          break
        case 'finish':
          let id = IDgenerator()
          let svg = ''
          setDrawingStat(false)
          if (drawingSVG.length > 70) {
            svg = drawingSVG + 'Z'
          } else {
            let sC = []
            drawingSVG.split(' ').map((e) => {
              if (e.match(/\d+/)) {
                sC.push(e.match(/\d+/)[0])
              } else {
                return null
              }
            })
            if (sC.length >= 2) {
              svg = ['M' + sC[0] + ', ' + sC[1] + 'a 15,15 0 1,1 30,0 a 15,15 0 1,1 -30,0']
            }
          }
          showModal('AcceptSVG', (name) => {
            appDispatch(['addNewArea', { id, name, layout, svg, listOfNotes: [] }])
          })
          setDrawingSVG('')
          break
        default:
          return null
      }
    }
  }

  return (
    <svg
      className='SVGMapContainer'
      viewBox={`0 0 ${mapWidth} ${mapHeight}`}
      xmlSpace='http://www.w3.org/2000/svg'
      onMouseDown={(e) => {
        drawing(e, 'start')
      }}
      onMouseMove={(e) => {
        if (drawingStat) {
          throttle(e)
        }
      }}
      onMouseUp={(e) => {
        drawing(e, 'finish')
      }}
    >
      <path d={drawingSVG}></path>
      {arrayOfAreas.length > 0
        ? arrayOfAreas.map((e, i) => {
            return <SVGComponent key={i} content={e} color={appState.layouts[layout].color} />
          })
        : null}
    </svg>
  )
}

export default DrawSVGLayout
