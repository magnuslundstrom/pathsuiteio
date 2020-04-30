import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Container from '../buildingBlocks/Container'
import BoxLoader from '../buildingBlocks/utils/ScreenLoader'
import PathList from '../buildingBlocks/path/PathList'

class User extends React.Component {
  state = {
    loading: true,
    paths: {},
  }

  async componentDidMount() {
    const params = new URLSearchParams(this.props.location.search)
    const id = params.get('id')
    const { data: paths } = await axios.get(`/api/paths?user=${id}`)
    const { data: user } = await axios.get(`/api/user?id=${id}`)
    this.setState({ paths, user, loading: false }, () => console.log(this.state))
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
                  <h1>
                    {this.state.user.firstName} {this.state.user.lastName}
                  </h1>
                  <p className="font-semibold">{this.state.user.jobTitle}</p>
                </div>
              </div>
              <Link to="/create-path">
                <i className="fas fa-plus text-2xl font-semibold mt-4"></i>
              </Link>
            </div>
            <div className="mt-10">
              <h2 className="mb-3">Active paths</h2>
              <PathList paths={[...this.state.paths]} isAdmin={this.props.isAdmin} />
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
  }
}

export default connect(mapStateToProps, null)(User)
