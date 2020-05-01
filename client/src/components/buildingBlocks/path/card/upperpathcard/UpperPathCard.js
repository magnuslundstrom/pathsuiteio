import React from 'react'

const UpperPathCard = (props) => {
  return (
    <div className="flex">
      <img
        src={`data:image/png;base64, ${props.image}`}
        className="rounded-full w-24 h-24"
        alt="profile"
      />
      <div className="ml-3">
        <h3>{props.name}</h3>
        <p>{props.jobTitle}</p>
        <p className="mt-3">{props.pathTitle}</p>
      </div>
    </div>
  )
}

export default UpperPathCard

/* WITHOUT IMAGE
    <div>
      <h3>{props.path.title}</h3>
      <p className="mt-5">
        <i className="fas fa-user"></i> {props.path.user.firstName} {props.path.user.lastName}
      </p>
    </div>
*/
