import React, { useContext, useState } from 'react'
import { ModalContext } from 'context/ModalContext'
import InputRow from 'components/misc/inputRow'

export const OpenReport = ({ content }) => {
  const { removeModal } = useContext(ModalContext)
  const [nameOfArea, setNameOfArea] = useState('Undefined')
  return (
    <div className='infoWindow large'>
      <div className='infoWindow-header'>
        <b>Report</b>
      </div>
      <div className='infoWindow-body'>
        <hr />
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
        <div className='infoWindow-body-form'>
          <div
            onClick={() => {
              removeModal()
            }}
            className='infoWindow-body-form-button'
          >
            Close
          </div>
        </div>
      </div>
    </div>
  )
}
