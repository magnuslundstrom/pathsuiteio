import React from 'react'
import { Redirect } from 'react-router-dom'
import { InnerContainer } from '../../styledComponents/smallComponents'
import { CreatePathButton } from '../../utils/Buttons'
import Container from '../buildingBlocks/Container'
import Limitations from '../../utils/Limitations'

import axios from 'axios'

class CreateEmployee extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    jobTitle: '',
    isAdmin: false,
    redirect: false,
    showLimitations: true,
  }

  handleChange = (e) => {
    this.setState({ isAdmin: e.target.value })
  }

  inputChange = (e, input) => {
    this.setState({ [input]: e.target.value })
  }

  onSubmit = async () => {
    const res = await axios.post('/api/create-user', {
      ...this.state,
    })
    if (res) {
      this.setState({ redirect: true })
    }
  }
  render() {
    return (
      <Container>
        {this.state.showLimitations && (
          <Limitations
            limitations={['Errors are not being displayed properly.']}
            onClick={() => this.setState({ showLimitations: false })}
          />
        )}
        {this.state.redirect && <Redirect to="/employees" />}
        <h1 style={{ marginTop: '50px' }}>New User</h1>
        <InnerContainer style={{ flexDirection: 'column', display: 'flex' }}>
          <input
            type="text"
            placeholder="first name"
            onChange={(e) => this.inputChange(e, 'firstName')}
            value={this.state.firstName}
          ></input>

          <input
            type="text"
            placeholder="last name"
            value={this.state.lastName}
            onChange={(e) => this.inputChange(e, 'lastName')}
          ></input>
          <input
            type="text"
            placeholder="email"
            value={this.state.email}
            onChange={(e) => this.inputChange(e, 'email')}
          ></input>
          <input
            type="text"
            placeholder="password"
            value={this.state.password}
            onChange={(e) => this.inputChange(e, 'password')}
          ></input>
          <input
            type="text"
            placeholder="jobtitle"
            value={this.state.jobTitle}
            onChange={(e) => this.inputChange(e, 'jobTitle')}
          ></input>
          <select value={this.state.isAdmin} onChange={this.handleChange}>
            <option value={true}>Admin</option>
            <option value={false}>Is not admin</option>
          </select>
        </InnerContainer>
        <CreatePathButton onClick={this.onSubmit}>Create user</CreatePathButton>
      </Container>
    )
  }
}

export default CreateEmployee
