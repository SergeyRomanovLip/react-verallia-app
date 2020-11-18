import React, { useContext, useEffect, useState } from 'react'
import { IDgenerator } from 'components/utilities/IDgenerator'
import { ModalContext } from 'context/ModalContext'
import { AppContext } from 'context/AppContext'
import { UserSVGComponent } from './UserSVGComponent'

export const UserDrawSVGLayout = ({ color, handlerSetSVGReady, name }) => {
  const { showModal } = useContext(ModalContext)
  const { appState, appDispatch } = useContext(AppContext)
  const [throttleState, setThrottleState] = useState(false)
  const [drawingStat, setDrawingStat] = useState(false)
  const [drawingSVG, setDrawingSVG] = useState('')

  let wrapperTop = appState.wrapper.y
  let wrapperleft = appState.wrapper.x
  let timesPerSecond = 13

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
      myAttr.set(`M ${e.pageX - wrapperleft} ${e.pageY - wrapperTop}`)
    }
    if (drawingStat === true) {
      switch (state) {
        case 'drawing':
          myAttr.set(`L ${e.pageX - wrapperleft} ${e.pageY - wrapperTop}`)
          break
        case 'finish':
          setDrawingStat(false)
          if (drawingSVG.length > 50) {
            let ID = IDgenerator()
            showModal('AcceptUserSVG', [name, { id: ID, name: name, svg: [drawingSVG + 'Z'] }])
          }
          setDrawingSVG('')
          break
        default:
          return null
      }
    }
  }

  const arrayOfAreas = []
  for (let area in appState.userLayouts[name].listOfAreas) {
    arrayOfAreas.push(appState.userLayouts[name].listOfAreas[area])
  }
  return (
    <svg
      className='SVGMapContainer'
      viewBox='0 0 800 1130'
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
            return <UserSVGComponent key={i} content={e} color={color} />
          })
        : null}
    </svg>
  )
}

export default UserDrawSVGLayout
