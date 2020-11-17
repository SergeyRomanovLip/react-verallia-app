import React, { useContext, useEffect } from 'react'
import '../sass/toolbar.sass'
import { NavLink, useParams } from 'react-router-dom'
import { Loader } from './Loader'
import { AppContext } from '../context/AppContext'
import { signOutHandler } from '../backend/signOutHandler'
import { ModalContext } from '../context/ModalContext'
import { ToolbarItem } from './ToolbarItem'

export const Toolbar = () => {
  const { updated, appState } = useContext(AppContext)
  const { showModal } = useContext(ModalContext)

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

        {appState.userLayouts
          ? Object.keys(appState.userLayouts).map((e, i) => {
              return <ToolbarItem key={i} link={`/product/map/${e}||user`} data={e} />
            })
          : null}

        <li style={{ width: 50 + 'px' }}></li>
        <div className={'toolbar-item-border'}></div>
        <li>
          <NavLink className={'toolbar-item'} to='/product/menu'>
            Menu
          </NavLink>
        </li>
        <div className={'toolbar-item-border'}></div>
        <li>
          <p
            onClick={() => {
              showModal('CreateOwnLayout', '')
            }}
            className={'toolbar-item'}
          >
            Create own layout
          </p>
        </li>
        <div className={'toolbar-item-border'}></div>
        <li>
          <p
            onClick={() => {
              showModal('UploadNewMap', '') //should be dinamicly
            }}
            className={'toolbar-item'}
          >
            Upload new map
          </p>
        </li>
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
