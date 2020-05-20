import React from 'react'
import { logIn } from '../../redux/actions/logInOut'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'

import AuthFormWrapper from '../buildingBlocks/AuthFormWrapper'
import { AuthError } from '../buildingBlocks/utils/ErrorMessages'

class InvitedUser extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    password: '',
    email: '',
    isAdmin: '',
    company: '',
    errors: {},
    checked: false,
  }

  onSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/sign-up', {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        isAdmin: this.state.isAdmin,
        company: this.state.company,
        password: this.state.password,
      })
      if (res) this.props.logIn()
    } catch (err) {
      this.setState({ errors: { ...err.response.data } })
    }
  }

  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search)
    this.setState({
      email: params.get('email'),
      isAdmin: params.get('isAdmin'),
      company: params.get('company'),
    })
  }

  renderContent = () => {
    return (
      <AuthFormWrapper header="Create your account" signUp>
        <form className="flex justify-center flex-col mx-auto" onSubmit={this.onSubmit}>
          <input
            className="auth-input"
            type="text"
            placeholder="First name"
            value={this.state.firstName}
            onChange={(e) => this.setState({ firstName: e.target.value })}
          />
          {this.state.errors.firstName && <AuthError msg={this.state.errors.firstName} />}
          <input
            className="auth-input"
            type="text"
            placeholder="Last name"
            value={this.state.lastName}
            onChange={(e) => this.setState({ lastName: e.target.value })}
          />
          <input
            className="auth-input"
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

  render() {
    return <div>{this.renderContent()}</div>
  }
}

export default connect(null, { logIn })(InvitedUser)
