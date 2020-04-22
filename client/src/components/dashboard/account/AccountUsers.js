import React from 'react'
// import { connect } from 'react-redux'
// import styled from 'styled-components'
import axios from 'axios'
import Container from '../buildingBlocks/Container'
import { InnerContainer } from '../../styledComponents/smallComponents'
// import { Button } from '../../utils/Buttons'
// import colors from '../../../styles/colors'

class AccountUsers extends React.Component {
  state = {
    isLoaded: false,
  }
  async componentDidMount() {
    this.setState({ isLoaded: true })
    if (this.state.isLoaded) {
      const users = await axios.get('/api/all-users')
      this.setState({ users: users })
    }
  }

  renderUsers = () => {
    return this.state.users.map((user) => {
      return (
        <tr>
          <td style={{ width: '20%' }}>
            {user.firstName} {user.lastName}
          </td>
          <td style={{ width: '20%' }}>{user.email}</td>
          <td style={{ width: '20%' }}>{user.jobTitle}</td>
          <td style={{ width: '20%' }}>{(user.isAdmin && 'Admin') || 'Employee'}</td>
          <td style={{ width: '20%' }}>
            <button>Remove access</button>
          </td>
        </tr>
      )
    })
  }
  render() {
    return (
      <Container>
        <h1 style={{ marginTop: '50px' }}>Account users</h1>
        <InnerContainer>
          <h3>Manage users</h3>

          <table style={{ width: '100%' }}>
            <thead style={{ borderBottom: '5px solid #000' }}>
              <tr style={{ textAlign: 'left' }}>
                <th>Name</th>
                <th>E-mail</th>
                <th>Position</th>
                <th>Role</th>
                <th>Remove</th>
              </tr>
            </thead>

            <tbody>{this.state.users || this.renderUsers() || 'Loading'}</tbody>
          </table>
        </InnerContainer>
      </Container>
    )
  }
}

export default AccountUsers
