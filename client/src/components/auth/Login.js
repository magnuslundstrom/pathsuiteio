import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Form, Input, Button, FormWrapper } from './styledComponents'

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  }

  onSubmit = async (e) => {
    e.preventDefault()
    await axios.post('/api/login', {
      email: this.state.email,
      password: this.state.password,
    })
  }

  render() {
    return (
      <FormWrapper>
        <h1>Pathsuite.io</h1>
        <h2>Login</h2>
        <Form onSubmit={this.onSubmit}>
          <Input
            type="text"
            placeholder="Email *"
            onChange={(e) => this.setState({ email: e.target.value })}
            value={this.state.email}
          />
          <Input
            type="password"
            placeholder="Password *"
            onChange={(e) => this.setState({ password: e.target.value })}
            value={this.state.password}
          />
          <Button>Login</Button>
        </Form>
        <p>
          Dont have an account? <Link to="sign-up">Sign up</Link>
        </p>
        <Link to="/dashboard">Dev purpose -> go to Dashboard</Link>
      </FormWrapper>
    )
  }
}

export default Login
