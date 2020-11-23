import React, { useContext, useState } from 'react'
import { AppContext } from 'context/AppContext'
import { ModalContext } from 'context/ModalContext'
import InputColor from 'react-input-color'
import { useHistory } from 'react-router-dom'

export const CreateOwnLayout = () => {
  const { removeModal } = useContext(ModalContext)
  const { appDispatch } = useContext(AppContext)
  const history = useHistory()
  const [fieldsInput, setfieldsInput] = useState([])
  const [color, setColorState] = React.useState({})

  const setColor = (color) => {
    let newColor = color.rgba.split(',')
    newColor[3] = '0.8)'
    color.rgba = newColor.join()
    setColorState(color)
  }

  const addField = () => {
    let id = fieldsInput.length
    let newField = (
      <div>
        <input id={`userInputName`} type={'text'} placeholder={'name of field'} data-id={id}></input>
        <select id={`userInputType`} type={'text'} defaultValue={'text'} data-id={id}>
          <option value='number'>Number</option>
          <option value='text'>Text</option>
          <option value='date'>Date</option>
          <option value='check'>Checkbox</option>
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
      const newField = arrayOfTypes
        .filter((el) => {
          return e.dataset.id === el.dataset.id
        })
        .map((el) => {
          return { [e.value]: el.value }
        })
      return newField
    })
    resultArray = [].concat.apply([], resultArray).filter((e) => {
      return e !== undefined
    })

    let dataForSending = { color, name, type, fields: resultArray, listOfAreas: true }

    appDispatch(['CreateOwnLayout', dataForSending])
    history.push(`/product/map/${name}`)
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
            <div className='infoWindow-body-label'>
              Please, choose type of layout
              <select id='userInputLayoutType' defaultValue={'notes'}>
                <option value='multi'>Few tasks in arrea</option>
                <option value='one'>One task in arrea </option>
              </select>
            </div>
            <div className='infoWindow-body-label'>
              Please, enter layout name
              <input placeholder='layout name' id='userInputLayoutName' className='infoWindow-body-form-input'></input>
            </div>
            <div className='infoWindow-body-label'>
              Please, choose color of your areas
              <InputColor initialValue='#5e72e4' onChange={setColor} placement='right'></InputColor>
            </div>
          </div>
          <div>
            <hr></hr>
            <div className='infoWindow-body-label'>Please, add necessary fields</div>
            <ul name='fields' className='infoWindow-body-list'>
              {fieldsInput.map((e, i) => {
                return <li key={i}>{e}</li>
              })}
            </ul>
          </div>
          <div onClick={addField} className='infoWindow-body-form-button'>
            Add field
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
