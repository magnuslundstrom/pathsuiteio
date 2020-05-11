import React, { useState } from 'react'
import Notification from './Notification'

const NotificationList = (props) => {
  const renderNotifications = () => {
    return props.notifications.map((notification, index) => {
      return <Notification data={notification} key={index} />
    })
  }

  return (
    <div className="pr-5 pl-5 h-84 overflow-scroll overflow-x-hidden special-scroll">
      {renderNotifications()}
    </div>
  )
}

export default NotificationList
