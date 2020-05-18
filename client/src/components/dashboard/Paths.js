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
  state = {
    loading: true,
    paths: [],
    skip: 0,
    limit: 1,
    filters: {
      isCompleted: '',
      category: '',
      search: '',
    },
  }

  getCurrentFetchUrl = () => {
    return `/api/paths?limit=${this.state.limit}&skip=${this.state.skip}${appendFilters(
      this.state.filters
    )}`
  }

  // Fetching paths depending on isAdmin
  // /paths on admin-side fetching all paths in company
  // /paths on employee-side fetch own paths

  async componentDidMount() {
    let paths
    if (this.props.isAdmin) {
      const { data } = await axios.get(this.getCurrentFetchUrl())
      paths = data
    } else {
      ////////////////// @EMPLOYEE SIDE MOST BE UPDATED
      const { data } = await axios.get('/api/own-paths')
      paths = data
    }
    this.setState({ paths, loading: false })
  }

  /// MAKE REQUESTS EVERYTIME THE FILTER OBJ UPDATES
  async componentDidUpdate(prevProps, prevState) {
    if (prevState.filters !== this.state.filters) {
      const { data: foundPaths } = await axios.get(this.getCurrentFetchUrl())
      this.setState({ paths: foundPaths })
    }
  }

  onFilterChange = (value, key) => {
    const currentFilters = { ...this.state.filters }
    currentFilters[key] = value
    this.setState({ filters: currentFilters })
  }

  leftSide = () => {
    return (
      <div className="flex">
        <DropdownFilter
          title="Sort"
          list={['Completed', 'Unfinished']}
          data={{ name: 'isCompleted', current: this.state.filters.isCompleted }}
          boolean
          onClick={(value) => this.onFilterChange(value, 'isCompleted')}
        />
        <DropdownFilter
          title="Category"
          list={['Programming', 'Design', 'Gardening']}
          onClick={(value) => this.onFilterChange(value, 'category')}
          data={{ name: 'category', current: this.state.filters.category }}
        />
      </div>
    )
  }

  render() {
    return (
      <Container>
        {this.getCurrentFetchUrl()}
        <div className="flex justify-between items-center">
          <h1>Paths</h1>
          {this.props.isAdmin && (
            <Link to="/create-path">
              <i className="fas fa-plus text-2xl font-semibold"></i>
            </Link>
          )}
        </div>

        <FilterBar
          left={this.leftSide()}
          right={
            <SearchBar
              value={this.state.filters.search}
              onChange={(value) => this.onFilterChange(value, 'search')}
            />
          }
        />

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
