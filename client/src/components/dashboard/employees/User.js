import React from 'react'
import { Link } from 'react-router-dom'
import Container from '../buildingBlocks/Container'
import PathCard from '../paths/PathCard'
import axios from 'axios'

class User extends React.Component {
  state = {
    isLoaded: false,
    loading: true,
  }

  async componentDidMount() {
    this.setState({ isLoaded: true })
    const params = new URLSearchParams(this.props.location.search)
    const id = params.get('id')
    const user = await axios.post(`/api/user?id=${id}`)
    if (this.state.isLoaded) {
      this.setState({ user: user.data, loading: false })
    }
  }

  renderCards = () => {
    if (this.state.user) {
      return this.state.user.paths.map((path, index) => {
        return (
          <div key={index}>
            <PathCard path={path} user />
          </div>
        )
      })
    }
  }

  renderContent = () => {
    return (
      <div>
        <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex' }}>
            <div style={{ marginRight: '30px' }}>
              <img
                src={`data:img/png;base64, ${this.state.user.image}`}
                alt="profile"
                style={{ height: 'auto', width: '100px', borderRadius: '50%' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
              <h1 style={{ marginBottom: '5px' }}>
                {this.state.user.firstName} {this.state.user.lastName}
              </h1>
              <p style={{ fontWeight: '700', marginTop: '5px' }}>{this.state.user.jobTitle}</p>
            </div>
          </div>
          <div>
            <Link to="/create-user">
              <i className="fas fa-plus" style={{ fontSize: '20px' }}></i>
            </Link>
          </div>
        </div>
        <h2>Active Paths</h2>
        {this.renderCards()}
      </div>
    )
  }
  render() {
    return <Container>{(this.state.loading && 'Loading') || this.renderContent()}</Container>
  }
}

export default User