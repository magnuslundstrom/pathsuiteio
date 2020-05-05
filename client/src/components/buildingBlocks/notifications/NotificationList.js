import React from 'react'
import Notification from './Notification'

const NotificationList = (props) => {
  const renderNotifications = () => {
    return props.notifications.map((notification, index) => {
      return <Notification data={notification} />
    })
  }

  return <div className='bg-white rounded-lg shadow-md p-5'>{renderNotifications()}</div>
}

export default NotificationList
