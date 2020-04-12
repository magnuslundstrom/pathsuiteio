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
  }

  onButtonSubmit = () => {
    axios.post('/api/create-path', {
      title: this.state.title,
      category: this.state.category,
      responsible: this.state.responsible,
      steps: [...this.state.goals],
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
          <div style={{ display: 'flex' }}>
            {/* @@ ADD EMPLOYEES TO THE PATH */}
            <Input
              type="text"
              placeholder="employees -> mia"
              icon={<i className="fas fa-user"></i>}
              onChange={(e) => this.setState({ employees: e.target.value })}
            />
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
