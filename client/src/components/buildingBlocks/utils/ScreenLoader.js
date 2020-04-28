import React from 'react'
import '../../../css/loadingSpinner.css'

const ScreenLoader = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        minHeight: '40vh',
        minWidth: '100%',
        position: 'absolute',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        left: '50%',
      }}
    >
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default ScreenLoader
