import React from 'react'
// import { Redirect } from 'react-router-dom'

import { GrayBg } from './styledComponents'
// import axios from 'axios'

class Tunnel extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <GrayBg>
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <p style={{ marginTop: '30px' }}>Fetching user data</p>
      </GrayBg>
    )
  }
}

export default Tunnel
