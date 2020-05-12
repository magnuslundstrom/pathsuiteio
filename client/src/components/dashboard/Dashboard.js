import React from 'react'

import { connect } from 'react-redux'
import axios from 'axios'
import Onboard from '../buildingBlocks/onboard/Onboard'
import Dropdown from '../buildingBlocks/dashboard/Dropdown'
import Container from '../buildingBlocks/Container'
import ScreenLoader from '../buildingBlocks/utils/ScreenLoader'
import NotificationList from '../buildingBlocks/notifications/NotificationList'
import Chart from '../buildingBlocks/Chart'

class Dashboard extends React.Component {
  state = {
    loading: true,
    lastestActivity: [],
    recentlyFinished: [],
    chartOne: {
      period: 'week',
      when: 'last-week',
      data: [],
    },
    chartTwo: {
      period: 'week',
      when: 'last-week',
      data: [],
    },
  }

  async componentDidMount() {
    try {
      const { data: dataOne } = await axios.get(
        `/api/goals-completed?when=${this.state.chartOne.when}`
      )
      const { data: lastestActivity } = await axios.get('/api/goal-notifications')
      const { data: dataTwo } = await axios.get(
        `/api/paths-completed?when=${this.state.chartTwo.when}`
      )
      const { data: recentlyFinished } = await axios.get('/api/path-notifications')
      this.setState({
        chartOne: { ...this.state.chartOne, data: dataOne },
        lastestActivity,
        chartTwo: { ...this.state.chartTwo, data: dataTwo },
        recentlyFinished,
        loading: false,
      })
    } catch (e) {
      console.log(e.response)
    }
  }

  updateChartOne = async (newPeriod, newWhen) => {
    this.setState(
      { chartOne: { ...this.state.chartOne, period: newPeriod, when: newWhen, data: [] } },
      async () => {
        const { data: newRes } = await axios.get(`/api/goals-completed?when=${newWhen}`)
        this.setState({
          chartOne: { ...this.state.chartOne, period: newPeriod, when: newWhen, data: newRes },
        })
      }
    )
  }
  updateChartTwo = (newPeriod, newWhen) => {
    this.setState(
      {
        chartTwo: { ...this.state.chartTwo, period: newPeriod, when: newWhen, data: [] },
      },
      async () => {
        const { data: newRes } = await axios.get(`/api/paths-completed?when=${newWhen}`)
        this.setState({
          chartTwo: { ...this.state.chartTwo, period: newPeriod, when: newWhen, data: newRes },
        })
      }
    )
  }

  render() {
    return (
      <Container>
        {this.props.isFirstTime && <Onboard isAdmin={this.props.isAdmin} />}
        {(this.state.loading && <ScreenLoader />) || (
          <div>
            <h1>Welcome back, {this.props.firstName}!</h1>
            <p>Get status on your teams performance</p>
            {/* Tasks + lastest activity */}
            <div className="flex mt-10">
              <div className="w-2/3 mr-10">
                <div className="flex justify-between">
                  <h3 className="mb-3 font-semibold">Tasks completed</h3>
                  <div className="flex items-center mb-3">
                    <Dropdown onClick={this.updateChartOne} />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-lg shadow-md">
                  <Chart data={this.state.chartOne.data} period={this.state.chartOne.period} />
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
                  <Dropdown onClick={this.updateChartTwo} />
                </div>

                <div className="bg-white p-5 rounded-lg shadow-md">
                  <Chart data={this.state.chartTwo.data} period={this.state.chartTwo.period} />
                </div>
              </div>
              <div className="w-1/3">
                <h3 className="mb-3 font-semibold">Recently finished paths</h3>
                <div className="bg-white p-5 rounded-lg shadow-md">
                  <NotificationList notifications={this.state.recentlyFinished} />
                </div>
              </div>
            </div>
          </div>
        )}
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
