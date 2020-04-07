import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Button, FormWrapper } from './styledComponents'

class SignUp extends React.Component {
  state = {
    email: '',
    password: '',
  }

  onSubmit = () => {}

  render() {
    return (
      <FormWrapper>
        <h1>Pathsuite.io</h1>
        <h2>Sign up</h2>
        <Form onSubmit={this.onSubmit}>
          <Input type="text" placeholder="First name *" />
          <Input type="text" placeholder="Last name *" />
          <Input type="email" placeholder="Email *" />
          <Input type="password" placeholder="Password *" />
          <Input type="text" placeholder="Company name *" />
          <Input type="email" placeholder="Company email *" />
          <Button>Sign Up</Button>
        </Form>
        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
        <p>
          <Link to="/dashboard">Dev purpose -> Go to dashboard</Link>
        </p>
      </FormWrapper>
    )
  }
}

export default SignUp
