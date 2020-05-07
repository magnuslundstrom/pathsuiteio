import React from 'react'

import { connect } from 'react-redux'
import axios from 'axios'
import Onboard from '../buildingBlocks/onboard/Onboard'
import Container from '../buildingBlocks/Container'
import NotificationList from '../buildingBlocks/notifications/NotificationList'
import Chart from '../buildingBlocks/Chart'

class Dashboard extends React.Component {
  state = {
    lastestActivity: [
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
    recentlyFinished: [
      { description: 'Siguard finished something else!', date: '5 april' },
      { description: 'Siguard finished something else!', date: '5 april' },
      { description: 'Siguard finished something else!', date: '5 april' },
      { description: 'Siguard finished something else!', date: '5 april' },
      { description: 'Siguard finished something else!', date: '5 april' },
    ],
    dataOne: [],
    dataTwo: [3, 4, 1, 0, 6, 2, 2],
  }

  async componentDidMount() {
    const { data: dataOne } = await axios.get('/api/goals-completed-last-week')

    this.setState({ dataOne: dataOne })
  }

  render() {
    return (
      <Container>
        {this.props.isFirstTime && <Onboard isAdmin={this.props.isAdmin} />}

        <h1>Welcome back, {this.props.firstName}!</h1>
        <p>Get status on your teams performance</p>
        {/* Tasks + lastest activity */}
        <div className="flex mt-10">
          <div className="w-2/3 mr-10">
            <div className="flex justify-between">
              <h3 className="mb-3 font-semibold">Tasks completed</h3>
              <div className="flex items-center mb-3">
                <button className=" font-semibold ">
                  Last week <i className="fas fa-chevron-down ml-3 text-md"></i>
                </button>
              </div>
            </div>

            <div className="bg-white p-5 rounded-lg shadow-md">
              <Chart data={this.state.dataOne} />
            </div>
          </div>
          <div className="w-1/3">
            <h3 className="mb-3">Lastest activity</h3>
            <div className="bg-white p-5 rounded-lg shadow-md">
              <NotificationList notifications={this.state.lastestActivity} />
            </div>
          </div>
        </div>
        {/* learning paths + recently finished */}
        <div className="flex mt-10">
          <div className="w-2/3 mr-10">
            <div className="flex justify-between">
              <h3 className="mb-3">Learning paths completed</h3>
              <button className="flex items-center font-semibold mb-3">
                Last week <i className="fas fa-chevron-down ml-3 text-md"></i>
              </button>
            </div>

            <div className="bg-white p-5 rounded-lg shadow-md">
              <Chart data={this.state.dataTwo} />
            </div>
          </div>
          <div className="w-1/3">
            <h3 className="mb-3 font-semibold">Recently finished</h3>
            <div className="bg-white p-5 rounded-lg shadow-md">
              <NotificationList notifications={this.state.recentlyFinished} />
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
