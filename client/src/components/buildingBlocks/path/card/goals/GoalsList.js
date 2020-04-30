import React from 'react'
import Goal from './Goal'

// RECIEVES: [goals], pathId

const GoalsList = (props) => {
  const renderGoals = () => {
    return props.goals.map((goal, index) => {
      return <Goal goal={goal} index={index} key={index} onGoalComplete={props.onGoalComplete} />
    })
  }

  return (
    <div className="mt-6">
      <h3 className="mb-2">Goals</h3>
      {renderGoals()}
    </div>
  )
}

export default GoalsList
