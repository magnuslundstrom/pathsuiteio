import React from 'react'
import Notification from './Notification'

// Represents the list of notifications. maps over list array and returns a notifcations for each i
const NotificationList = (props) => {
  const renderNotifications = () => {
    if (props.notifications.length === 0) return <p>{props.zeroMessage}</p>
    return props.notifications.map((notification, index) => {
      return (
        <Notification
          data={notification}
          key={index}
          isAdmin={props.isAdmin}
          index={index}
          length={props.notifications.length}
          onScroll={props.onScroll}
        />
      )
    })
  }

  return (
    <div className="pr-5 pl-5 h-84 overflow-scroll overflow-x-hidden special-scroll">
      {renderNotifications()}
    </div>
  )
}

export default NotificationList
