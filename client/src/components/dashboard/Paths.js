import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import axios from 'axios'

import Container from '../buildingBlocks/Container'
import PathList from '../buildingBlocks/path/PathList'
import BoxLoader from '../buildingBlocks/utils/ScreenLoader'

class Paths extends React.Component {
  state = {
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
    this.setState({ paths, loading: false })
    console.log(this.state.paths)
  }

  render() {
    return (
      <Container>
        {(this.state.loading && <BoxLoader />) || (
          <div>
            <div className="flex justify-between items-center">
              <h1>Paths</h1>
              {this.props.isAdmin && (
                <Link to="/create-path">
                  <i className="fas fa-plus text-2xl font-semibold"></i>
                </Link>
              )}
            </div>
            <PathList paths={[...this.state.paths]} isAdmin={this.props.isAdmin} />
          </div>
        )}
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAdmin: state.user.isAdmin,
  }
}

export default connect(mapStateToProps, null)(Paths)
