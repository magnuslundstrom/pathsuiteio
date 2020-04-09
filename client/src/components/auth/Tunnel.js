import React from 'react'

class Tunnel extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          height: '100vh',
          width: '100vw',
        }}
      >
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
      </div>
    )
  }
}

export default Tunnel
