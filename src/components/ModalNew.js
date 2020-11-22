import React, { useState, useEffect } from 'react'
import { ModalContext } from 'context/ModalContext'
import { CreateOwnLayout } from './layouts/ownLayouts/CreateOwnLayout'
import { AcceptSVG } from './layouts/drawSVG/AcceptSVG'
import AddNewWork from './layouts/subcontractors/AddNewWork'
import InfoSubc from './layouts/drawSVG/InfoSubc'
import { AcceptUserSVG } from './layouts/ownLayouts/AcceptUserSVG'
import { UserClickInfo } from './layouts/ownLayouts/UserClickInfo'
import { ShowUploadNewMap } from './mapImages/ShowUploadNewMap'
import { ShowChoiseOfMap } from './mapImages/ShowChoiseOfMap'

export const ModalNew = ({ children }) => {
  const [modalState, setModalState] = useState({
    type: null,
    content: null
  })
  const [modal, setModal] = useState(null)

  const removeHandler = (e, handler) => {
    e.preventDefault()
    if (e.target === e.currentTarget) {
      handler()
    }
  }

  const removeModal = () => {
    setModalState({
      type: null,
      content: null
    })
  }

  const showModal = (type, content) => {
    setModalState({
      type,
      content
    })
  }

  useEffect(() => {
    switch (modalState.type) {
      case null:
        setModal(null)
        break
      case 'InfoSubc':
        setModal(<InfoSubc content={modalState.content} />)
        break
      case 'AddNewWork':
        setModal(<AddNewWork content={modalState.content} />)
        break
      case 'AcceptSVG':
        setModal(<AcceptSVG content={modalState.content} />)
        break
      case 'AcceptUserSVG':
        setModal(<AcceptUserSVG content={modalState.content} />)
        break
      case 'CreateOwnLayout':
        setModal(<CreateOwnLayout />)
        break
      case 'UploadNewMap':
        setModal(<ShowUploadNewMap />)
        break
      case 'ChooseMap':
        setModal(<ShowChoiseOfMap content={modalState.content} />)
        break
      case 'UserClickInfo':
        setModal(<UserClickInfo content={modalState.content} />)
        break
      default:
        setModal(null)
        break
    }
  }, [modalState])

  return (
    <ModalContext.Provider value={{ showModal, removeModal }}>
      {modalState.type != null ? (
        <div
          onClick={(e) => {
            removeHandler(e, removeModal)
          }}
          className='modal'
        >
          {modal}
        </div>
      ) : null}
      {children}
    </ModalContext.Provider>
  )
}
