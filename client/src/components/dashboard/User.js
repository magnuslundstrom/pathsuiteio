import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Container from '../buildingBlocks/Container'
import BoxLoader from '../buildingBlocks/utils/ScreenLoader'
import PathCard from '../buildingBlocks/PathCard'

class User extends React.Component {
  state = {
    loading: true,
    user: {},
  }

  async componentDidMount() {
    const params = new URLSearchParams(this.props.location.search)
    const id = params.get('id')
    const user = await axios.post(`/api/user?id=${id}`)
    this.setState({ user: user.data, loading: false })
  }

  renderPaths = () => {
    return this.state.user.paths.map((path, index) => {
      return <PathCard key={index} path={path} position="user" />
    })
  }

  render() {
    return (
      <Container>
        {(this.state.loading && <BoxLoader />) || (
          <div>
            <div className="flex justify-between">
              <div className="flex">
                <img
                  src={`data:image/png;base64, ${this.state.user.image}`}
                  alt="profile"
                  className="h-32 w-32 rounded-full mr-6"
                />
                <div>
                  <h1>{this.state.user.fullName}</h1>
                  <p className="font-semibold">{this.state.user.jobTitle}</p>
                </div>
              </div>
              <Link to="/create-path">
                <i className="fas fa-plus text-2xl font-semibold mt-4"></i>
              </Link>
            </div>
            <div className="mt-10">
              <h2 className="mb-3">Active paths</h2>
              {this.renderPaths()}
            </div>
          </div>
        )}
      </Container>
    )
  }
}

export default User
