import SVGComponent from './SVGComponent'
import React, { useContext, useEffect, useState } from 'react'
import { IDgenerator } from 'components/utilities/IDgenerator'
import { ModalContext } from 'context/ModalContext'
import { AppContext } from 'context/AppContext'
import { useZoom } from 'hooks/useZoom'

export const DrawSVGLayout = ({ handlerSetSVGReady }) => {
  const { showModal } = useContext(ModalContext)
  const { appState, appDispatch, mapWidth, mapHeight } = useContext(AppContext)
  const [throttleState, setThrottleState] = useState(false)
  const [drawingStat, setDrawingStat] = useState(false)
  const [drawingSVG, setDrawingSVG] = useState('')
  const zoom = useZoom()
  let wrapperTop = appState.wrapper.y
  let wrapperleft = appState.wrapper.x
  let timesPerSecond = 13

  let roundedRectData = function (w, h, tlr, trr, brr, blr) {
    return (
      'M 0 ' +
      tlr +
      ' A ' +
      tlr +
      ' ' +
      tlr +
      ' 0 0 1 ' +
      tlr +
      ' 0' +
      ' L ' +
      (w - trr) +
      ' 0' +
      ' A ' +
      trr +
      ' ' +
      trr +
      ' 0 0 1 ' +
      w +
      ' ' +
      trr +
      ' L ' +
      w +
      ' ' +
      (h - brr) +
      ' A ' +
      brr +
      ' ' +
      brr +
      ' 0 0 1 ' +
      (w - brr) +
      ' ' +
      h +
      ' L ' +
      blr +
      ' ' +
      h +
      ' A ' +
      blr +
      ' ' +
      blr +
      ' 0 0 1 0 ' +
      (h - blr) +
      ' Z'
    )
  }

  useEffect(() => {
    handlerSetSVGReady(true)
  }, [handlerSetSVGReady])

  let myAttr = {
    d: '',
    set(e) {
      this.d = this.d + e
      setDrawingSVG(drawingSVG + this.d)
    },
  }

  function throttle(e) {
    if (!throttleState) {
      drawing(e, 'drawing')
      setThrottleState(true)
      setTimeout(function () {
        setThrottleState(false)
      }, 1000 / timesPerSecond)
    }
  }

  function drawing(e, state) {
    if (state === 'start') {
      setDrawingStat(true)
      myAttr.set(`M ${e.pageX / zoom - wrapperleft} ${e.pageY / zoom - wrapperTop}`)
    }
    if (drawingStat === true) {
      switch (state) {
        case 'drawing':
          myAttr.set(`L ${e.pageX / zoom - wrapperleft} ${e.pageY / zoom - wrapperTop}`)
          break
        case 'finish':
          setDrawingStat(false)
          if (drawingSVG.length > 70) {
            let ID = IDgenerator()
            showModal('AcceptSVG', (name) => {
              appDispatch([
                'addNewArea',
                ID,
                {
                  id: ID,
                  name: name,
                  checked: true,
                  listOfWorks: true,
                  svg: [drawingSVG + 'Z'],
                },
              ])
            })
          } else {
            myAttr.set(roundedRectData(15, 15, 15, 15, 15, 15))
            console.log(myAttr)
            let ID = IDgenerator()
            showModal('AcceptSVG', (name) => {
              appDispatch([
                'addNewArea',
                ID,
                {
                  id: ID,
                  name: name,
                  checked: true,
                  listOfWorks: true,
                  svg: [drawingSVG + 'Z'],
                },
              ])
            })
            break
          }
          setDrawingSVG('')
          break
        default:
          return null
      }
    }
  }

  const arrayOfAreas = []
  for (let area in appState.listOfAreas) {
    arrayOfAreas.push(appState.listOfAreas[area])
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
            return <SVGComponent key={i} ID={e.id} click={showModal} d={e.svg} />
          })
        : null}
    </svg>
  )
}

export default DrawSVGLayout
