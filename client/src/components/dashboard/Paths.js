import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import axios from 'axios'

import Container from '../buildingBlocks/Container'
import PathList from '../buildingBlocks/path/PathList'
import BoxLoader from '../buildingBlocks/utils/ScreenLoader'
import FilterBar from '../buildingBlocks/filters/FilterBar'
import SearchBar from '../buildingBlocks/filters/SearchBar'
import DropdownFilter from '../buildingBlocks/filters/DropdownFilter'
import appendFilters from '../../utilsFn/appendFilters'

// URL: /paths

class Paths extends React.Component {
  skip = 0
  state = {
    loading: true,
    paths: [],
    skip: 0,
    limit: 1,
    filters: [{ isCompleted: '' }, { category: 'ewq' }, { search: '' }],
  }

  fetchUrl = `/api/paths?limit=${this.state.limit}&skip=${this.state.skip}${appendFilters(
    this.state.filters
  )}`

  // Fetching paths depending on isAdmin
  // /paths on admin-side fetching all paths in company
  // /paths on employee-side fetch own paths

  async componentDidMount() {
    let paths
    if (this.props.isAdmin) {
      const { data } = await axios.get(this.fetchUrl)
      paths = data
    } else {
      const { data } = await axios.get('/api/own-paths')
      paths = data
    }
    this.setState({ paths, loading: false })
  }

  leftSide = () => {
    return (
      <div className="flex">
        <DropdownFilter sortProp="Sort" list={['Completed', 'Unfinished']} />
        <DropdownFilter sortProp="Category" list={['Programming', 'Design', 'Gardening']} />
      </div>
    )
  }

  render() {
    console.log(this.fetchUrl)
    return (
      <Container>
        {this.fetchUrl}

        <div className="flex justify-between items-center">
          <h1>Paths</h1>
          {this.props.isAdmin && (
            <Link to="/create-path">
              <i className="fas fa-plus text-2xl font-semibold"></i>
            </Link>
          )}
        </div>

        <FilterBar left={this.leftSide()} right={<SearchBar />} />

        {(this.state.loading && <BoxLoader />) || (
          <div>
            <div className="flex justify-between items-center">
              <div>
                {this.state.paths.length === 0 && <p className="mt-10">You have no paths yet!</p>}
              </div>
            </div>
            {this.state.paths.length > 0 && (
              <PathList paths={[...this.state.paths]} isAdmin={this.props.isAdmin} image={true} />
            )}
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
