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
    completedPaths: [],
    unfinishedPaths: [],
  }

  async componentDidMount() {
    const params = new URLSearchParams(this.props.location.search)
    const id = params.get('id')
    const { data: paths } = await axios.get(`/api/paths?user=${id}`)
    const completedPaths = paths.filter((path) => path.isCompleted)
    const unfinishedPaths = paths.filter((path) => !path.isCompleted)
    const { data: user } = await axios.get(`/api/user?id=${id}`)
    this.setState({ completedPaths, unfinishedPaths, user, loading: false }, () => console.log(this.state))
  }
  onScoll = () => {}

  render() {
    return (
      <Container>
        {(this.state.loading && <BoxLoader />) || (
          <div>
            <div className='flex justify-between'>
              <div className='flex'>
                <img
                  src={`data:image/png;base64, ${this.state.user.image}`}
                  alt='profile'
                  className='h-32 w-32 rounded-full mr-6'
                />
                <div>
                  <h1>
                    {this.state.user.firstName} {this.state.user.lastName}
                  </h1>
                  <p className='font-semibold'>{this.state.user.jobTitle}</p>
                </div>
              </div>
              {this.props.isAdmin && (
                <Link to='/create-path' className=''>
                  <i className='fas fa-plus text-2xl font-semibold mt-4 hover-spin'></i>
                </Link>
              )}
            </div>
            <div className='mt-5'>
              {this.props.isAdmin && (
                <Link to='/employees' className='font-semibold mb-5 hover-underline'>
                  <i className='fas fa-arrow-left mr-1 '></i> Go back to employees
                </Link>
              )}

              <div>
                <h2 className='mt-10 -mb-5'>Active paths</h2>
                {this.state.unfinishedPaths.length === 0 ? (
                  <p className='mt-10'>User has no active paths</p>
                ) : (
                  <PathList
                    paths={[...this.state.unfinishedPaths]}
                    isAdmin={this.props.isAdmin}
                    image={false}
                    onScroll={this.onScoll}
                  />
                )}
              </div>
              <div>
                <h2 className='mt-10 -mb-5'>Completed paths</h2>
                {this.state.completedPaths.length === 0 ? (
                  <p className='mt-10'>User has no completed paths</p>
                ) : (
                  <PathList
                    paths={[...this.state.completedPaths]}
                    isAdmin={this.props.isAdmin}
                    image={false}
                    onScroll={this.onScoll}
                  />
                )}
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
    isAdmin: state.user.isAdmin,
  }
}

export default connect(mapStateToProps, null)(User)
