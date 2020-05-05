import React, { useState } from 'react'
import Notification from './Notification'

const NotificationList = (props) => {
  let START_INDEX = 0
  let SPLICE_NUMBER = 5
  const [notifications, setNotifications] = useState([
    ...props.notifications.slice(START_INDEX, SPLICE_NUMBER),
  ])

  const fetchMore = () => {
    SPLICE_NUMBER = SPLICE_NUMBER + 5
    setNotifications([...props.notifications.slice(START_INDEX, SPLICE_NUMBER)])
  }

  const renderNotifications = () => {
    return notifications.map((notification, index) => {
      return (
        <Notification
          data={notification}
          key={index}
          last={index === notifications.length - 1 ? true : false}
          onIntersection={fetchMore}
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
