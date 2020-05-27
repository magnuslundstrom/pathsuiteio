import React from 'react'
import Container from '../buildingBlocks/Container'
import { AuthError } from '../buildingBlocks/utils/ErrorMessages'
import axios from 'axios'

///// THIS COMPONENT IS DEPRECIATED -<<<<<<<<<<<<<<<<<<<<<<<<

class CreateUser extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    jobTitle: '',
    isAdmin: false,
    errors: {},
  }

  onSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/create-user', {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        jobTitle: this.state.jobTitle,
        isAdmin: this.state.isAdmin,
      })
      this.props.history.goBack()
    } catch (e) {
      this.setState({ errors: { ...e.response.data } })
    }
  }
  render() {
    return (
      <Container>
        <h1>Create new user</h1>
        <form className="flex w-96 flex-col mt-6" onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="First name"
            className="input-border-gray"
            value={this.state.firstName}
            onChange={(e) => this.setState({ firstName: e.target.value })}
          />
          {this.state.errors.firstName && <AuthError msg={this.state.errors.firstName} />}
          <input
            type="text"
            placeholder="Last name"
            className="input-border-gray"
            value={this.state.lastName}
            onChange={(e) => this.setState({ lastName: e.target.value })}
          />
          {this.state.errors.lastName && <AuthError msg={this.state.errors.lastName} />}
          <input
            type="text"
            placeholder="Email"
            className="input-border-gray"
            value={this.state.email}
            onChange={(e) => this.setState({ email: e.target.value })}
          />
          {this.state.errors.email && <AuthError msg={this.state.errors.email} />}
          <input
            type="password"
            placeholder="Password"
            className="input-border-gray"
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })}
            autoComplete="new-password"
          />
          {this.state.errors.password && <AuthError msg={this.state.errors.password} />}
          <input
            type="text"
            placeholder="Jobtitle"
            className="input-border-gray"
            value={this.state.jobTitle}
            onChange={(e) => this.setState({ jobTitle: e.target.value })}
          />
          {this.state.errors.jobTitle && <AuthError msg={this.state.errors.jobTitle} />}
          <select
            value={this.state.isAdmin}
            onChange={(e) => this.setState({ isAdmin: e.target.value })}
            className="input-border-gray"
          >
            <option value={true}>Admin</option>
            <option value={false}>Not admin</option>
          </select>
          <button className="btn btn-green py-3 px-10">Create user</button>
        </form>
      </Container>
    )
  }
}

export default CreateUser
