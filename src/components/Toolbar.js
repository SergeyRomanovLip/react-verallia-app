import React, { useContext, useEffect, useState } from 'react'
import '../sass/toolbar.sass'
import { NavLink } from 'react-router-dom'
import { Loader } from './Loader'
import { AppContext } from '../context/AppContext'
import { signOutHandler } from '../backend/signOutHandler'
import { ModalContext } from '../context/ModalContext'

export const Toolbar = () => {
  const { updated, appState } = useContext(AppContext)
  const { showModal } = useContext(ModalContext)
  const [userLayouts, setUserLayouts] = useState({})

  useEffect(() => {
    if (appState) {
    }
  }, [appState])

  return (
    <nav id='toolbar' className='toolbar'>
      <img className='toolbar-img' src='/logoVerallia.jpg' alt='logo' />
      <ul className='toolbar-list'>
        <li>
          <NavLink className={'toolbar-item'} to='/product/map/subcontractors'>
            Subcontractors
          </NavLink>
        </li>
        <div className={'toolbar-item-border'}></div>
        <li>
          <NavLink className={'toolbar-item'} to='/product/map/incidents'>
            Incidents
          </NavLink>
        </li>
        <div className={'toolbar-item-border'}></div>
        <li>
          <NavLink
            onClick={() => {
              showModal('CreateOwnLayout', '')
            }}
            className={'toolbar-item'}
            to='/product/map/create'
          >
            Create own layout
          </NavLink>
        </li>
        <div className={'toolbar-item-border'}></div>
        {appState.userLayouts
          ? Object.keys(appState.userLayouts).map((e, i) => {
              return (
                <NavLink key={i} className={'toolbar-item'} to={`/product/map/${e}`}>
                  {e}
                </NavLink>
              )
            })
          : null}
        <li>
          <NavLink className={'toolbar-item'} to='/product/menu'>
            Menu
          </NavLink>
        </li>
        <div className={'toolbar-item-border'}></div>
        <li style={{ width: 250 + 'px' }}></li>
        <div className={'toolbar-item-border'}></div>
        <li>
          <a className={'toolbar-item'} href='/' onClick={signOutHandler}>
            Logout
          </a>
        </li>
        <li>{!updated ? <Loader type={'little'} /> : null}</li>
      </ul>
    </nav>
  )
}
