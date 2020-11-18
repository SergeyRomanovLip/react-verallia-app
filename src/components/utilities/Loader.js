import React from 'react'

export const Loader = () => {
  return (
    <div className='center' style={{ zIndex: 100 }}>
      <div className='lds-grid'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}
