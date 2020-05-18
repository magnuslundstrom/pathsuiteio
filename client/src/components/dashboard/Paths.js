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
    extendedLoading: false,
    paths: [],
    skip: 0,
    limit: 3,
    filters: {
      isCompleted: '',
      category: '',
      pathTitle: '',
    },
    categories: [],
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
    if (this.props.isAdmin) {
      const { data: paths } = await axios.get(this.getCurrentFetchUrl())
      const { data: categories } = await axios.get('/api/get-categories')
      this.setState({ paths, loading: false, categories })
    }
  }

  /// MAKE REQUESTS EVERYTIME THE FILTER OBJ UPDATES
  componentDidUpdate(prevProps, prevState) {
    if (prevState.filters !== this.state.filters) {
      this.setState({ loading: true, skip: 0 }, async () => {
        const { data: foundPaths } = await axios.get(this.getCurrentFetchUrl())
        this.setState({ paths: foundPaths, loading: false })
      })
    }
  }

  onFilterChange = (value, key) => {
    const currentFilters = { ...this.state.filters }
    currentFilters[key] = value
    this.setState({ filters: currentFilters })
  }

  onScroll = async () => {
    this.setState({ skip: this.state.skip + 3, extendedLoading: true })
    const { data: extendPaths } = await axios.get(this.getCurrentFetchUrl())
    this.setState({ paths: [...this.state.paths, ...extendPaths], extendedLoading: false })
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
          left={
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
                list={this.state.categories}
                onClick={(value) => this.onFilterChange(value, 'category')}
                data={{ name: 'category', current: this.state.filters.category }}
              />
            </div>
          }
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
              <div>{this.state.paths.length === 0 && <p className="mt-10">No paths found</p>}</div>
            </div>
            {this.state.paths.length > 0 && (
              <PathList
                paths={this.state.paths}
                isAdmin={this.props.isAdmin}
                image={true}
                onScroll={this.onScroll}
              />
            )}
            {this.state.extendedLoading && (
              <p className="mt-10">
                Fetching more paths <i className="fas fa-spinner own-spinner"></i>
              </p>
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
