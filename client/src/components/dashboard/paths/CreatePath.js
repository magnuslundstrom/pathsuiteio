import React from 'react'
import { InnerContainer } from '../../styledComponents/smallComponents'
import Input from '../../utils/Inputs'
import Container from '../buildingBlocks/Container'

class CreatePath extends React.Component {
  state = {
    title: '',
    employees: '',
    goals: [
      {
        goalTitle: 'Learn java',
        goalType: 'Programming',
        goalLink: 'Udemy.com',
        goalNote: 'Learn java to increase oop',
      },
    ],
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

  onHandleChange = (index, property, e) => {
    const currentState = [...this.state.goals]
    currentState[index][property] = e.target.value
    this.setState({ currentState }, () => console.log(this.state.goals))
  }

  renderGoals = () => {
    return this.state.goals.map((goal, index) => {
      return (
        <div goalnumber={index} key={index}>
          <Input
            placeholder="Add title for the goal"
            icon={index + 1}
            value={this.state.goals[index].title}
            onChange={(e) => this.onHandleChange(index, 'goalTitle', e)}
          />
          <Input
            type="text"
            placeholder="Add type"
            icon={<i className="fas fa-info-circle"></i>}
            value={goal.goalType}
          />
          <Input
            type="text"
            placeholder="Add link"
            icon={<i className="fas fa-link"></i>}
            value={goal.goalLink}
          />
          <Input
            type="text"
            placeholder="Note"
            icon={<i className="fas fa-sticky-note"></i>}
            value={goal.goalNote}
          />
        </div>
      )
    })
  }

  render() {
    return (
      <Container>
        <h1 style={{ marginTop: '50px' }}>New Path</h1>
        <InnerContainer>
          <Input type="text" placeholder="Add a title" />
          <div style={{ display: 'flex' }}>
            <Input
              type="text"
              placeholder="Pick employees"
              icon={<i className="fas fa-user"></i>}
            />
            <Input type="text" placeholder="Responsible" icon={<i className="fas fa-user"></i>} />
            <Input
              type="text"
              placeholder="Add category"
              icon={<i className="fas fa-sticky-note"></i>}
            />
          </div>
          <h2>Goals</h2>
          {this.renderGoals()}
          <button onClick={this.addNewGoal}>Add new learning goal</button>
        </InnerContainer>
      </Container>
    )
  }
}

export default CreatePath
