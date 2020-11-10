import React, { useContext } from 'react'
import { AppContext } from '../../../context/AppContext'
import { IDgenerator } from '../../utilities/IDgenerator'
import { IncidentComponent } from './IncidentComponent'

export const Incidents = ({ click }) => {
  const { appState, appDispatch } = useContext(AppContext)

  let wrapperTop = appState.wrapper.y
  let wrapperleft = appState.wrapper.x

  const arrayOfIncidents = []
  for (let incident in appState.listOfIncidents) {
    if (incident !== 'updated')
      arrayOfIncidents.push(appState.listOfIncidents[incident])
  }

  function addNewIncident(left, top) {
    let ID = IDgenerator()
    click('AcceptIncident', (options) => {
      if (
        options.name &&
        options.victimName &&
        options.department &&
        options.status &&
        options.startDate
      ) {
        appDispatch([
          'addNewIncident',
          ID,
          {
            id: ID,
            left: left - wrapperleft,
            top: top - wrapperTop,
            name: options.name,
            victimName: options.victimName,
            department: options.department,
            status: options.status,
            startDate: new Date(options.startDate).toLocaleDateString(),
            finishDate: options.finishDate
              ? new Date(options.finishDate).toLocaleDateString()
              : true,
          },
        ])
      } else {
        alert(
          'Необходимо заполнить все поля (кроме "дата окончания заболевания")'
        )
      }
    })
  }

  return (
    <div
      onClick={(e) => {
        addNewIncident(e.pageX, e.pageY)
      }}
      className={'incidentLayout'}
    >
      {arrayOfIncidents.map((e, i) => {
        return (
          <IncidentComponent
            key={i}
            id={e.id}
            top={e.top}
            left={e.left}
            name={e.name}
            victimName={e.victimName}
            department={e.department}
            status={e.status}
            startDate={e.startDate}
            finishDate={e.finishDate}
          />
        )
      })}
    </div>
  )
}
