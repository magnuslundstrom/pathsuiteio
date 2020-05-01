import React from 'react'

import Slide from './Slide'

// generates a list of the slides and returns only the current index passed from onBoard.js
// recieves: index, slides as props

const SlideList = (props) => {
  const slides = props.slides.map((slide) => (
    <Slide image={slide.image} title={slide.title} description={slide.description} />
  ))
  return <div>{slides[props.index]}</div>
}

export default SlideList
