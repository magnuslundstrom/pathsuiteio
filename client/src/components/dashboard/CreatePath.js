import React from 'react'
import axios from 'axios'

import { Redirect } from 'react-router-dom'

import Container from '../buildingBlocks/Container'
import CreateGoals from '../buildingBlocks/path/CreateGoals'
import SearchResultList from '../buildingBlocks/utils/SearchResultList'
import { LimitationBox } from '../buildingBlocks/utils/ErrorMessages'

// AuthError
class Paths extends React.Component {
  state = {
    title: '',
    category: '',
    user: '',
    userSearch: '',
    userSearchResult: [],
    responsible: '',
    responsibleSearch: '',
    responsibleSearchResult: [],
    goals: [
      {
        goalTitle: '',
        goalType: '',
        goalLink: '',
        goalNote: '',
      },
    ],
    redirect: false,
    showLimitations: true,
    isTyping: false,
  }

  addGoal = () => {
    const goal = {
      goalTitle: '',
      goalType: '',
      goalLink: '',
      goalNote: '',
    }
    this.setState({ goals: [...this.state.goals, goal] })
  }

  onGoalChange = (index, property, e) => {
    const currentState = [...this.state.goals]
    currentState[index][property] = e.target.value
    this.setState({ goals: currentState })
  }

  onGoalDelete = (index, e) => {
    const currentState = [...this.state.goals]
    currentState.splice(index, 1)
    this.setState({ goals: currentState })
  }

  onSearch = (e, isAdmin) => {
    let userType
    isAdmin === true ? (userType = 'responsible') : (userType = 'user')
    this.setState({ [`${userType}Search`]: e.target.value, isTyping: true }, async () => {
      if (!this.isTyping) {
        this.isTyping = true
        const res = await axios.post(`/api/find-user?isAdmin=${isAdmin}`, {
          find: this.state[`${userType}Search`],
        })
        if (this.state[`${userType}Search`].length > 0) {
          this.setState({ [`${userType}SearchResult`]: [...res.data] })
        } else {
          this.setState({ [`${userType}SearchResult`]: [] })
        }
      }
    })
    setTimeout(() => {
      this.isTyping = false
    }, 250)
  }

  onSearchResultClick = (result, isAdmin) => {
    let userType
    isAdmin ? (userType = 'responsible') : (userType = 'user')
    this.setState({
      [userType]: result._id,
      [`${userType}Search`]: `${result.firstName} ${result.lastName}`,
      [`${userType}SearchResult`]: [],
    })
  }

  onSubmit = async () => {
    try {
      await axios.post('/api/create-path', {
        title: this.state.title,
        user: this.state.user,
        category: this.state.category,
        responsible: this.state.responsible,
        goals: [...this.state.goals],
      })
      this.setState({ redirect: true })
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    return (
      <Container>
        {this.state.redirect && <Redirect to="/paths" />}
        <LimitationBox
          limits={[
            'Please be sure that you have employees connected to the company',
            'Please select a user from the dropdown when possible',
            "Doesn't display errors",
          ]}
        />
        <h1>New path</h1>
        <button className="mt-10 font-semibold" onClick={() => this.setState({ redirect: true })}>
          <i className="fas fa-trash-alt mr-2"></i> Discard path
        </button>
        <div className="bg-white p-10 shadow-md rounded-lg mt-4">
          <input
            className="input-border-trans text-xl block"
            type="text"
            placeholder="Add a title"
            value={this.state.title}
            onChange={(e) => this.setState({ title: e.target.value })}
          />
          <div className="relative">
            <i className="fas fa-user mr-2"></i>{' '}
            <input
              className="input-border-trans"
              type="text"
              placeholder="Who owns this path"
              value={this.state.userSearch}
              onChange={(e) => this.onSearch(e, false)}
            />
            {this.state.userSearchResult.length > 0 && (
              <SearchResultList
                searchList={this.state.userSearchResult}
                onClick={this.onSearchResultClick}
              />
            )}
          </div>

          <div>
            <i className="fas fa-sticky-note mr-2"></i>{' '}
            <input
              className="input-border-trans"
              type="text"
              placeholder="Add category"
              value={this.state.category}
              onChange={(e) => this.setState({ category: e.target.value })}
            />
            <div className="inline relative">
              <i className="fas fa-user mr-2"></i>{' '}
              <input
                className="input-border-trans inline"
                type="text"
                placeholder="Responsible for this path"
                value={this.state.responsibleSearch}
                onChange={(e) => this.onSearch(e, true)}
              />
              {this.state.responsibleSearchResult.length > 0 && (
                <SearchResultList
                  searchList={this.state.responsibleSearchResult}
                  onClick={this.onSearchResultClick}
                />
              )}
            </div>
          </div>
          <h3 className="my-2">Goals</h3>
          <CreateGoals
            goals={this.state.goals}
            onChange={this.onGoalChange}
            onDelete={this.onGoalDelete}
          />
          <button className="flex items-center mt-5 font-semibold" onClick={this.addGoal}>
            <i className="fas fa-plus text-2xl mr-4"></i>
            Add new learning goal
          </button>
        </div>
        <div className="flex justify-end">
          <button className="btn mt-5" onClick={this.onSubmit}>
            Save path
          </button>
        </div>
      </Container>
    )
  }
}

export default Paths
