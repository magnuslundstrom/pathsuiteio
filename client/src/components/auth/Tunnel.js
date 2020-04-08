import React from 'react'
import { Redirect } from 'react-router-dom'

import axios from 'axios'

class Tunnel extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <div class='lds-roller'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    )
  }
}

export default Tunnel
