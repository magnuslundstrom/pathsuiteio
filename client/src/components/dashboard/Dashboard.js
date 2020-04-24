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
          {(this.props.isAdmin && <p>Get a status on your teams performance.</p>) || (
            <p>Get a status on your latest performance</p>
          )}
        </WelcomeMessage>
      </Container>
    )
  }
}

const mapPropsToState = (state) => {
  return {
    userFirstName: state.user.firstName,
    isAdmin: state.user.isAdmin,
  }
}
export default connect(mapPropsToState, null)(Dashboard)
