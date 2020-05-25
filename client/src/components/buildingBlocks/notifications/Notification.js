import React, { useEffect, useRef } from 'react'

// Represents a notification on /dashboard in the sidebar
const Notification = (props) => {
  const notificationString = (description) => {
    // replaces name with you if user !isAdmin
    if (!props.isAdmin) {
      return description.replace(props.data.user.firstName + ' ' + props.data.user.lastName, 'You')
    }
    return description
  }

  const notificationRef = useRef(null)
  const options = {
    threshold: 1.0,
  }
  // used to observe the last index and call props.onScroll which fetches extended list of notifications
  let observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (props.length - 1 === props.index) props.onScroll()
      }
    })
  }, options)

  // Observes on render
  useEffect(() => {
    observer.observe(notificationRef.current)
  }, [])

  return (
    <div className="flex mb-5" ref={notificationRef}>
      <img
        src={`data:image/png;base64, ${props.data.user.image}`}
        className="rounded-full block w-16 h-16 mr-3"
        alt="profile"
      />

      <div>
        <p className="font-semibold">{props.data.date}</p>
        <p>{notificationString(props.data.description)}</p>
      </div>
    </div>
  )
}

export default Notification
