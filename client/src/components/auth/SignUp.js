import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { Form, Input, Button, FormWrapper } from './styledComponents'

class SignUp extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    companyName: '',
    companyEmail: ''
  }

  onSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post('/api/sign-up', {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        companyName: this.state.companyName,
        companyEmail: this.state.companyEmail
      })
    } catch (e) {
      console.log(e.response)
    }
  }

  render() {
    return (
      <FormWrapper>
        <h1>Pathsuite.io</h1>
        <h2>Sign up</h2>
        <Form onSubmit={this.onSubmit}>
          <Input
            type='text'
            placeholder='First name *'
            value={this.state.firstName}
            onChange={e => this.setState({ firstName: e.target.value })}
          />
          <Input
            type='text'
            placeholder='Last name *'
            value={this.state.lastName}
            onChange={e => this.setState({ lastName: e.target.value })}
          />
          <Input
            type='text'
            placeholder='Email *'
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
          />
          <Input
            type='password'
            placeholder='Password *'
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
          />
          <Input
            type='text'
            placeholder='Company name *'
            value={this.state.companyName}
            onChange={e => this.setState({ companyName: e.target.value })}
          />
          <Input
            type='text'
            placeholder='Company email *'
            value={this.state.companyEmail}
            onChange={e => this.setState({ companyEmail: e.target.value })}
          />
          <Button>Sign Up</Button>
        </Form>
        <p>
          Already have an account? <Link to='/'>Login</Link>
        </p>
        <p>
          <Link to='/dashboard'>Dev purpose -> Go to dashboard</Link>
        </p>
      </FormWrapper>
    )
  }
}

export default SignUp
