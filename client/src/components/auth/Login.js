import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logIn } from '../../redux/actions/logInOut'
import axios from 'axios'
import Logo from '../utils/Logo'
import { Form, Input, Button, FormWrapper, GrayBg, Title } from './styledComponents'
import { ErrorMessage } from '../styledComponents/smallComponents'

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    error: '',
  }

  onSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/login', {
        email: this.state.email,
        password: this.state.password,
      })
      this.props.logIn()
    } catch (error) {
      this.setState({ error: error.response.data.loginError })
    }
  }

  render() {
    return (
      <GrayBg>
        <Logo />
        <FormWrapper>
          <Title>Sign in</Title>
          <Form onSubmit={this.onSubmit}>
            <Input
              type="text"
              placeholder="Email"
              onChange={(e) => this.setState({ email: e.target.value })}
              value={this.state.email}
            />
            <Input
              type="password"
              placeholder="Password"
              onChange={(e) => this.setState({ password: e.target.value })}
              value={this.state.password}
            />
            {this.state.error && <ErrorMessage>{this.state.error}</ErrorMessage>}
            <Button>Sign in!</Button>
          </Form>
        </FormWrapper>
        <p>
          Dont have an account? <Link to="/sign-up">Sign up!</Link>
        </p>
      </GrayBg>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
  }
}

export default connect(mapStateToProps, { logIn })(Login)
