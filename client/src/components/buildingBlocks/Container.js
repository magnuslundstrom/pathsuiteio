import React from 'react'
import Header from './header/Header'
// A container to reuse that includes header and receives props.children
const Container = (props) => {
  return (
    <div>
      <Header />
      <div className="w-11/12 m-auto px-5 pt-10 pb-20 xl:w-8/12">{props.children}</div>
    </div>
  )
}
export default Container
