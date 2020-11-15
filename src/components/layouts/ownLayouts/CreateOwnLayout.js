import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../context/AppContext'
import { ModalContext } from '../../../context/ModalContext'

export const CreateOwnLayout = () => {
  const { removeModal } = useContext(ModalContext)
  const { appDispatch } = useContext(AppContext)
  const [workData, setWorkData] = useState({})
  const [fieldsInput, setfieldsInput] = useState([])

  function addData(type, value) {
    setWorkData({
      ...workData,
      [type]: value
    })
  }

  const addField = () => {
    let id = fieldsInput.length
    let newField = (
      <div>
        <input id={`userInputName`} type={'text'} placeholder={'name of field'} data-id={id}></input>
        <select id={`userInputType`} type={'text'} defaultValue={'type of field'} data-id={id}>
          <option value='number'>Number</option>
          <option value='text'>Text</option>
        </select>
      </div>
    )
    setfieldsInput([...fieldsInput, newField])
  }

  const getDataFormInputs = () => {
    const arrayOfNames = [...document.querySelectorAll('#userInputName')]
    const arrayOfTypes = [...document.querySelectorAll('#userInputType')]
    let resultArray = arrayOfNames.map((e) => {
      const newField = arrayOfTypes.map((el) => {
        if (e.dataset.id === el.dataset.id) {
          return { [e.value]: el.value }
        }
      })
      return newField
    })
    resultArray = [].concat.apply([], resultArray).filter((e) => {
      return e !== undefined
    })

    let dataForSending = { ...workData, fields: resultArray }

    appDispatch(['CreateOwnLayout', dataForSending])
  }

  return (
    <div className='infoWindow'>
      <div className='infoWindow-header'>
        You want to create your own layout?
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
        <div className='infoWindow-body-form'>
          <hr />
          <div>
            <label htmlFor={'type'}>Choose type of your layout</label>
            <select
              name='type'
              value={workData.type}
              onChange={(e) => {
                addData('type', e.currentTarget.value)
              }}
            >
              <option value='drawing'>Drawing layout</option>
              <option value='click'>Click layout</option>
            </select>
            <input
              onChange={(e) => {
                addData('name', e.currentTarget.value)
              }}
            ></input>
          </div>
          <div>
            <label htmlFor='fields'>Add necessary fields to objects</label>
            <div name='fields'>
              {fieldsInput.map((e, i) => {
                return <li key={i}>{e}</li>
              })}
              <div onClick={addField} className='infoWindow-body-form-button'>
                Add field
              </div>
            </div>
          </div>

          <div className='infoWindow-body-form'>
            <div
              onClick={() => {
                getDataFormInputs()
                removeModal()
              }}
              id='submit-add-new-work'
              className='infoWindow-body-form-button'
            >
              Create new layout
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
