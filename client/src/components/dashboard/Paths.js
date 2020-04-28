import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import axios from 'axios'

import Container from '../buildingBlocks/Container'
import PathCard from '../buildingBlocks/PathCard'
import BoxLoader from '../buildingBlocks/utils/ScreenLoader'

import Confetti from 'react-dom-confetti'

const config = {
  angle: 90,
  spread: 45,
  startVelocity: 45,
  elementCount: 50,
  dragFriction: 0.1,
  duration: 3000,
  stagger: 0,
  width: '10px',
  height: '10px',
  colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
}

class Paths extends React.Component {
  state = {
    confetti: false,
    loading: true,
    paths: [],
  }

  async componentDidMount() {
    let paths
    if (this.props.isAdmin) {
      const { data } = await axios.get('/api/paths')
      paths = data
    } else {
      const { data } = await axios.get('/api/own-paths')
      paths = data
    }

    this.setState({ paths: paths, loading: false })
    console.log(this.state.paths)
  }

  onComplete = (goalIndex, stepIndex) => {
    const paths = [...this.state.paths]
    paths[goalIndex].steps[stepIndex].isCompleted = !paths[goalIndex].steps[stepIndex].isCompleted
    this.setState(paths)
  }

  success = () => {
    this.setState({ confetti: true })
    console.log(this.state.confetti)
  }

  renderPaths = () => {
    if (this.state.paths.length === 0) {
      return <p>You have no paths yet!</p>
    } else {
      return this.state.paths.map((path, index) => {
        return (
          <PathCard
            key={index}
            path={path}
            position="paths"
            isAdmin={this.props.isAdmin}
            onComplete={this.onComplete}
            goalIndex={index}
            success={() => this.success()}
          />
        )
      })
    }
  }
  render() {
    return (
      <Container>
        {(this.state.loading && <BoxLoader />) || (
          <div>
            <div className="flex justify-between items-center">
              <h1>Paths</h1>
              <Link to="/create-path">
                <i className="fas fa-plus text-2xl font-semibold"></i>
              </Link>
            </div>

            <div className="mt-10 relative">{this.renderPaths()}</div>
            <div
              style={{
                position: 'absolute',
                top: '0%',
                left: '50%',
                transform: 'translateX(50%)',
                zIndex: '10',
              }}
            >
              <Confetti active={this.state.confetti} config={config} />
            </div>
          </div>
        )}
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAdmin: state.user.isAdmin,
    _id: state.user._id,
  }
}

export default connect(mapStateToProps, null)(Paths)
