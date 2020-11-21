import React, { useContext } from 'react'
import 'sass/toolbar.sass'
import { NavLink, useParams } from 'react-router-dom'
import { Loader } from 'components/misc/Loader'
import { AppContext } from 'context/AppContext'
import { signOutHandler } from 'backend/signOutHandler'
import { ModalContext } from 'context/ModalContext'

import { DropDown } from 'components/toolbar/DropDown'
import { isEmptyObj } from 'components/utilities/isEmptyObj'

export const Toolbar = () => {
  const { updated, appState, appReboot } = useContext(AppContext)
  const { showModal } = useContext(ModalContext)
  const { layout } = useParams()

  const getLayouts = () => {
    if (isEmptyObj(appState.layouts)) {
      return Object.keys(appState.layouts).map((e, i) => {
        return (
          <NavLink key={i} to={`/product/map/${e}`}>
            {e}
          </NavLink>
        )
      })
    } else {
      return (
        <NavLink
          to={'#'}
          onClick={() => {
            showModal('CreateOwnLayout', '')
          }}
        >
          Create own layout
        </NavLink>
      )
    }
  }
  const layouts = [getLayouts()]
  const tools = [
    <NavLink
      to={'#'}
      onClick={() => {
        showModal('CreateOwnLayout', '')
      }}
    >
      Create own layout
    </NavLink>,
    <NavLink
      to={'#'}
      onClick={() => {
        showModal('UploadNewMap', '') //should be dinamicly
      }}
    >
      Upload new map
    </NavLink>,
    <NavLink
      to={'#'}
      onClick={() => {
        localStorage.removeItem('map')
        appReboot()
      }}
    >
      Change map
    </NavLink>
  ]
  return (
    <nav id='toolbar' className='toolbar'>
      <img className='toolbar-img' src='/logoVerallia.jpg' alt='logo' />
      <ul className='toolbar-list'>
        <li>
          <DropDown title='Layouts' items={layouts} />
        </li>
        <div className={'toolbar-item-border'}></div>
        <li>
          <DropDown title='Tools' items={tools} />
        </li>
        <div className={'toolbar-item-border'}></div>
        <li style={{ width: 900 + 'px', color: 'whitesmoke', textAlign: 'center' }}>
          <b>{layout ? layout : null}</b>
        </li>
        <div className={'toolbar-item-border'}></div>
        <li>
          <NavLink className={'toolbar-item'} to='/product/menu'>
            Menu
          </NavLink>
        </li>
        <div className={'toolbar-item-border'}></div>
        <li>
          <NavLink className={'toolbar-item'} to='/auth/signIn' onClick={signOutHandler}>
            Logout
          </NavLink>
        </li>
        <li>{!updated ? <Loader type={'little'} /> : null}</li>
      </ul>
    </nav>
  )
}
