import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import { Form, Input, Button, FormWrapper, GrayBg, Title } from './styledComponents'
import { ErrorMessage, Logo } from '../styledComponents/smallComponents'
import logoImg from '../../images/logo.png'

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    error: '',
    redirect: false,
  }

  onSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/login', {
        email: this.state.email,
        password: this.state.password,
      })
      this.setState({ redirect: true })
    } catch (error) {
      this.setState({ error: error.response.data.loginError })
    }
  }

  renderContent = () => {
    if (this.state.redirect) {
      return <Redirect to="/tunnel"></Redirect>
    } else {
      return (
        <GrayBg>
          <Link to="/">
            <Logo src={logoImg}></Logo>
          </Link>
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

  render() {
    return <div>{this.renderContent()}</div>
  }
}

export default Login
