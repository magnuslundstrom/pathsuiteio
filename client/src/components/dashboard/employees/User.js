import React from 'react'
import Container from '../buildingBlocks/Container'
import axios from 'axios'

class User extends React.Component {
  state = {}

  async componentDidMount() {
    console.log(this.props.location.search)
    // const user = axios.get(`/api/user/${}`)
    // const params = new URLSearchParams(this.props.location.search)
    // params.get('id')
  }
  render() {
    return (
      <Container>
        <div>
          <p>hej!</p>
        </div>
      </Container>
    )
  }
}

export default User
