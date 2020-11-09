import React from 'react'

function InputText({ text, data, fun }) {
  return (
    <textarea
      onChange={(e) => {
        fun(data, e.target.value)
      }}
      className="infoWindow-body-form-input"
      placeholder={text}
    />
  )
}

export default InputText
