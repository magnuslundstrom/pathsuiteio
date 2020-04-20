import React from 'react'
import { Link } from 'react-router-dom'
import Container from '../buildingBlocks/Container'
import PathCard from './PathCard'
import axios from 'axios'

class Paths extends React.Component {
  _isMounted = false
  state = {
    paths: [],
  }

  componentDidMount() {
    this._isMounted = true
    axios
      .get('/api/get-paths')
      .then((res) => {
        if (this._isMounted) {
          this.setState({ paths: [...res.data] })
        }
      })
      .catch((e) => {
        console.log(e)
      })
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  renderPaths = () => {
    return this.state.paths.map((path, index) => {
      return (
        <div key={index}>
          <PathCard path={path} />
        </div>
      )
    })
  }

  render() {
    return (
      <Container>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '50px',
            alignItems: 'center',
          }}
        >
          <h1 style={{ marginBottom: '0px', marginTop: '0px' }}>Paths</h1>
          <Link to="/create-path">
            <i className="fas fa-plus" style={{ fontSize: '20px' }}></i>
          </Link>
        </div>
        {this.renderPaths()}
      </Container>
    )
  }
}

export default Paths
