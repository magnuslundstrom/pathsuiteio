import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import Container from '../../buildingBlocks/Container'
import IsAdmin from './IsAdmin'

class Paths extends React.Component {
  isLoaded = false
  state = {
    paths: [],
    loading: true,
  }

  componentDidMount() {
    this.isLoaded = true
    axios
      .get('/api/get-paths')
      .then((res) => {
        if (this.isLoaded) {
          this.setState({ paths: [...res.data], loading: false })
        }
      })
      .catch((e) => {
        console.log(e)
      })
  }

  render() {
    return <Container>{this.props.isAdmin && <IsAdmin />}</Container>
  }
}

const mapStateToProps = (state) => {
  return {
    isAdmin: state.user.isAdmin,
  }
}

export default connect(mapStateToProps, null)(Paths)
