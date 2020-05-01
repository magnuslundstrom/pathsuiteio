import React, { useState } from 'react'
import axios from 'axios'

import GoalList from './goals/GoalsList'
import UpperPathCard from './upperpathcard/UpperPathCard'
import MetaLine from './upperpathcard/MetaLine'
import ProgressBar from './upperpathcard/ProgressBar'

import progressCalc from '../../../../utilsFn/progressCalc'

// RECIEVES: Path, responsible, user, goals, isAdmin

const PathCard = (props) => {
  const [display, setDisplay] = useState(false)
  const [goals, setGoals] = useState(props.goals)
  let progress = progressCalc(goals)

  const onGoalComplete = async (index, goalId) => {
    const curGoals = [...goals]
    curGoals[index].isCompleted = !curGoals[index].isCompleted
    setGoals(curGoals)
    await axios.post('/api/update-goal-status', {
      pathId: props.path._id,
      goalId,
    })
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-10 mt-10">
      <div className="flex justify-between">
        {/* UPPER AREA */}
        <UpperPathCard
          image={props.user.image}
          name={props.user.firstName + ' ' + props.user.lastName}
          jobTitle={props.user.jobTitle}
          pathTitle={props.path.title}
        />
        <div>
          <button onClick={() => setDisplay(!display)}>
            <i className="fas fa-angle-down text-xl"></i>
          </button>
        </div>
      </div>

      <MetaLine
        category={props.path.category}
        responsible={props.responsible.firstName + ' ' + props.responsible.lastName}
      />

      <ProgressBar progress={progress} />

      {display && (
        <GoalList goals={goals} pathId={props.path._id} onGoalComplete={onGoalComplete} />
      )}
    </div>
  )
}

export default PathCard
