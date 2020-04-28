import React from 'react'

import { connect } from 'react-redux'

import Container from '../buildingBlocks/Container'

const Dashboard = (props) => {
  return (
    <Container>
      <h1>Welcome back, {props.firstName}!</h1>
      <p>Get status on your teams performance</p>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    firstName: state.user.firstName,
  }
}

export default connect(mapStateToProps, null)(Dashboard)
