import React from 'react'

import { connect } from 'react-redux'

import Onboard from '../buildingBlocks/onboard/Onboard'
import Container from '../buildingBlocks/Container'
import NotificationList from '../buildingBlocks/notifications/NotificationList'

class Dashboard extends React.Component {
  state = {
    notifications: [
      { description: 'James finished some shit', date: '5 april' },
      { description: 'Betina finished something else!', date: '5 april' },
      { description: 'Betina finished something else!', date: '5 april' },
      { description: 'Betina finished something else!', date: '5 april' },
      { description: 'Betina finished something else!', date: '5 april' },
      { description: 'Betina finished something else!', date: '5 april' },
      { description: 'Betina finished something else!', date: '5 april' },
      { description: 'Betina finished something else!', date: '5 april' },
      { description: 'Betina finished something else!', date: '5 april' },
    ],
  }

  render() {
    return (
      <Container>
        {this.props.isFirstTime && <Onboard isAdmin={this.props.isAdmin} />}

        <h1>Welcome back, {this.props.firstName}!</h1>
        <p>Get status on your teams performance</p>
        <div className="flex mt-10">
          <div className="w-2/3 mr-10">
            <h3 className="mb-5">Tasks completed</h3>
          </div>
          <div className="w-1/3">
            <h3 className="mb-5">Lastest activity</h3>
            <div className="bg-white p-5 rounded-lg shadow-md">
              <NotificationList notifications={this.state.notifications} />
            </div>
          </div>
        </div>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    firstName: state.user.firstName,
    isAdmin: state.user.isAdmin,
    isFirstTime: state.user.isFirstTime,
  }
}

export default connect(mapStateToProps, null)(Dashboard)
