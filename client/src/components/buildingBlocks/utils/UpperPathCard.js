import React from 'react'

const UpperPathCard = (props) => {
  const renderContent = () => {
    if (props.position === 'paths') {
      return (
        <div className="flex">
          <img
            src={`data:image/png;base64, ${props.path.user.image}`}
            className="rounded-full w-24 h-24"
            alt="profile"
          />
          <div className="ml-3">
            <h3>
              {props.path.user.firstName} {props.path.user.lastName}
            </h3>
            <p>{props.path.user.jobTitle}</p>
            <p className="mt-3">{props.path.title}</p>
          </div>
        </div>
      )
    } else if (props.position === 'user') {
      return (
        <div>
          <h3>{props.path.title}</h3>
          <p className="mt-5">
            <i className="fas fa-user"></i> {props.path.user.firstName} {props.path.user.lastName}
          </p>
        </div>
      )
    }
  }
  return <div>{renderContent()}</div>
}

export default UpperPathCard
