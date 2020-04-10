import React from 'react'
import Header from './buildingBlocks/Header'
import { connect } from 'react-redux'
import { WelcomeMessage } from '../styledComponents/smallComponents'

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <WelcomeMessage>
          <h1>Welcome back, {this.props.userFirstName}!</h1>
          <p>Get a status on your teams performance.</p>
        </WelcomeMessage>
      </div>
    )
  }
}

const mapPropsToState = (state) => {
  return {
    userFirstName: state.user.firstName,
  }
}
export default connect(mapPropsToState, null)(Dashboard)
