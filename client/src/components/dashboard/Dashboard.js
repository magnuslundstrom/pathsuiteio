import React from 'react'

import { connect } from 'react-redux'

import Onboard from '../buildingBlocks/onboard/Onboard'
import Container from '../buildingBlocks/Container'

const Dashboard = (props) => {
  return (
    <Container>
      {props.isFirstTime && <Onboard isAdmin={props.isAdmin} />}

      <h1>Welcome back, {props.firstName}!</h1>
      <p>Get status on your teams performance</p>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    firstName: state.user.firstName,
    isAdmin: state.user.isAdmin,
    isFirstTime: state.user.isFirstTime,
  }
}

export default connect(mapStateToProps, null)(Dashboard)
