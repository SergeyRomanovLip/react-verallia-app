import React, { useState, useEffect } from 'react'
import { ModalContext } from 'context/ModalContext'
import { CreateOwnLayout } from './layouts/CreateOwnLayout'
import { AcceptSVG } from './layouts/.old/drawSVG/AcceptSVG'
import { AddNewNote } from './layouts/AddNewNote'
import InfoSubc from './layouts/.old/drawSVG/InfoSubc'
// import { AcceptUserSVG } from './layouts/ownLayouts/AcceptUserSVG'
import { AreaClick } from './layouts/AreaClick'
import { ShowUploadNewMap } from './mapImages/ShowUploadNewMap'
import { ShowChoiseOfMap } from './mapImages/ShowChoiseOfMap'

export const ModalNew = ({ children }) => {
  const [modalState, setModalState] = useState({
    type: null,
    content: null
  })
  const [modal, setModal] = useState(null)
  const [animationReady, setAnimationReady] = useState(false)

  useEffect(() => {
    if (modalState.type != null) {
      setAnimationReady(false)
      setTimeout(() => {
        setAnimationReady(true)
      }, 150)
    } else {
      setAnimationReady(false)
    }
  }, [modalState.content, modalState.type])

  // const removeHandler = (e, handler) => {
  //   e.preventDefault()
  //   if (e.target === e.currentTarget) {
  //     handler()
  //   }
  // }

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
      case 'AddNewNote':
        setModal(<AddNewNote content={modalState.content} />)
        break
      case 'AcceptSVG':
        setModal(<AcceptSVG content={modalState.content} />)
        break
      // case 'AcceptUserSVG':
      //   setModal(<AcceptUserSVG content={modalState.content} />)
      //   break
      case 'CreateOwnLayout':
        setModal(<CreateOwnLayout />)
        break
      case 'UploadNewMap':
        setModal(<ShowUploadNewMap />)
        break
      case 'ChooseMap':
        setModal(<ShowChoiseOfMap content={modalState.content} />)
        break
      case 'AreaClick':
        setModal(<AreaClick content={modalState.content} />)
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
          // onClick={(e) => {
          //   removeHandler(e, removeModal)
          // }}
          className={`${animationReady ? 'modal anim rendered' : 'modal anim waiting'}`}
        >
          {modal}
        </div>
      ) : null}
      {children}
    </ModalContext.Provider>
  )
}
