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
    const users = await axios.get('/api/all-users')
    if (this.state.isLoaded) {
      this.setState({ users: users.data })
    }
  }

  removeAccess = async (id, index) => {
    const res = await axios.post(`/api/remove-access`, {
      userId: id,
    })
    if (res) {
      const newUserArr = [...this.state.users]
      newUserArr.splice(index, 1)
      this.setState({ users: newUserArr })
    }
  }

  renderUsers = () => {
    return this.state.users.map((user, index) => {
      return (
        <tr key={index} style={{ height: '40px' }}>
          <td style={{ width: '20%' }}>
            {user.firstName} {user.lastName}
          </td>
          <td style={{ width: '20%' }}>{user.email}</td>
          <td style={{ width: '20%' }}>{user.jobTitle}</td>
          <td style={{ width: '20%' }}>{(user.isAdmin && 'Admin') || 'Employee'}</td>
          <td style={{ width: '20%' }}>
            <button onClick={() => this.removeAccess(user._id, index)}>Remove access</button>
          </td>
        </tr>
      )
    })
  }

  renderContent = () => {
    if (this.state.users) {
      return (
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

          {this.state.users && <tbody>{this.renderUsers()}</tbody>}
        </table>
      )
    } else {
      return <div>Loading</div>
    }
  }

  render() {
    return (
      <Container>
        <h1 style={{ marginTop: '50px' }}>Account users</h1>
        <InnerContainer>
          <h3>Manage users</h3>
          {this.renderContent()}
        </InnerContainer>
      </Container>
    )
  }
}

export default AccountUsers
