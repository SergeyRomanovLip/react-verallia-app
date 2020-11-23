import React, { useContext, useEffect, useState } from 'react'
import Checkbox from 'components/misc/checkbox'
import { IDgenerator } from 'components/utilities/IDgenerator'
import { AppContext } from 'context/AppContext'
import DatetimeOwn from 'components/misc/datetime'
import InputRow from 'components/misc/inputRow'
import { ModalContext } from 'context/ModalContext'

export const AddNewNote = ({ content }) => {
  const { removeModal } = useContext(ModalContext)
  const { appDispatch, appState } = useContext(AppContext)
  const [fieldsOfLayout, setFieldsOfLayout] = useState([])

  useEffect(() => {
    appState.layouts[content.layout] && appState.layouts[content.layout].fields
      ? setFieldsOfLayout(appState.layouts[content.layout].fields)
      : setFieldsOfLayout([])
  }, [content, appState])

  const [workData, setWorkData] = useState({
    area: content.id,
    layout: content.layout,
    data: {
      id: IDgenerator()
    }
  })

  const dispatchValidator = () => {
    const dataForSending = []
    for (let data in workData.data) {
      dataForSending.push(workData.data[data])
    }
    console.log(workData)
    appDispatch(['addNewNote', workData])
  }

  function addData(fieldName, value, type, order) {
    setWorkData({
      ...workData,
      data: { ...workData.data, [fieldName]: { value, type, order } }
    })
  }

  return (
    <div className='infoWindow'>
      <div className='infoWindow-header'>
        You want to add new work?
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
        <hr />
        {fieldsOfLayout.map((e, i) => {
          let nameOfField = Object.keys(e).join()
          let valueOfField = Object.values(e).join()
          switch (valueOfField) {
            case 'text':
              return <InputRow key={i} data={nameOfField} type={valueOfField} text={nameOfField} order={i} fun={addData} />
            case 'number':
              return <InputRow key={i} data={nameOfField} type={valueOfField} text={nameOfField} order={i} fun={addData} />
            case 'date':
              return <DatetimeOwn key={i} data={nameOfField} text={nameOfField} order={i} fun={addData} />
            case 'check':
              return <Checkbox key={i} data={nameOfField} type={valueOfField} order={i} text={nameOfField} fun={addData} />
          }
        })}
        <div className='infoWindow-body-form'>
          <div
            onClick={() => {
              dispatchValidator()
              removeModal()
            }}
            id='submit-add-new-work'
            className='infoWindow-body-form-button'
          >
            Add new work
          </div>
        </div>
      </div>
    </div>
  )
}
