import React from 'react'
import {Link} from 'react-router-dom'
import Container from '../buildingBlocks/Container'

class Paths extends React.Component {
  render() {
    return (
      <Container>
        <p>Stort hej fra Paths i hvert fald :)</p>
        <Link to="/create-path">Create Path</Link>
      </Container>
    )
  }
}

export default Paths
