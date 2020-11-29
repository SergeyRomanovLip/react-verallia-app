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
  const [workData, setWorkData] = useState({
    area: content.id,
    layout: content.layout,
    data: {
      id: content.exact ? content.exact[0].id : IDgenerator()
    }
  })

  const setFieldsOfLayoutHandler = (fields) => {
    setFieldsOfLayout(fields)
  }

  useEffect(() => {
    appState.layouts[content.layout] && appState.layouts[content.layout].fields
      ? setFieldsOfLayoutHandler(appState.layouts[content.layout].fields)
      : setFieldsOfLayoutHandler([])
  }, [content, appState])

  const dispatchValidator = (type) => {
    const dataForSending = []
    for (let data in workData.data) {
      dataForSending.push(workData.data[data])
    }
    switch (type) {
      case 'add':
        console.log('Add new')
        appDispatch(['addNewNote', workData])
        break
      case 'update':
        console.log(content.exact)
        console.log('Update')
        appDispatch(['updateNote', workData])
        break
      default:
    }
  }

  function addData(fieldName, value, type, order) {
    setWorkData((workData) => {
      return {
        ...workData,
        data: { ...workData.data, [fieldName]: { value, type, order } }
      }
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
          let existValue = content.exact ? (content.exact[0][nameOfField] ? content.exact[0][nameOfField].value : null) : null
          switch (valueOfField) {
            case 'text':
              return <InputRow key={i} data={nameOfField} type={valueOfField} text={nameOfField} order={i} value={existValue} fun={addData} />
            case 'number':
              return <InputRow key={i} data={nameOfField} type={valueOfField} text={nameOfField} order={i} value={existValue} fun={addData} />
            case 'date':
              return <DatetimeOwn key={i} data={nameOfField} text={existValue ? existValue : nameOfField} order={i} fun={addData} />
            case 'check':
              return <Checkbox key={i} data={nameOfField} type={valueOfField} order={i} text={nameOfField} fun={addData} checkState={existValue} />
          }
        })}
        <div className='infoWindow-body-form'>
          <div
            onClick={() => {
              !content.exact ? dispatchValidator('add') : dispatchValidator('update')
              removeModal()
            }}
            id='submit-add-new-work'
            className='infoWindow-body-form-button'
          >
            {content.exact ? 'Update' : 'Add'}
          </div>
        </div>
      </div>
    </div>
  )
}
