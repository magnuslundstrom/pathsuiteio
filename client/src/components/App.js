import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Login from './auth/Login'
import SignUp from './auth/SignUp'
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
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
