import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOut } from '../../redux/actions/logInOut'
import fetchUser from '../../redux/actions/fetchUser'
import axios from 'axios'

class Tunnel extends React.Component {
  state = {
    userLoaded: 'loading',
  }
  async componentDidMount() {
    try {
      const user = await axios.get('/api/tunnel')
      this.props.fetchUser(user.data)
      this.setState({ userLoaded: true })
    } catch (e) {
      this.props.logOut()
      this.setState({ userLoaded: false })
    }
  }

  renderContent = () => {
    if (this.state.userLoaded === 'loading') {
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
    } else if (this.state.userLoaded) {
      return <Redirect to="/create-path" />
    } else {
      return <Redirect to="/" />
    }
  }
  render() {
    return <div>{this.renderContent()}</div>
  }
}

export default connect(null, { fetchUser, logOut })(Tunnel)
