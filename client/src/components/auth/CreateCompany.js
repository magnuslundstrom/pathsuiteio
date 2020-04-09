import React from 'react'
import axios from 'axios'

import { Link, Redirect } from 'react-router-dom'
import { Form, Input, Button, FormWrapper, GrayBg } from './styledComponents'
import { ErrorMessage, Logo } from '../styledComponents/smallComponents'
import logoImg from '../../images/logo.png'

class CreateCompany extends React.Component {
  state = {
    companyName: '',
    errors: {},
    redirect: false,
  }

  onSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/create-company', {
        companyName: this.state.companyName,
      })
      this.setState({ redirect: true })
    } catch (err) {
      this.setState({ errors: { ...err.response.data } })
      console.log(this.state.errors)
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
            <h1>Last step!</h1>
            <p>Who is the owner of the account?</p>
            <Form onSubmit={this.onSubmit}>
              <Input
                type="text"
                placeholder="Company name"
                value={this.state.companyName}
                onChange={(e) => this.setState({ companyName: e.target.value })}
              />
              {this.state.errors.companyName && (
                <ErrorMessage>{this.state.errors.companyName}</ErrorMessage>
              )}
              <Button>Sign Up</Button>
            </Form>
          </FormWrapper>
        </GrayBg>
      )
    }
  }

  render() {
    return <div>{this.renderContent()}</div>
  }
}

export default CreateCompany
