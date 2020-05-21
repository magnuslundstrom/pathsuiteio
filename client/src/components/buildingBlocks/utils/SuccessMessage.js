import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { unsetSuccessMessage } from '../../../redux/actions/successMessage'

const SuccessMessage = (props) => {
  const fade = useRef(null)
  useEffect(() => {
    fade.current.classList.remove('h-0', 'opacity-0')
    fade.current.classList.add('h-20')
    setTimeout(() => {
      fade.current.classList.add('opacity-0', 'duration-300')
      setTimeout(() => {
        props.unsetSuccessMessage()
      }, 400)
    }, 4000)
  }, [props])

  return (
    <div
      className="fixed min-w-full py-0 bottom-0 left-0 bg-blue z-30 h-0 duration-1000 flex items-center opacity-0"
      ref={fade}
    >
      <div className="w-8/12 mx-auto px-5 text-center">
        <p className="text-white font-semibold">
          <span className="bg-white px-5 py-2 text-green rounded-md font-semibold mr-5">
            <i className="fas fa-check text-green text-sm"></i> SUCCESS
          </span>
          {props.successMessage}
        </p>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    successMessage: state.successMessage,
  }
}

export default connect(mapStateToProps, { unsetSuccessMessage })(SuccessMessage)
