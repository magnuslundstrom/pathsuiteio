import React from 'react'
import { Input } from '../../utils/Inputs'
import { TransparentButton } from '../../utils/Buttons'

const GoalsList = (props) => {
  const state = props.state

  const changeParentState = (index, property, e) => {
    props.onChange(index, property, e)
  }

  const deleteGoal = (index) => {
    props.onDelete(index)
  }

  return state.goals.map((goal, index) => {
    return (
      <div
        key={index}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '20px',
          marginBottom: '30px',
        }}
      >
        <div>
          {/* @@ GOAL TITLE */}
          <Input
            placeholder="Add title"
            icon={index + 1 + '.'}
            value={state.goals[index].goalTitle}
            onChange={(e) => changeParentState(index, 'goalTitle', e)}
          />
          {/* @@ GOAL TYPE */}
          <Input
            type="text"
            placeholder="Add type"
            icon={<i className="fas fa-info-circle"></i>}
            value={state.goals[index].goalType}
            onChange={(e) => changeParentState(index, 'goalType', e)}
          />
          {/* @@ GOAL LINK */}
          <Input
            type="text"
            placeholder="Add link"
            icon={<i className="fas fa-link"></i>}
            value={state.goals[index].goalLink}
            onChange={(e) => changeParentState(index, 'goalLink', e)}
          />
          {/* @@ GOAL NOTE */}
          <Input
            type="text"
            placeholder="Note"
            icon={<i className="fas fa-sticky-note"></i>}
            value={state.goals[index].goalNote}
            onChange={(e) => changeParentState(index, 'goalNote', e)}
          />
        </div>
        <div>
          <TransparentButton onClick={() => deleteGoal(index)}>
            <i className="fas fa-times"></i>
          </TransparentButton>
        </div>
      </div>
    )
  })
}

export default GoalsList
