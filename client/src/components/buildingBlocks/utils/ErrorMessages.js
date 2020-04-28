import React, { useState } from 'react'

export const AuthError = (props) => {
  return (
    <p className="mb-5 w-64 error">
      <i className="fas fa-exclamation-triangle error"></i> {props.msg}
    </p>
  )
}

export const LimitationBox = (props) => {
  const [display, setDisplay] = useState('block')
  const renderLimitations = () => {
    return props.limits.map((limit, index) => {
      return (
        <li key={index} className="list-disc">
          {limit}
        </li>
      )
    })
  }
  return (
    <div className="bg-secBlue p-5 mt-8 mb-10" style={{ display: display }}>
      <div className="flex justify-between">
        <h3>Current limitations</h3>
        <button onClick={() => setDisplay('none')}>
          <i className="fas fa-times font-semibold"></i>
        </button>
      </div>

      <ul className="ml-10 mt-3">{renderLimitations()}</ul>
    </div>
  )
}
