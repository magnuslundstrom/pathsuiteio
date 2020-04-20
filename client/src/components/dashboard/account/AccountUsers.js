import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import axios from 'axios'
import Container from '../buildingBlocks/Container'
import { InnerContainer } from '../../styledComponents/smallComponents'
import { Button } from '../../utils/Buttons'
import colors from '../../../styles/colors'

class AccountUsers extends React.Component {
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

            <tbody>
              <tr>
                <td style={{ width: '20%' }}>Elon</td>
                <td style={{ width: '20%' }}>Elon@pathsuite.io</td>
                <td style={{ width: '20%' }}>CEO</td>
                <td style={{ width: '20%' }}>Admin</td>
                <td style={{ width: '20%' }}>Remove access</td>
              </tr>
            </tbody>
          </table>
        </InnerContainer>
      </Container>
    )
  }
}

export default AccountUsers
