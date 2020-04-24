import React from 'react'
// import { connect } from 'react-redux'
import styled from 'styled-components'
import axios from 'axios'
import Container from '../buildingBlocks/Container'
import { InnerContainer } from '../../styledComponents/smallComponents'
import colors from '../../../styles/colors'
import { Link } from 'react-router-dom'
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
          <td style={{ width: '20%', paddingTop: '15px' }}>
            {user.firstName} {user.lastName}
          </td>
          <td style={{ width: '20%', paddingTop: '15px' }}>{user.email}</td>
          <td style={{ width: '20%', paddingTop: '15px' }}>{user.jobTitle}</td>
          <td style={{ width: '20%', paddingTop: '15px' }}>
            {(user.isAdmin && 'Admin') || 'Employee'}
          </td>
          <td style={{ width: '20%', paddingTop: '15px' }}>
            <button
              onClick={() => this.removeAccess(user._id, index)}
              style={{
                border: '0px',
                backgroundColor: '#fff',
                color: colors.green,
                cursor: 'pointer',
                padding: '0px',
              }}
            >
              Remove access
            </button>
          </td>
        </tr>
      )
    })
  }

  renderContent = () => {
    if (this.state.users) {
      return (
        <table style={{ width: '100%' }}>
          <thead>
            <StyledThead style={{ textAlign: 'left', position: 'relative' }}>
              <StyledTh>Name</StyledTh>
              <StyledTh>E-mail</StyledTh>
              <StyledTh>Position</StyledTh>
              <StyledTh>Role</StyledTh>
              <StyledTh>Remove</StyledTh>
            </StyledThead>
          </thead>

          <tbody>{this.renderUsers()}</tbody>
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
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '30px',
            }}
          >
            <h3 style={{ marginTop: '0px', marginBottom: '0px' }}>Manage users</h3>
            <Link to="/create-user">
              <i className="fas fa-plus"></i>
            </Link>
          </div>

          {this.renderContent()}
        </InnerContainer>
      </Container>
    )
  }
}

export default AccountUsers

const StyledThead = styled.tr`
  padding-bottom: 30px;
`
const StyledTh = styled.th`
  border-bottom: 2px solid #f4f4f4;
  padding-bottom: 15px;
`
