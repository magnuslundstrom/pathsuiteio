import React from 'react'

const Notification = ({ data }) => {
  return (
    <div className='flex'>
      <div className='w-16 h-16 rounded-full bg-green mr-5'></div>
      <div>
        <p>{data.date}</p>
        <p>{data.description}</p>
      </div>
    </div>
  )
}

export default Notification
