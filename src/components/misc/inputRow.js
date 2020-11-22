import React from 'react'

function InputRow({ text, data, fun, type, order }) {
  return (
    <input
      onChange={(e) => {
        fun(data, e.target.value, type, order)
      }}
      type={type}
      className='infoWindow-body-form-input'
      placeholder={text}
    />
  )
}

export default InputRow
