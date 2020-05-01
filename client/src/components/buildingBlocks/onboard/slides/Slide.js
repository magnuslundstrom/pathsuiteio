import React from 'react'

// receives image, title and description from slidesList.js

const Slide = (props) => {
  return (
    <div className="flex flex-col items-center">
      <img src={props.image} alt="slide" className="mb-5" />
      <h2 className="mb-2">{props.title}</h2>
      <p className="text-center">{props.description}</p>
    </div>
  )
}

export default Slide
