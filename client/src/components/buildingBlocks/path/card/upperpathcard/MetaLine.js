import React from 'react'

// Recieves {category, responsible}

const MetaLine = (props) => {
  return (
    <div className="mt-5 flex">
      <p>
        <i className="far fa-calendar-alt mr-1"></i>
        {props.date}
      </p>
      <p className="ml-10">
        <i className="fas fa-sticky-note"></i> {props.category}
      </p>
      <p className="ml-10">
        <i className="fas fa-user"></i> {props.responsible}
      </p>
    </div>
  )
}

export default MetaLine
