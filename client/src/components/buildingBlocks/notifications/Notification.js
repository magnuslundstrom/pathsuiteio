import React from 'react'

const Notification = (props) => {
  return (
    <div className="flex mb-5">
      <img
        src={`data:image/png;base64, ${props.data.user.image}`}
        className="rounded-full block w-16 h-16 mr-3"
        alt="profile"
      />

      <div>
        <p className="font-semibold">{props.data.date}</p>
        <p>{props.data.description}</p>
      </div>
    </div>
  )
}

export default Notification
