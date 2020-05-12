import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import GoalList from './goals/GoalsList'
import UpperPathCard from './upperpathcard/UpperPathCard'
import MetaLine from './upperpathcard/MetaLine'
import ProgressBar from './upperpathcard/ProgressBar'

import progressCalc from '../../../../utilsFn/progressCalc'

// RECIEVES: Path, responsible, user, goals, isAdmin(User component)

const PathCard = (props) => {
  const [display, setDisplay] = useState(false)
  const [goals, setGoals] = useState(props.goals)
  let progress = progressCalc(goals)

  const onGoalComplete = async (index, goalId) => {
    try {
      const curGoals = [...goals]
      curGoals[index].isCompleted = !curGoals[index].isCompleted
      setGoals(curGoals)
      await axios.post('/api/update-goal-status', {
        pathId: props.path._id,
        goalId,
      })
    } catch (e) {
      console.log(e.response)
    }
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-10 mt-10">
      <div className="flex justify-between">
        {/* UPPER AREA */}
        <UpperPathCard
          image={props.image}
          profilePhoto={props.user.image}
          name={props.user.firstName + ' ' + props.user.lastName}
          jobTitle={props.user.jobTitle}
          pathTitle={props.path.title}
        />
        <div className="flex items-center h-1">
          <button onClick={() => setDisplay(!display)}>
            <i className="fas fa-angle-down text-2xl"></i>
          </button>
          <Link to={`/edit-path?id=${props.path._id}`} className="">
            <i className="fas fa-pencil-alt text-sm ml-3"></i>
          </Link>
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
