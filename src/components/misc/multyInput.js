import React from 'react'
import DatetimeOwn from './datetime'

export const MultiInput = ({ text, data, fun, type }) => {
  if (type[0] === 'date') {
    return <DatetimeOwn text={text} data={data} fun={fun} />
  } else {
    return (
      <input
        onChange={(e) => {
          fun(data, e.target.value)
        }}
        type={type}
        className='infoWindow-body-form-input'
        placeholder={text}
      />
    )
  }
}
