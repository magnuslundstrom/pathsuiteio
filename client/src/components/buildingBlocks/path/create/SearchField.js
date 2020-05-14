import React from 'react'

import axios from 'axios'
import SearchResults from './SearchResults'

class SearchField extends React.Component {
  state = {
    chosenUser: {
      name: '',
      id: '',
    },
    inputValue: '',
    results: [],
  }

  // Fetches new list everytime input is changed
  onInputChange = (target) => {
    this.setState({ inputValue: target, chosenUser: { name: '', id: '' } }, async () => {
      const { data: fetchedResults } = await axios.post(
        `/api/find-user?isAdmin=${this.props.isAdmin}`,
        {
          find: this.state.inputValue,
        }
      )
      this.setState({ results: [...fetchedResults] })
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
      return <SearchResults list={this.state.results} onClick={this.onUserClick} />
    }
  }

  render() {
    return (
      <div className="relative w-full">
        <div className="flex items-center">
          <i className="far fa-user mr-3"></i>{' '}
          <input
            type="text"
            placeholder={this.props.placeholder}
            value={this.state.chosenUser.name ? this.state.chosenUser.name : this.state.inputValue}
            className="input-border-gray"
            onChange={(e) => this.onInputChange(e.target.value)}
          />
        </div>
        {this.renderResults()}
      </div>
    )
  }
}

export default SearchField
