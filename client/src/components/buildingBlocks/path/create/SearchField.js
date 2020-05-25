import React from 'react'

import axios from 'axios'
import SearchResults from './SearchResults'

// Represents the search field when path is created and user has to be selected
class SearchField extends React.Component {
  state = {
    chosenUser: {
      name: this.props.name,
      id: this.props.id,
    },
    inputValue: '',
    results: [],
    loading: false,
  }

  // Fetches new list everytime input is changed
  onInputChange = (target) => {
    this.setState({ inputValue: target, chosenUser: { name: '', id: '' }, loading: true }, async () => {
      const { data: fetchedResults } = await axios.post(`/api/find-user?isAdmin=${this.props.isAdmin}`, {
        find: this.state.inputValue,
      })
      this.setState({ results: [...fetchedResults], loading: false })
    })
  }

  // Used when a user is clicked
  onUserClick = (user) => {
    this.setState(
      {
        results: [],
        inputValue: '',
        chosenUser: {
          name: `${user.firstName} ${user.lastName}`,
          id: user._id,
        },
      },
      () => {
        this.props.onClick(user._id)
      }
    )
  }

  // Renders searchResults if inputValue exists
  renderResults = () => {
    if (this.state.inputValue) {
      return <SearchResults list={this.state.results} onClick={this.onUserClick} loading={this.state.loading} />
    }
  }
  // Markup
  render() {
    return (
      <div className='relative w-full'>
        <div className='flex items-center'>
          <i className='far fa-user mr-3'></i>{' '}
          <input
            type='text'
            placeholder={this.props.placeholder}
            value={this.state.chosenUser.name ? this.state.chosenUser.name : this.state.inputValue}
            className='input-border-gray'
            onChange={(e) => this.onInputChange(e.target.value)}
          />
        </div>
        {this.renderResults()}
      </div>
    )
  }
}

export default SearchField
