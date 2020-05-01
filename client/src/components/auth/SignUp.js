import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import CreateCompany from './CreateCompany'

import AuthFormWrapper from '../buildingBlocks/AuthFormWrapper'
import { AuthError } from '../buildingBlocks/utils/ErrorMessages'

class SignUp extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    errors: {},
    checked: false,
    userCreated: false,
  }

  onSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/sign-up', {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
      })
      this.setState({ userCreated: true })
    } catch (err) {
      this.setState({ errors: { ...err.response.data } })
    }
  }

  renderContent = () => {
    // Renders CreateCompany step if the userCreated
    if (this.state.userCreated) {
      return <CreateCompany />
    } else {
      return (
        <AuthFormWrapper header="Create your account" signUp>
          <form className="flex justify-center flex-col mx-auto" onSubmit={this.onSubmit}>
            <input
              className="input-border-gray"
              type="text"
              placeholder="First name"
              value={this.state.firstName}
              onChange={(e) => this.setState({ firstName: e.target.value })}
            />
            {this.state.errors.firstName && <AuthError msg={this.state.errors.firstName} />}
            <input
              className="input-border-gray"
              type="text"
              placeholder="Last name"
              value={this.state.lastName}
              onChange={(e) => this.setState({ lastName: e.target.value })}
            />
            {this.state.errors.lastName && <AuthError msg={this.state.errors.lastName} />}
            <input
              className="input-border-gray"
              type="text"
              placeholder="Email"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
            {this.state.errors.email && <AuthError msg={this.state.errors.email} />}
            <input
              className="input-border-gray"
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={(e) => this.setState({ password: e.target.value })}
            />
            {this.state.errors.password && <AuthError msg={this.state.errors.password} />}
            <div className="flex text-left align-top">
              <input
                type="checkbox"
                id="termagreement"
                onChange={() => this.setState({ checked: !this.state.checked })}
                value={this.state.checked}
                className="mr-2 mt-1 "
              />
              <label htmlFor="termagreement" className="leading-none mb-5">
                By signing up I agree the <Link to="#">terms of service</Link> and the{' '}
                <Link to="#" className="hover-green">
                  privacy policy
                </Link>
                .
              </label>
            </div>
            <button className="btn btn-green py-3" disabled={!this.state.checked}>
              Sign up!
            </button>
          </form>
        </AuthFormWrapper>
      )
    }
  }

  render() {
    return <div>{this.renderContent()}</div>
  }
}

export default SignUp
