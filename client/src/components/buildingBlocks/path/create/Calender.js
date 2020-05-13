import React, { useRef } from 'react'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const Calender = (props) => {
  const datePickerRef = useRef(null)

  const onDateClick = () => {
    props.onClick()
    setTimeout(() => {
      datePickerRef.current.setOpen(true)
    })
  }

  return (
    <div className="inline overflow-x-hidden flex items-center">
      <i className="far fa-calendar-alt mr-2"></i>{' '}
      {!props.date ? (
        <button className="input-border-gray text-left text-secGray" onClick={() => onDateClick()}>
          {props.buttonText}
        </button>
      ) : (
        <DatePicker
          selected={props.date}
          onChange={(date) => props.updateDate(date)}
          ref={datePickerRef}
        />
      )}
    </div>
  )
}

export default Calender
