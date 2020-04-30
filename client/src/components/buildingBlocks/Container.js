import React from 'react'
import Header from './header/Header'

const Container = (props) => {
  // A container to reuse that includes header and includes props.children
  return (
    <div>
      <Header />
      <div className="w-8/12 m-auto px-5 pt-10 pb-20">{props.children}</div>
    </div>
  )
}
export default Container
