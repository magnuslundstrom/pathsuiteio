import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import axios from 'axios'

import { logIn } from '../redux/actions/logInOut'
import ScreenLoader from './buildingBlocks/utils/ScreenLoader'
import Login from './auth/Login'
import SignUp from './auth/SignUp'
import Dashboard from './dashboard/Dashboard'
import Tunnel from './auth/Tunnel'
import Paths from './dashboard/Paths'
import Employees from './dashboard/Employees'
import CreatePath from './dashboard/CreatePath'
import CreateUser from './dashboard/CreateUser'
import InvitedUser from './auth/InvitedUser'
import Profile from './dashboard/Profile'
import AccountUsers from './dashboard/AccountUsers'
import User from './dashboard/User'
import EditPath from './dashboard/EditPath'
import AccountInformation from './dashboard/AccountInformation'
import SuccessMessage from './buildingBlocks/utils/SuccessMessage'

class App extends React.Component {
  state = {
    loading: true,
  }

  async componentDidMount() {
    try {
      const res = await axios.get('/api/mount')
      if (res) {
        this.props.logIn()

        this.setState({ loading: false })
      }
    } catch (e) {
      this.setState({ loading: false })
    }
  }

  renderRoutes = () => {
    if (this.state.loading) {
      return <ScreenLoader />
    }
    if (this.props.loggedIn) {
      // If the user has'nt been set in redux store
      if (!this.props.user.hasOwnProperty('firstName')) {
        return <Tunnel />
        // If the user has been set in redux store
      } else {
        return (
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/paths" exact component={Paths} />
            <Route path="/employees" exact component={Employees} />
            <Route path="/create-path" exact component={CreatePath} />
            <Route path="/create-user" exact component={CreateUser} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/account-users" exact component={AccountUsers} />
            <Route path="/user" component={User} />
            <Route path="/edit-path" component={EditPath} />
            <Route path="/account-information" component={AccountInformation} />
            <Route path="*" render={() => <Redirect to="/" />} />
          </Switch>
        )
      }
      // If the user is not logged in
    } else {
      return (
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/sign-up" exact component={SignUp} />
          <Route path="/invited-user" exact component={InvitedUser} />
          <Route path="*" render={() => <Redirect to="/" />} />
        </Switch>
      )
    }
  }

  render() {
    return (
      <BrowserRouter>
        {this.props.successMessage && <SuccessMessage />}

        {this.renderRoutes()}
      </BrowserRouter>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
    user: state.user,
    successMessage: state.successMessage,
  }
}

export default connect(mapStateToProps, { logIn })(App)
