import React from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import { logIn } from '../redux/actions/logInOut'
import { connect } from 'react-redux'
import Login from './auth/Login'
import SignUp from './auth/SignUp'
import Tunnel from './auth/Tunnel'
import Dashboard from './dashboard/Dashboard'
import Paths from './dashboard/paths/Paths'
import CreatePath from './dashboard/paths/CreatePath'
import CreateUser from './dashboard/employees/CreateUser'
import Employees from './dashboard/employees/Employees'
import Profile from './dashboard/account/Profile'
import AccountUsers from './dashboard/account/AccountUsers'
import axios from 'axios'

class App extends React.Component {
  async componentDidMount() {
    try {
      const res = await axios.get('/api/app-did-mount')
      if (res) {
        this.props.logIn()
      }
    } catch (e) {}
  }

  openRoutes = () => {
    if (!this.props.loggedIn) {
      return (
        <div>
          <Route path="/" exact component={Login} />
          <Route path="/sign-up" exact component={SignUp} />
        </div>
      )
    } else {
      return <Redirect to="/tunnel"></Redirect>
    }
  }

  closedRoutes = () => {
    if (this.props.loggedIn) {
      return (
        <div>
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/tunnel" exact component={Tunnel} />
          <Route path="/paths" exact component={Paths} />
          <Route path="/create-path" exact component={CreatePath} />
          <Route path="/employees" exact component={Employees} />
          <Route path="/create-user" exact component={CreateUser} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/account-users" exact component={AccountUsers} />
        </div>
      )
    } else {
      return <Redirect to="/"></Redirect>
    }
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          {this.openRoutes()}
          {this.closedRoutes()}
        </BrowserRouter>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
  }
}

export default connect(mapStateToProps, { logIn })(App)
