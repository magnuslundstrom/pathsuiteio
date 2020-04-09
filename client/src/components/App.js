import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import Login from './auth/Login'
import SignUp from './auth/SignUp'
import Tunnel from './auth/Tunnel'
import Dashboard from './dashboard/Dashboard'

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Route path="/" exact component={Login} />
            <Route path="/sign-up" exact component={SignUp} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/tunnel" exact component={Tunnel} />
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
