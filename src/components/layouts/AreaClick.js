import React, { useContext, useEffect, useState } from 'react'
import { ModalContext } from 'context/ModalContext'
import { AppContext } from 'context/AppContext'

export const AreaClick = ({ content }) => {
  const { removeModal, showModal } = useContext(ModalContext)
  const { appDispatch, appState } = useContext(AppContext)
  const [existingNotes, setExistingNotes] = useState([])

  useEffect(() => {
    try {
      let notes = appState.layouts[content.layout].listOfAreas[content.id].listOfNotes
      setExistingNotes(notes)
    } catch (e) {
      alert(e)
      setExistingNotes([])
    }
  }, [content, appState])

  const removeAreaHandler = () => {
    deleteArea()
    removeModal()
  }

  const deleteArea = () => {
    appDispatch(['deleteArea', content])
  }

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
            if (e[0][el].value) {
              return (
                <li className={'listOfWorks-work'} key={element.order}>
                  <div className={element.value ? 'checkbox-checked' : 'checkbox'}>{nameOfField}</div>
                </li>
              )
            }
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
        <span className='infoWindow-listOfWorks-work-removeButton' id='deleteWork'>
          <span
            className='edit'
            onClick={() => {
              removeModal()
              showModal('AddNewNote', { ...content, exact: e })
            }}
          >
            edit
          </span>
          <span
            className='remove'
            onClick={() => {
              showModal('AcceptAction', () => {
                appDispatch(['deleteNote', content, e[0]])
              })
            }}
          >
            delete
          </span>
        </span>
        <ul className={'infoWindow-listOfWorks-work-ul'}>{array}</ul>
      </>
    )
  }

  return (
    <div className='infoWindow'>
      <div className='infoWindow-header'>
        {content.name}
        <span
          onClick={() => {
            removeModal()
          }}
          className='infoWindow-body-form-button-close'
        >
          ✖
        </span>
      </div>
      <div className='infoWindow-body'>
        <ul className='infoWindow-listOfWorks-work-ul'>
          {existingNotes.length > 0 ? (
            existingNotes.map((e, i) => {
              return (
                <li className='infoWindow-listOfWorks-workContaineer' key={i}>
                  {dataShower(e, i)}
                </li>
              )
            })
          ) : (
            <li className='listOfWorks-work'>There are no notes yet</li>
          )}
        </ul>
        <div className='infoWindow-body-form'>
          <div
            onClick={() => {
              removeModal()
              showModal('AddNewNote', content)
            }}
            className='infoWindow-body-form-button'
          >
            Add new note
          </div>
          <div
            onClick={() => {
              showModal('AcceptAction', removeAreaHandler)
            }}
            className='infoWindow-body-form-button'
          >
            Remove area
          </div>
        </div>
      </div>
    </div>
  )
}
