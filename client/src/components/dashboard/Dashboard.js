import React from 'react'
import Container from './buildingBlocks/Container'
import { connect } from 'react-redux'
import { WelcomeMessage } from '../styledComponents/smallComponents'

class Dashboard extends React.Component {
  render() {
    return (
      <Container>
        <WelcomeMessage>
          <h1>Welcome back, {this.props.userFirstName}!</h1>
          <p>Get a status on your teams performance.</p>
        </WelcomeMessage>
      </Container>
    )
  }
}

const mapPropsToState = (state) => {
  return {
    userFirstName: state.user.firstName,
  }
}
export default connect(mapPropsToState, null)(Dashboard)
