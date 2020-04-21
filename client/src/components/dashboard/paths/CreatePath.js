import React from 'react'
import { Redirect } from 'react-router-dom'
import { InnerContainer } from '../../styledComponents/smallComponents'
import { InputTitle, Input } from '../../utils/Inputs'
import { CreatePathButton, TransparentButton } from '../../utils/Buttons'
import GoalsList from './GoalsList'
import SearchUser from './SearchUser'
import Container from '../buildingBlocks/Container'
import Limitations from '../../utils/Limitations'
import axios from 'axios'

class CreatePath extends React.Component {
  state = {
    title: '',
    category: '',
    employees: '',
    goals: [
      {
        goalTitle: '',
        goalType: '',
        goalLink: '',
        goalNote: '',
      },
    ],
    user: '',
    userSearch: '',
    userSearchResult: [],
    responsible: '',
    responsibleSearch: '',
    responsibleSearchResult: [],
    redirect: false,
    showLimitations: true,
  }

  onButtonSubmit = async () => {
    await axios.post('/api/create-path', {
      title: this.state.title,
      category: this.state.category,
      responsible: this.state.responsible,
      steps: [...this.state.goals],
      user: this.state.user,
    })
    this.setState({ redirect: true })
  }

  addNewGoal = () => {
    this.setState({
      goals: [
        ...this.state.goals,
        {
          goalTitle: '',
          goalType: '',
          goalLink: '',
          goalNote: '',
        },
      ],
    })
  }

  deleteGoal = (index) => {
    const currentState = [...this.state.goals]
    currentState.splice(index, 1)
    this.setState({ goals: currentState })
  }

  onHandleChange = (index, property, e) => {
    const currentState = [...this.state.goals]
    currentState[index][property] = e.target.value
    this.setState({ goals: currentState })
  }

  onSearch = (e, isAdmin) => {
    let userType
    isAdmin === true ? (userType = 'responsible') : (userType = 'user')
    this.setState({ [`${userType}Search`]: e.target.value, [userType]: '' }, async () => {
      const res = await axios.post(`/api/find-user?isAdmin=${isAdmin}`, {
        find: this.state[`${userType}Search`],
      })
      if (this.state[`${userType}Search`].length > 0) {
        this.setState({ [`${userType}SearchResult`]: [...res.data] })
      } else {
        this.setState({ [`${userType}SearchResult`]: [] })
      }
      console.log(this.state[`${userType}SearchResult`])
    })
  }

  onSearchResultClick = (result, isAdmin) => {
    let userType
    isAdmin ? (userType = 'responsible') : (userType = 'user')
    this.setState(
      { [userType]: result._id, [`${userType}Search`]: `${result.firstName} ${result.lastName}` },
      () => console.log(this.state[userType])
    )
  }

  render() {
    return (
      <Container>
        {this.state.showLimitations && (
          <Limitations
            limitations={[
              'You can only add 1 employee to a path.',
              'You must choose a user from the dropdown.',
              'Errors are not being displayed properly.',
            ]}
            onClick={() => this.setState({ showLimitations: false })}
          />
        )}

        {this.state.redirect && <Redirect to="/paths" />}
        <h1 style={{ marginTop: '50px' }}>New Path</h1>
        <InnerContainer>
          {/* @@ TITLE */}
          <InputTitle
            type="text"
            placeholder="Add a title"
            value={this.state.title}
            onChange={(e) => this.setState({ title: e.target.value })}
          />
          <div style={{ display: 'flex' }}>
            {/* @@ EMPLOYEE */}
            <div style={{ position: 'relative' }}>
              <SearchUser
                state={this.state}
                onChange={this.onSearch}
                onClick={this.onSearchResultClick}
                isAdmin={false}
              />
            </div>

            <div style={{ position: 'relative' }}>
              {/* @@ RESPONSIBLE */}
              <SearchUser
                state={this.state}
                onChange={this.onSearch}
                onClick={this.onSearchResultClick}
                isAdmin={true}
              />
            </div>
            {/* @@ CATEGORY */}
            <Input
              type="text"
              placeholder="Add category"
              icon={<i className="fas fa-sticky-note"></i>}
              onChange={(e) => this.setState({ category: e.target.value })}
            />
          </div>

          <h2>Goals</h2>
          <GoalsList state={this.state} onChange={this.onHandleChange} onDelete={this.deleteGoal} />

          {/* @@ ADD NEW GOAL */}
          <TransparentButton onClick={this.addNewGoal}>
            <i className="fas fa-plus" style={{ marginRight: '10px' }}></i> Add new learning goal
          </TransparentButton>
        </InnerContainer>

        <CreatePathButton onClick={this.onButtonSubmit}>Submit Path</CreatePathButton>
      </Container>
    )
  }
}

export default CreatePath
