import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { logIn } from '../../redux/actions/logInOut'
import AuthFormWrapper from '../buildingBlocks/AuthFormWrapper'
import { AuthError } from '../buildingBlocks/utils/ErrorMessages'

// Represents the second step when you sign up for the first time, and are asked to enter a company name
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
      <AuthFormWrapper header="Create your account">
        <p className="mb-6">What company is connected to this account?</p>
        <form className="flex justify-center flex-col mx-auto" onSubmit={this.onSubmit}>
          <input
            className="auth-input w-full"
            type="text"
            placeholder="Company name"
            value={this.state.companyName}
            onChange={(e) => this.setState({ companyName: e.target.value })}
          />
          {this.state.errors.companyName && <AuthError msg={this.state.errors.companyName} />}
          <button className="btn btn-green py-3">Lets get started!</button>
        </form>
      </AuthFormWrapper>
    )
  }
}

export default connect(null, { logIn })(CreateCompany)
