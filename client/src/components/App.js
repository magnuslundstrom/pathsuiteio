import React from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Login from './auth/Login'
import SignUp from './auth/SignUp'
import Tunnel from './auth/Tunnel'
import Dashboard from './dashboard/Dashboard'

class App extends React.Component {
  closedRoutes = () => {
    if (this.state.loggedIn) {
      return (
        <div>
          <Route path='/dashboard' exact component={Dashboard} />
        </div>
      )
    } else {
      return <Redirect to='/'></Redirect>
    }
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Route path='/' exact component={Login} />
            <Route path='/sign-up' exact component={SignUp} />
            <Route path='/tunnel' exact component={Tunnel} />
            {this.closedRoutes()}
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default App
