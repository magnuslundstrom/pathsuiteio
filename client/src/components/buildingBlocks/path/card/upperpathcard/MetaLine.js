import React from 'react'

// Recieves {category, responsible}
// Represents the Meta line on a pathcard - dates, category and responsible
const MetaLine = (props) => {
  return (
    <div className='mt-5 flex'>
      <p>
        <i className='far fa-calendar-alt mr-3'></i>
        {props.startDate} - {props.endDate}
      </p>
      <p className='ml-10'>
        <i className='fas fa-sticky-note mr-2'></i> {props.category}
      </p>
      <p className='ml-10'>
        <i className='fas fa-user mr-2'></i> {props.responsible}
      </p>
    </div>
  )
}

export default MetaLine
