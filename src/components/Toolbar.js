import React, { useContext } from 'react'
import '../sass/toolbar.sass'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { Loader } from './Loader'
import { AppContext } from '../context/AppContext'

export const Toolbar = () => {
  const history = useHistory()
  const { signOutUser } = useContext(AuthContext)
  const { updated } = useContext(AppContext)
  const logoutHandler = (event) => {
    event.preventDefault()
    signOutUser()
    history.push('/')
  }

  return (
    <nav id='toolbar' className='toolbar'>
      <img className='toolbar-img' src='/logoVerallia.jpg' alt='logo' />
      <ul className='toolbar-list'>
        <li>
          <NavLink className={'toolbar-item'} to='/map/subcontractors'>
            Подрядчики
          </NavLink>
        </li>
        <div className={'toolbar-item-border'}></div>
        <li>
          <NavLink className={'toolbar-item'} to='/map/incidents'>
            Инциденты
          </NavLink>
        </li>
        <div className={'toolbar-item-border'}></div>
        {/* <li>
          <NavLink className={"toolbar-item"} to="/create">
            Создать
          </NavLink>
        </li>
        <div className={"toolbar-item-border"}></div>
        <li>
          <NavLink className={"toolbar-item"} to="/links">
            Ссылки
          </NavLink>
        </li> */}
        <li>
          <a className={'toolbar-item'} href='/' onClick={logoutHandler}>
            Выйти
          </a>
        </li>
        <li>{!updated ? <Loader type={'little'} /> : null}</li>
      </ul>
      {/* <div className="toolbar-status">
        <div id="toolbar-status-text" calss="toolbar-status-text">
          {appState.layout} layout
        </div>
      </div> */}
    </nav>
  )
}
