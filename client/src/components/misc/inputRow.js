import React from 'react'

function InputRow({ text, data, fun, type }) {
  return (
    <input
      onChange={(e) => {
        fun(data, e.target.value)
      }}
      type={type}
      className="infoWindow-body-form-input"
      placeholder={text}
    />
  )
}

export default InputRow
