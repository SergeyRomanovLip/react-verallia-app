import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from 'context/AppContext'

function SubcLabel({ left, top, data }) {
  const { appState } = useContext(AppContext)
  console.log(data)
  return (
    <div className={`works-sign`} style={{ position: ['absolute'], top: top + 'px', left: left + 'px' }}>
      {data.name}
    </div>
  )
}

export default SubcLabel
