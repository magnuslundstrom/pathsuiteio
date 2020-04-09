import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import fetchUser from '../../redux/actions/fetchUser'
import axios from 'axios'

class Tunnel extends React.Component {
  state = {
    authorized: 'loading',
  }
  async componentDidMount() {
    try {
      const user = await axios.get('/api/tunnel')

      this.props.fetchUser(user.data)
      this.setState({ authorized: true })
    } catch (e) {
      console.log(e)
      if (e.response.status === 401) {
        this.setState({ authorized: false })
      } else {
        console.log(e)
      }
    }
  }

  renderContent = () => {
    if (this.state.authorized === 'loading') {
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
        </div>
      )
    } else if (this.state.authorized) {
      return <Redirect to="/dashboard" />
    } else {
      return <Redirect to="/" />
    }
  }
  render() {
    return <div>{this.renderContent()}</div>
  }
}

export default connect(null, { fetchUser })(Tunnel)
