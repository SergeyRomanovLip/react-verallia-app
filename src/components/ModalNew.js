import React, { useState, useEffect } from 'react'
import { ModalContext } from 'context/ModalContext'
import { CreateOwnLayout } from './layouts/CreateOwnLayout'
import { AcceptSVG } from './layouts/AcceptSVG'
import { AddNewNote } from './layouts/AddNewNote'
import InfoSubc from './layouts/.old/drawSVG/InfoSubc'
import { AreaClick } from './layouts/AreaClick'
import { ShowUploadNewMap } from './mapImages/ShowUploadNewMap'
import { ShowChoiseOfMap } from './mapImages/ShowChoiseOfMap'
import { AcceptAction } from 'components/layouts/AcceptAction'
import { OpenReport } from 'components/layouts/OpenReport'

export const ModalNew = ({ children }) => {
  const [modalState, setModalState] = useState({
    type: null,
    content: null
  })
  const [modal, setModal] = useState(null)
  const [animation, setAnimation] = useState(false)

  const removeModal = () => {
    setAnimation(false)
    setTimeout(() => {
      setModalState({
        type: null,
        content: null
      })
    }, 100)
  }

  const showModal = (type, content) => {
    if (!modal) {
      setTimeout(() => {
        setModalState({
          type,
          content
        })
        setTimeout(() => {
          setAnimation(true)
        }, 100)
      }, 1)
    } else {
      removeModal()
      setTimeout(() => {
        setModalState({
          type,
          content
        })
        setTimeout(() => {
          setAnimation(true)
        }, 100)
      }, 100)
    }
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
      case 'AcceptAction':
        setModal(<AcceptAction content={modalState.content} />)
        break
      case 'openReport':
        setModal(<OpenReport content={modalState.content} />)
        break
      default:
        setModal(null)
        break
    }
  }, [modalState])

  return (
    <ModalContext.Provider value={{ showModal, removeModal }}>
      {modalState.type != null ? <div className={`modal anim-modal ${animation ? 'rendered' : 'waiting'}`}>{modal}</div> : null}
      {children}
    </ModalContext.Provider>
  )
}
