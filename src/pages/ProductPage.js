import React from 'react'
import { NavLink } from 'react-router-dom'
import { signOutHandler } from 'backend/signOutHandler'

export const ProductPage = () => {
  return (
    <div className='modal'>
      <nav id='toolbarVertical' className='toolbarVertical'>
        <div className='toolbarVertical-header'>Choise product</div>
        <ul className='toolbarVertical-list'>
          <li>
            <NavLink className={'toolbarVertical-item'} to='/product/map/subcontractors'>
              Interactive Map
            </NavLink>
          </li>
          <div className={'toolbarVertical-item-border'}></div>
          <li>
            <NavLink className={'toolbarVertical-item'} to='/product/map/incidents'>
              Kamishibai Audits
            </NavLink>
          </li>
          <div className={'toolbarVertical-item-border'}></div>
          <li>
            <NavLink className={'toolbarVertical-item'} to='/product/map/incidents'>
              Pre route inspection
            </NavLink>
          </li>
          <div className={'toolbarVertical-item-border'}></div>
          <li>
            <a className={'toolbarVertical-item'} href='/' onClick={signOutHandler}>
              Выйти
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}
