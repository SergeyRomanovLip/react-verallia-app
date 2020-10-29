import React from 'react'
import Datetime from 'react-datetime'

function DatetimeOwn({ text, data, fun }) {
  return (
    <Datetime
      className={'infoWindow-body-form-dateTimeContaineer-item'}
      onChange={(e) => {
        fun(data, e._d)
      }}
      inputProps={{ placeholder: [text], className: 'infoWindow-body-form-dateTimeContaineer-item-inp' }}
      dateFormat={'DD MMMM YY ||'}
      timeFormat={'HH:mm'}
    ></Datetime>
  )
}

export default DatetimeOwn
