import React from 'react'
import { InnerContainer } from '../../styledComponents/smallComponents'
import { InputTitle, Input } from '../../utils/Inputs'
import { CreatePathButton } from '../../utils/Buttons'
import Container from '../buildingBlocks/Container'
import colors from '../../../styles/colors'
import axios from 'axios'

class CreatePath extends React.Component {
  state = {
    title: '',
    category: '',
    employees: '',
    responsible: '',
    goals: [
      {
        goalTitle: '',
        goalType: '',
        goalLink: '',
        goalNote: '',
      },
    ],
    user: '',
    search: '',
    searchResult: [],
  }

  onButtonSubmit = () => {
    axios.post('/api/create-path', {
      title: this.state.title,
      category: this.state.category,
      responsible: this.state.responsible,
      steps: [...this.state.goals],
      user: this.state.user,
    })
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

  renderGoals = () => {
    return this.state.goals.map((goal, index) => {
      return (
        <div
          goalnumber={index}
          key={index}
          style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}
        >
          <div>
            {/* @@ ADD TITLE TO SINGLE GOAL */}
            <Input
              placeholder="Add title"
              icon={index + 1 + '.'}
              value={this.state.goals[index].goalTitle}
              onChange={(e) => this.onHandleChange(index, 'goalTitle', e)}
            />
            {/* @@ ADD TYPE TO SINGLE GOAL */}
            <Input
              type="text"
              placeholder="Add type"
              icon={<i className="fas fa-info-circle"></i>}
              value={this.state.goals[index].goalType}
              onChange={(e) => this.onHandleChange(index, 'goalType', e)}
            />
            {/* @@ ADD LINK TO SINGLE GOAL */}
            <Input
              type="text"
              placeholder="Add link"
              icon={<i className="fas fa-link"></i>}
              value={this.state.goals[index].goalLink}
              onChange={(e) => this.onHandleChange(index, 'goalLink', e)}
            />
            {/* @@ ADD NOTE TO SINGLE GOAL */}
            <Input
              type="text"
              placeholder="Note"
              icon={<i className="fas fa-sticky-note"></i>}
              value={this.state.goals[index].goalNote}
              onChange={(e) => this.onHandleChange(index, 'goalNote', e)}
            />
          </div>
          <div>
            <button
              onClick={() => this.deleteGoal(index)}
              style={{
                border: '0px',
                backgroundColor: '#fff',
                cursor: 'pointer',
                color: colors.blue,
              }}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      )
    })
  }

  onSearch = (e) => {
    this.setState({ search: e.target.value, user: '' }, async () => {
      const res = await axios.post('/api/find-user', {
        find: this.state.search,
      })
      if (this.state.search.length > 0) {
        this.setState({ searchResult: [...res.data] })
      } else {
        this.setState({ searchResult: [] })
      }
      console.log(this.state.searchResult)
    })
  }

  renderSearchResults = () => {
    return this.state.searchResult.map((result, index) => {
      let style
      if (this.state.user === result._id) {
        style = { border: '1px solid green' }
      } else {
        style = { border: '1px solid gray' }
      }

      return (
        <div key={index}>
          <button
            onClick={() =>
              this.setState(
                { user: result._id, search: `${result.firstName} ${result.lastName}` },
                () => console.log(this.state.user)
              )
            }
            style={style}
          >
            {result.firstName} {result.lastName}
          </button>
        </div>
      )
    })
  }

  render() {
    return (
      <Container>
        <h1 style={{ marginTop: '50px' }}>New Path</h1>
        <InnerContainer>
          {/* @@ ADD TITLE TO ENTIRE PATH */}
          <InputTitle
            type="text"
            placeholder="Add a title"
            value={this.state.title}
            onChange={(e) => this.setState({ title: e.target.value })}
          />
          <div style={{ display: 'flex', position: 'relative' }}>
            <div>
              {/* @@ ADD EMPLOYEES TO THE PATH */}
              <Input
                type="text"
                placeholder="employees"
                icon={<i className="fas fa-user"></i>}
                onChange={(e) => this.onSearch(e)}
                value={this.state.search}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '0px',
                  boxShadow: '0 0.175rem 0.25rem rgba(0, 0, 0, 0.075)',
                  minHeight: '50px',
                  zIndex: '100',
                  backgroundColor: '#fff',
                }}
              >
                {this.state.searchResult.length > 0 && this.state.search && !this.state.user
                  ? this.renderSearchResults()
                  : ''}
              </div>
            </div>

            {/* @@ ADD RESPONSIBLE FOR THE PATH */}
            <Input
              type="text"
              placeholder="Responsible"
              icon={<i className="fas fa-user"></i>}
              onChange={(e) => this.setState({ responsible: e.target.value })}
            />
            <Input
              type="text"
              placeholder="Add category"
              icon={<i className="fas fa-sticky-note"></i>}
              onChange={(e) => this.setState({ category: e.target.value })}
            />
          </div>
          <h2>Goals</h2>
          {this.renderGoals()}
          <button
            onClick={this.addNewGoal}
            style={{
              border: '0px',
              color: colors.blue,
              backgroundColor: colors.white,
              cursor: 'pointer',
              marginTop: '20px',
              fontWeight: 700,
            }}
          >
            <i className="fas fa-plus" style={{ marginRight: '10px' }}></i> Add new learning goal
          </button>
        </InnerContainer>
        <CreatePathButton onClick={this.onButtonSubmit}>Submit Path</CreatePathButton>
      </Container>
    )
  }
}

export default CreatePath
