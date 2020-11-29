import React, { useContext, useEffect } from 'react'
import 'sass/toolbar.sass'
import { NavLink, useHistory, useParams } from 'react-router-dom'
import { Loader } from 'components/misc/Loader'
import { AppContext } from 'context/AppContext'
import { signOutHandler } from 'backend/signOutHandler'
import { ModalContext } from 'context/ModalContext'
import { DropDown } from 'components/toolbar/DropDown'
import { isEmptyObj } from 'components/utilities/isEmptyObj'
import { ReportCreater } from 'components/utilities/ReportCreater'

export const Toolbar = () => {
  const { updated, appState, appReboot, color } = useContext(AppContext)
  const { showModal } = useContext(ModalContext)
  const { layout } = useParams()
  const history = useHistory()

  useEffect(() => {
    if (!Object.keys(appState.layouts).includes(layout)) {
      if (Object.keys(appState.layouts).length > 0) {
        history.push(`/product/map/${Object.keys(appState.layouts)[0]}`)
      } else {
        history.push('/product/map/no layouts')
      }
    }
  }, [layout, appState]) // eslint-disable-line react-hooks/exhaustive-deps

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
      return layout !== 'no layouts' ? (
        <NavLink
          to={'#'}
          onClick={() => {
            showModal('CreateOwnLayout', '')
          }}
        >
          Create own layout
        </NavLink>
      ) : null
    }
  }
  const layouts = [getLayouts()]
  const tools = [
    layout !== 'no layouts' ? (
      <NavLink
        to={'#'}
        onClick={() => {
          showModal('CreateOwnLayout', '')
        }}
      >
        Create own layout
      </NavLink>
    ) : null,
    <NavLink
      to={'#'}
      onClick={() => {
        showModal('UploadNewMap', '')
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
    </NavLink>,
    layout !== 'no layouts' ? (
      <NavLink
        to={'#'}
        onClick={() => {
          showModal('openReport', ReportCreater(appState.layouts[layout]))
        }}
      >
        Create report for layer
      </NavLink>
    ) : null
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
        <li
          className={'toolbar-item'}
          style={{
            width: 900 + 'px',
            color: 'whitesmoke',
            textAlign: 'center',
            backgroundColor: color ? color.rgba : ''
          }}
        >
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
      </ul>
      <div className={'toolbar-loaderBar'}>
        <div className='loader'>
          {!updated ? (
            <>
              <div className='bar first'></div>
              <div className='bar second'></div>
              <div className='bar third'></div>
              <div className='bar forth'></div>
              <div className='bar fifth'></div>
            </>
          ) : null}
        </div>
      </div>
    </nav>
  )
}
