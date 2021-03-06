import React, { useState } from 'react'
import axios from 'axios'
import SlidesList from './slides/SlidesList'
import PageNumber from './PageNumber'
import admin from './slides/admin.js'
import employee from './slides/employee.js'

// Expects props.isAdmin
// Represent the onboard component/overlay
const Onboard = (props) => {
  const [slideNumber, setSlideNumber] = useState(0)
  const [slides] = useState(props.isAdmin ? admin : employee)

  // Goes next slide
  const onNextClick = () => {
    if (slideNumber < slides.length - 1) {
      setSlideNumber(slideNumber + 1)
    }
  }

  // sets isFirstTime to false in DB
  const onClose = async () => {
    await axios.get('/api/welcome')
    window.location.reload()
  }

  return (
    <div
      className="w-screen max-w-full absolute top-0 left-0 bg-transparent-gray z-50 flex justify-center"
      style={{ minHeight: document.documentElement.scrollHeight }}
    >
      <div className="mt-40 bg-white rounded-lg shadow-md self-start w-108 py-10 px-10 relative flex flex-col items-center">
        <button className="absolute top-0 right-0 mt-4 mr-5" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        <SlidesList index={slideNumber} slides={slides} />
        <PageNumber numbers={slides.length} currentPage={slideNumber} onClick={setSlideNumber} />
        {(slideNumber < slides.length - 1 && (
          <button className="btn btn-green py-2 px-10 mt-5" onClick={onNextClick}>
            Next
          </button>
        )) || (
          <button className="btn btn-green py-2 px-10 mt-5" onClick={onClose}>
            Done!
          </button>
        )}
      </div>
    </div>
  )
}

export default Onboard
