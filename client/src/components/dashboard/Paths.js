import React from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'

import Container from '../buildingBlocks/Container'
import PathCard from '../buildingBlocks/PathCard'
import BoxLoader from '../buildingBlocks/utils/ScreenLoader'

class Paths extends React.Component {
  state = {
    loading: true,
    paths: [],
  }

  async componentDidMount() {
    const { data: paths } = await axios.get('/api/paths')
    this.setState({ paths: paths, loading: false })
  }

  renderPaths = () => {
    if (this.state.paths.length === 0) {
      return <p>You have no paths yet!</p>
    } else {
      return this.state.paths.map((path, index) => {
        return <PathCard key={index} path={path} position="paths" />
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
            <div className="mt-10">{this.renderPaths()}</div>
          </div>
        )}
      </Container>
    )
  }
}

export default Paths
