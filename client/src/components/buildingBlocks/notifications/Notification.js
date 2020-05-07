import React, { useRef, useEffect } from 'react'

const Notification = (props) => {
  const lastNoti = useRef(null)

  useEffect(() => {
    if (props.last) {
      const observerOptions = {
        threshold: 1.0,
      }
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) props.onIntersection()
        })
      }, observerOptions)
      observer.observe(lastNoti.current)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex mb-5" ref={lastNoti}>
      <div className="mr-5 self-center">
        <div className="w-16 h-16 rounded-full bg-green"></div>
      </div>
      <div>
        <p className="font-semibold">{props.data.date}</p>
        <p>{props.data.description}</p>
      </div>
    </div>
  )
}

export default Notification
