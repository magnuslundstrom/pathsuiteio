import React from 'react'

import { connect } from 'react-redux'
import axios from 'axios'

import { logIn } from '../../redux/actions/logInOut'
import { AuthError } from '../buildingBlocks/utils/ErrorMessages'
import AuthFormWrapper from '../buildingBlocks/AuthFormWrapper'

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
            className="input-border-gray"
            type="text"
            placeholder="Email"
            value={this.state.email}
            onChange={(e) => this.setState({ email: e.target.value })}
          />
          <input
            className="input-border-gray"
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })}
          />
          {this.state.errors.loginError && <AuthError msg={this.state.errors.loginError} />}
          <button className="btn">Sign in!</button>
        </form>
      </AuthFormWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
  }
}

export default connect(mapStateToProps, { logIn })(Login)
