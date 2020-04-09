import React from 'react'
import axios from 'axios'

import { Form, Input, Button, FormWrapper, GrayBg } from './styledComponents'
import { ErrorMessage, Logo } from '../styledComponents/smallComponents'
import logoImg from '../../images/logo.png'

class CreateCompany extends React.Component {
  state = {
    companyName: '',
    errors: {},
  }

  onSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/create-company', {
        message: 'hej',
      })
    } catch (err) {
      this.setState({ errors: { ...err.response.data } })
    }
  }

  render() {
    return (
      <GrayBg>
        <Logo src={logoImg}></Logo>
        <FormWrapper>
          <h1>Last step!</h1>
          <p>Who is the owner of the account?</p>
          <Form onSubmit={this.onSubmit}>
            <Input
              type="text"
              placeholder="Company name"
              value={this.state.firstName}
              onChange={(e) => this.setState({ companyName: e.target.value })}
            />
            <Button>Sign Up</Button>
          </Form>
        </FormWrapper>
      </GrayBg>
    )
  }
}

export default CreateCompany
