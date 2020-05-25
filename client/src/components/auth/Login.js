import React from 'react'

import { connect } from 'react-redux'
import axios from 'axios'

import { logIn } from '../../redux/actions/logInOut'
import { AuthError } from '../buildingBlocks/utils/ErrorMessages'
import AuthFormWrapper from '../buildingBlocks/AuthFormWrapper'

// Represents "/" when not loggedIn
class Login extends React.Component {
  state = {
    email: '',
    password: '',
    errors: '',
  }

  onSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/login', {
        email: this.state.email,
        password: this.state.password,
      })
      if (res) this.props.logIn()
    } catch (error) {
      this.setState({ errors: { ...error.response.data } })
    }
  }

  render() {
    return (
      <AuthFormWrapper header="Sign in" logIn>
        <form className="flex justify-center flex-col mx-auto" onSubmit={this.onSubmit}>
          <input
            className="auth-input"
            type="text"
            placeholder="Email"
            value={this.state.email}
            onChange={(e) => this.setState({ email: e.target.value })}
          />
          <input
            className="auth-input"
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })}
          />
          {this.state.errors.loginError && <AuthError msg={this.state.errors.loginError} />}
          <button className="btn btn-green py-3">Sign in!</button>
        </form>
      </AuthFormWrapper>
    )
  }
}

export default connect(null, { logIn })(Login)
