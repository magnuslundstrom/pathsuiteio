import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { logIn } from '../../redux/actions/logInOut'
import { Form, Input, FormWrapper, GrayBg } from './styledComponents'
import { ErrorMessage } from '../styledComponents/smallComponents'
import Logo from '../utils/Logo'
import { Button } from '../utils/Buttons'

class CreateCompany extends React.Component {
  state = {
    companyName: '',
    errors: {},
  }

  onSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/create-company', {
        companyName: this.state.companyName,
      })
      this.props.logIn()
    } catch (err) {
      this.setState({ errors: { ...err.response.data } })
    }
  }

  render() {
    return (
      <GrayBg>
        <Logo />
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

export default connect(null, { logIn })(CreateCompany)
