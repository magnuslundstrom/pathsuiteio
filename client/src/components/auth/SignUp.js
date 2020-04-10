import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { Form, Input, Button, FormWrapper, GrayBg } from './styledComponents'

import { ErrorMessage, Logo } from '../styledComponents/smallComponents'
import logoImg from '../../images/logo.png'
import CreateCompany from './CreateCompany'

class SignUp extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    checked: false,
    errors: {},
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
        isAdmin: true,
      })
      this.setState({ userCreated: true })
    } catch (err) {
      this.setState({ errors: { ...err.response.data } })
    }
  }

  renderContent = () => {
    if (this.state.userCreated) {
      return <CreateCompany />
    } else {
      return (
        <GrayBg>
          <Link to="/">
            <Logo src={logoImg}></Logo>
          </Link>
          <FormWrapper>
            <h1>Create your account</h1>
            <Form onSubmit={this.onSubmit}>
              <Input
                type="text"
                placeholder="First name"
                value={this.state.firstName}
                onChange={(e) => this.setState({ firstName: e.target.value })}
              />
              <Input
                type="text"
                placeholder="Last name"
                value={this.state.lastName}
                onChange={(e) => this.setState({ lastName: e.target.value })}
              />
              <Input
                type="text"
                placeholder="Email"
                value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}
              />
              {this.state.errors.email && <ErrorMessage>{this.state.errors.email}</ErrorMessage>}
              <Input
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={(e) => this.setState({ password: e.target.value })}
              />
              {this.state.errors.password && (
                <ErrorMessage>{this.state.errors.password}</ErrorMessage>
              )}
              <div style={{ marginTop: '15px', display: 'flex' }}>
                <input
                  type="checkbox"
                  id="termagreement"
                  style={{ margin: '6px, 6px, 0px, 0px' }}
                  onChange={() => this.setState({ checked: !this.state.checked })}
                  value={this.state.checked}
                />{' '}
                <label htmlFor="termagreement">
                  By signing up I agree the <Link to="#">terms of service</Link> and the{' '}
                  <Link to="#">privacy policy</Link>.
                </label>
              </div>

              <Button disabled={!this.state.checked}>Sign Up</Button>
            </Form>
          </FormWrapper>
          <p>
            Already have an account? <Link to="/">Sign in</Link>
          </p>
        </GrayBg>
      )
    }
  }

  render() {
    return <div>{this.renderContent()}</div>
  }
}

export default SignUp
