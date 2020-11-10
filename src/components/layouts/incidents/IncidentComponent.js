import React, { useContext } from 'react'
import { ModalContext } from '../../../context/ModalContext'

export const IncidentComponent = ({ left, top, id, name, startDate }) => {
  const { showModal } = useContext(ModalContext)
  const ID = id
  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
        showModal('InfoIncident', ID)
      }}
      className={'incidentLayout-sign'}
      style={{ position: 'absolute', top: top + 'px', left: left + 'px' }}
    >
      {name ? name : 'Наименование отсутствует'}
      <hr></hr>
      {startDate ? startDate : 'Дата отсутствует'}
    </div>
  )
}
