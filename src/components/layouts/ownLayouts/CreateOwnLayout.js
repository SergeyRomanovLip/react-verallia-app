import React, { useContext, useState } from 'react'
import { AppContext } from '../../../context/AppContext'
import { ModalContext } from '../../../context/ModalContext'
import InputColor from 'react-input-color'

export const CreateOwnLayout = () => {
  const { removeModal } = useContext(ModalContext)
  const { appDispatch } = useContext(AppContext)
  const [fieldsInput, setfieldsInput] = useState([])
  const [color, setColor] = React.useState({})

  const addField = () => {
    let id = fieldsInput.length
    let newField = (
      <div>
        <input id={`userInputName`} type={'text'} placeholder={'name of field'} data-id={id}></input>
        <select id={`userInputType`} type={'text'} defaultValue={'type of field'} data-id={id}>
          <option value='number'>Number</option>
          <option value='text'>Text</option>
          <option value='date'>Date</option>
        </select>
      </div>
    )
    setfieldsInput([...fieldsInput, newField])
  }

  const getDataFormInputs = () => {
    const arrayOfNames = [...document.querySelectorAll('#userInputName')]
    const arrayOfTypes = [...document.querySelectorAll('#userInputType')]
    const name = document.querySelector('#userInputLayoutName').value
    const type = document.querySelector('#userInputLayoutType').value
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

    let dataForSending = { color, name, type, fields: resultArray }

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
            <select id='userInputLayoutType' defaultValue={''} className='infoWindow-body-form-input'>
              <option value=''>Choose type of layout</option>
              <option value='drawing'>Drawing layout</option>
              <option value='click'>Click layout</option>
            </select>
            <input placeholder='define layout name' id='userInputLayoutName' className='infoWindow-body-form-input'></input>
            <label className='infoWindow-body-form-label'>
              Choose color of your areas
              <InputColor className='infoWindow-body-form-input' initialValue='#5e72e4' onChange={setColor} placement='right'></InputColor>
            </label>
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
