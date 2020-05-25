import React, { useState } from 'react'

// Represents an errorMessage component
export const AuthError = (props) => {
  return (
    <p className='mb-5 w-64 error'>
      <i className='fas fa-exclamation-triangle error'></i> {props.msg}
    </p>
  )
}
