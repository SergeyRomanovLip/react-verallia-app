import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from 'context/AppContext'

export const SideToolbar = () => {
  const { appState, color } = useContext(AppContext)
  const { layout } = useParams()
  const [opened, setOpened] = useState(false)
  const [listOfNotes, setListOfNotes] = useState([])

  const dataShower = (e) => {
    let array = Object.keys(e[0])
      .filter((el) => {
        return e[0][el] && e[0][el].type
      })
      .map((el) => {
        let element = e[0][el]
        let nameOfField = el
        switch (element.type) {
          case 'text':
            return (
              <li className={'listOfWorks-work'} key={element.order}>
                <b>{nameOfField}: </b>
                {element.value}
              </li>
            )
          case 'number':
            return (
              <li className={'listOfWorks-work'} key={element.order}>
                <b>{nameOfField}: </b>
                {element.value}
              </li>
            )
          case 'date':
            return (
              <li className={'listOfWorks-work'} key={element.order}>
                <b>{nameOfField}: </b>
                {element.value}
              </li>
            )
          case 'checkbox':
            return (
              <li className={'listOfWorks-work'} key={element.order}>
                <div className={'checkbox'}>{nameOfField}</div>
              </li>
            )
          default:
        }
      })
      .sort((a, b) => {
        if (a.key > b.key) {
          return 1
        }
        if (a.key < b.key) {
          return -1
        }
        return 0
      })
    return (
      <>
        <span className='infoWindow-listOfWorks-work-removeButton' id='deleteWork'></span>
        <div style={{ margin: 5 + 'px' }}>
          <b>Area: {e.name}</b>
        </div>
        <ul className={'infoWindow-listOfWorks-work-ul'}>{array}</ul>
      </>
    )
  }

  useEffect(() => {
    let areasArray = []
    if (appState.layouts && appState.layouts[layout]) {
      let layoutAreas = appState.layouts[layout].listOfAreas
      for (let area in layoutAreas) {
        areasArray.push(layoutAreas[area])
      }
    }
    let notesAray = []
    areasArray.forEach((e) => {
      e.listOfNotes.forEach((el) => {
        notesAray.push({ ...el, name: e.name })
      })
    })
    setListOfNotes(notesAray)
  }, [appState])

  const openHandler = () => {
    setOpened((prevState) => {
      prevState ? setOpened(false) : setOpened(true)
    })
  }

  return (
    <nav
      id='sideToolbar'
      className={`sideToolbar ${opened ? 'opened' : ''}`}
      style={{
        backgroundColor: color ? color.rgba : ''
      }}
    >
      {opened ? (
        <div className={'sideToolbar-listContainer'}>
          <ul className='infoWindow-listOfWorks-work-ul'>
            {listOfNotes.length > 0 ? (
              listOfNotes.map((e, i) => {
                return (
                  <li className='infoWindow-listOfWorks-workContaineer' style={{ backgroundColor: 'whitesmoke' }} key={i}>
                    {dataShower(e, i)}
                  </li>
                )
              })
            ) : (
              <li className='listOfWorks-work'>There are no notes yet</li>
            )}
          </ul>
        </div>
      ) : null}
      <div onClick={openHandler} className={'sideToolbar-sideButton'}>
        <span style={{ transform: 'rotate(270deg)', color: 'whitesmoke' }}>{opened ? 'close' : 'open'}</span>
      </div>
    </nav>
  )
}
