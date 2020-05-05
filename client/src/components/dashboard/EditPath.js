import React from 'react'
import axios from 'axios'
import progressCalc from '../../utilsFn/progressCalc'
import Container from '../buildingBlocks/Container'
import CreateGoals from '../buildingBlocks/path/CreateGoals'
import SearchResultList from '../buildingBlocks/utils/SearchResultList'
import ProgressBar from '../buildingBlocks/path/card/upperpathcard/ProgressBar'

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
    goals: [],
    isTyping: false,
  }

  async componentDidMount() {
    const params = new URLSearchParams(this.props.location.search)
    const pathId = params.get('id')
    const { data: path } = await axios.get(`/api/paths?_id=${pathId}`)
    const actualPath = path[0]
    this.setState({
      title: actualPath.title,
      category: actualPath.category,
      user: actualPath.user._id,
      userSearch: actualPath.user.firstName + ' ' + actualPath.user.lastName,
      responsible: actualPath.responsible._id,
      responsibleSearch: actualPath.responsible.firstName + ' ' + actualPath.responsible.lastName,
      goals: actualPath.goals,
    })
  }

  onGoalComplete = (index) => {
    const allGoals = [...this.state.goals]
    const completedGoal = { ...this.state.goals[index] }
    completedGoal.isCompleted = !completedGoal.isCompleted
    allGoals[index] = completedGoal
    this.setState({ goals: allGoals })
  }

  addGoal = () => {
    const goal = {
      isCompleted: false,
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
    const params = new URLSearchParams(this.props.location.search)
    const pathId = params.get('id')
    try {
      await axios.patch(`/api/update-path?id=${pathId}`, {
        title: this.state.title,
        user: this.state.user,
        category: this.state.category,
        responsible: this.state.responsible,
        goals: [...this.state.goals],
      })
      this.props.history.goBack()
    } catch (e) {
      console.log(e)
    }
  }

  onPathDelete = async () => {
    const params = new URLSearchParams(this.props.location.search)
    const pathId = params.get('id')
    try {
      await axios.get(`/api/delete-path?id=${pathId}`)
      this.props.history.goBack()
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    return (
      <Container>
        <h1 className="mb-5">Edit {this.state.title}</h1>
        <button onClick={() => this.props.history.goBack()} className="block font-semibold mt-3">
          <i className="fas fa-arrow-left mr-2"></i> Go back
        </button>
        <button className="mt-3 font-semibold" onClick={this.onPathDelete}>
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
            <ProgressBar progress={progressCalc(this.state.goals)} />
          </div>
          <h3 className="my-2">Goals</h3>
          <CreateGoals
            goals={this.state.goals}
            onChange={this.onGoalChange}
            onDelete={this.onGoalDelete}
            onComplete={this.onGoalComplete}
            edit={true}
          />
          <button className="flex items-center mt-5 font-semibold" onClick={this.addGoal}>
            <i className="fas fa-plus text-2xl mr-4"></i>
            Add new learning goal
          </button>
        </div>
        <div className="flex justify-end">
          <button className="btn btn-green mt-5 py-3 px-10" onClick={this.onSubmit}>
            Update path
          </button>
        </div>
      </Container>
    )
  }
}

export default Paths
