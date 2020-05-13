import React from 'react'
import CreateGoal from './CreateSubgoal'

const CreateGoalList = (props) => {
  const renderCreateGoals = () => {
    return props.subgoals.map((goal, index) => <CreateGoal index={index} goal={goal} />)
  }

  return <div>{renderCreateGoals()}</div>
}

export default CreateGoalList
