import React from 'react'
import { connect } from 'react-redux'
import { logOut } from '../../redux/actions/logInOut'
import { fetchUser } from '../../redux/actions/fetchUser'
import axios from 'axios'
import ScreenLoader from '../buildingBlocks/utils/ScreenLoader'

// Reaches api endpoint to check if user is logged in. If cookie exists sets user and loggedIn @redux store and redirects to dashboard
class Tunnel extends React.Component {
  async componentDidMount() {
    try {
      const user = await axios.get('/api/tunnel')
      this.props.fetchUser(user.data)
    } catch (e) {
      this.props.logOut()
    }
  }

  render() {
    return <ScreenLoader />
  }
}

export default connect(null, { fetchUser, logOut })(Tunnel)
