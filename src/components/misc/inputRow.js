import React, { useEffect, useState } from 'react'

function InputRow({ text, data, fun, type, order, value }) {
  const [state, setState] = useState(value)

  useEffect(() => {
    fun(data, state, type, order)
  }, [state, value])

  return (
    <input
      value={state ? state : ''}
      onChange={(e) => {
        setState(e.target.value)
      }}
      type={type}
      className='infoWindow-body-form-input'
      placeholder={text}
    />
  )
}

export default InputRow
