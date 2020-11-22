import React from 'react'
import Datetime from 'react-datetime'

function DatetimeOwn({ text, data, fun, order }) {
  return (
    <Datetime
      className={'infoWindow-body-form-dateTimeContaineer-item'}
      onChange={(e) => {
        fun(data, e._d instanceof Date && !isNaN(e._d.valueOf()) ? e._d.toLocaleString() : null, 'date', order)
      }}
      inputProps={{
        placeholder: [text],
        className: 'infoWindow-body-form-dateTimeContaineer-item-inp'
      }}
      dateFormat={'DD MMMM YY ||'}
      timeFormat={'HH:mm'}
      closeOnClickOutside={true}
      closeOnSelect={true}
    ></Datetime>
  )
}

export default DatetimeOwn
