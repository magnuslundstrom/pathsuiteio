import React from 'react'

import { connect } from 'react-redux'
import axios from 'axios'
import Onboard from '../buildingBlocks/onboard/Onboard'
import Dropdown from '../buildingBlocks/dashboard/Dropdown'
import Container from '../buildingBlocks/Container'
import ScreenLoader from '../buildingBlocks/utils/ScreenLoader'
import NotificationList from '../buildingBlocks/notifications/NotificationList'
import Chart from '../buildingBlocks/Chart'
import findHighestNumber from '../../utilsFn/findHighestNumber'

class Dashboard extends React.Component {
  state = {
    loading: true,
    lastestActivity: [],
    recentlyFinished: [],
    chartOne: {
      period: 'week',
      when: 'this-week',
      data: [],
    },
    chartTwo: {
      period: 'week',
      when: 'this-week',
      data: [],
    },
    skipLatestActivity: 0,
    latestActivityLoading: false,
    skipFinishedPaths: 0,
    finishedPathsLoading: false,
  }

  // scroll function to load more recently finished paths
  recentlyFinishedScroll = async () => {
    if (this.state.recentlyFinished.length % 5 === 0) {
      this.setState({
        skipFinishedPaths: this.state.skipFinishedPaths + 5,
        finishedPathsLoading: true,
      })
      const { data: extendedList } = await axios.get(this.getPathNotificationUrl())
      setTimeout(() => {
        this.setState({
          recentlyFinished: [...this.state.recentlyFinished, ...extendedList],
          finishedPathsLoading: false,
        })
      }, 300)
    }
  }

  // scroll function to load more notifications
  latestActivityScroll = async () => {
    if (this.state.lastestActivity.length % 5 === 0) {
      this.setState({
        skipLatestActivity: this.state.skipLatestActivity + 5,
        latestActivityLoading: true,
      })
      const { data: extendedList } = await axios.get(this.getSubtaskNotificationFetchUrl())
      setTimeout(() => {
        this.setState({
          lastestActivity: [...this.state.lastestActivity, ...extendedList],
          latestActivityLoading: false,
        })
      }, 300)
    }
  }

  // For chart one
  getSubtaskFetchUrl = () => {
    return `/api/subtasks-completed?when=${this.state.chartOne.when}${
      !this.props.isAdmin ? `&user=${this.props.userId}` : ''
    }`
  }
  // for upper sidebar
  getSubtaskNotificationFetchUrl = () => {
    return `/api/subtask-notifications?limit=5&skip=${this.state.skipLatestActivity}${
      !this.props.isAdmin ? `&user=${this.props.userId}` : ''
    }`
  }
  // for completed learning paths
  getPathsFetchUrl = () => {
    return `/api/paths-completed?when=${this.state.chartTwo.when}${
      !this.props.isAdmin ? `&user=${this.props.userId}` : ''
    }`
  }
  // for lower sidebar
  getPathNotificationUrl = () => {
    return `/api/path-notifications?limit=5&skip=${this.state.skipFinishedPaths}${
      !this.props.isAdmin ? `&user=${this.props.userId}` : ''
    }`
  }

  async componentDidMount() {
    try {
      const { data: dataOne } = await axios.get(this.getSubtaskFetchUrl())
      const { data: lastestActivity } = await axios.get(this.getSubtaskNotificationFetchUrl())
      const { data: dataTwo } = await axios.get(this.getPathsFetchUrl())
      const { data: recentlyFinished } = await axios.get(this.getPathNotificationUrl())
      this.setState({
        chartOne: { ...this.state.chartOne, data: dataOne },
        lastestActivity,
        chartTwo: { ...this.state.chartTwo, data: dataTwo },
        recentlyFinished,
        loading: false,
      })
    } catch (e) {}
  }

  // used to reset data and put in new data
  updateChartOne = async (newPeriod, newWhen) => {
    this.setState(
      { chartOne: { ...this.state.chartOne, period: newPeriod, when: newWhen, data: [] } },
      async () => {
        const { data: newRes } = await axios.get(`/api/subtasks-completed?when=${newWhen}`)
        this.setState({
          chartOne: { ...this.state.chartOne, data: newRes },
        })
      }
    )
  }
  // used to reset data and put in new data
  updateChartTwo = (newPeriod, newWhen) => {
    this.setState(
      {
        chartTwo: { ...this.state.chartTwo, period: newPeriod, when: newWhen, data: [] },
      },
      async () => {
        const { data: newRes } = await axios.get(`/api/paths-completed?when=${newWhen}`)
        this.setState({
          chartTwo: { ...this.state.chartTwo, data: newRes },
        })
      }
    )
  }

  render() {
    return (
      <Container>
        {this.props.isFirstTime && <Onboard isAdmin={this.props.isAdmin} />}
        <h1>Welcome back, {this.props.firstName}!</h1>
        {(this.props.isAdmin && <p>Get status on your teams performance</p>) || (
          <p>Get status on your performance</p>
        )}

        {(this.state.loading && <ScreenLoader />) || (
          <div>
            {/* Tasks + lastest activity */}
            <div className="flex mt-10">
              <div className="w-2/3 mr-10">
                <div className="flex justify-between">
                  <h3 className="mb-3 font-semibold">Subtasks completed</h3>
                  <div className="flex items-center mb-3">
                    <Dropdown onClick={this.updateChartOne} />
                  </div>
                </div>
                {/* First chart */}
                <div className="bg-white p-5 rounded-lg shadow-md">
                  <Chart
                    data={this.state.chartOne.data}
                    period={this.state.chartOne.period}
                    suggestedMax={findHighestNumber(this.state.chartOne.data) + 10}
                  />
                </div>
                {/* Latest activity notification list */}
              </div>
              <div className="w-1/3">
                <h3 className="mb-3">Lastest activity</h3>
                <div className="bg-white p-5 rounded-lg shadow-md">
                  <NotificationList
                    notifications={this.state.lastestActivity}
                    isAdmin={this.props.isAdmin}
                    onScroll={this.latestActivityScroll}
                    zeroMessage="No subtasks completed yet"
                  />
                  {this.state.latestActivityLoading && (
                    <p className="ml-5">
                      Fetching more notifications <i className="fas fa-spinner own-spinner"></i>
                    </p>
                  )}
                </div>
              </div>
            </div>
            {/* paths + recently finished */}
            <div className="flex mt-10">
              <div className="w-2/3 mr-10">
                <div className="flex justify-between">
                  <h3 className="mb-3">Paths completed</h3>
                  <Dropdown onClick={this.updateChartTwo} />
                </div>
                {/* Second chart */}
                <div className="bg-white p-5 rounded-lg shadow-md">
                  <Chart
                    data={this.state.chartTwo.data}
                    period={this.state.chartTwo.period}
                    suggestedMax={findHighestNumber(this.state.chartTwo.data) + 10}
                  />
                </div>
              </div>
              {/* recently finished paths notification list */}
              <div className="w-1/3">
                <h3 className="mb-3 font-semibold">Recently finished paths</h3>
                <div className="bg-white p-5 rounded-lg shadow-md">
                  <NotificationList
                    notifications={this.state.recentlyFinished}
                    isAdmin={this.props.isAdmin}
                    zeroMessage="No paths completed yet"
                    onScroll={this.recentlyFinishedScroll}
                  />
                  {this.state.finishedPathsLoading && (
                    <p className="ml-5">
                      Fetching more notifications <i className="fas fa-spinner own-spinner"></i>
                    </p>
                  )}
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
    userId: state.user._id,
  }
}

export default connect(mapStateToProps, null)(Dashboard)
