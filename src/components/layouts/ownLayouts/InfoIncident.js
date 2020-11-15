import React, { useContext, useEffect, useState } from 'react'
import { ModalContext } from '../../../context/ModalContext'
import { AppContext } from '../../../context/AppContext'

export const InfoIncident = ({ content }) => {
  const { removeModal } = useContext(ModalContext)
  const { appState, appDispatch } = useContext(AppContext)
  const [incidents, setIncidents] = useState([])

  function deleteIncident() {
    removeModal()
    appDispatch(['deleteIncident', content])
  }

  useEffect(() => {
    const array = []
    if (appState.listOfIncidents[content]) {
      array.push([
        'Имя заболевшего',
        appState.listOfIncidents[content].victimName,
      ])
      array.push([
        'Подразделение',
        appState.listOfIncidents[content].department,
      ])
      array.push(['Статус', appState.listOfIncidents[content].status])
      array.push(['Дата начала', appState.listOfIncidents[content].startDate])
      array.push([
        'Дата окончания',
        appState.listOfIncidents[content].finishDate,
      ])
      setIncidents(array)
    } else {
      console.log('Что то не так')
    }
  }, [content, appState])

  return (
    <div className='infoWindow'>
      <div className='infoWindow-header'>
        {appState.listOfIncidents[content].name}
        <span
          onClick={() => {
            removeModal()
          }}
          className='infoWindow-body-form-button-close'
          id='deleteWork'
        >
          ✖
        </span>
      </div>
      <div className='infoWindow-body'>
        <ul className='infoWindow-listOfWorks-workContaineer'>
          {incidents.map((e, i) => {
            return (
              <li key={i}>
                <b>{e[0]}: </b>
                {e[1]}
              </li>
            )
          })}
        </ul>
        <div className='infoWindow-body-form'>
          <div
            id='add-new-work'
            onClick={() => {
              deleteIncident()
              removeModal()
            }}
            className='infoWindow-body-form-button'
          >
            Remove incident
          </div>
        </div>
      </div>
    </div>
  )
}
