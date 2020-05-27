import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import SubtaskList from './subtasks/SubtaskList'
import UpperPathCard from './upperpathcard/UpperPathCard'
import MetaLine from './upperpathcard/MetaLine'
import ProgressBar from './upperpathcard/ProgressBar'

import progressCalc from '../../../../utilsFn/progressCalc'

// RECIEVES: Path, responsible, user, subtasks, isAdmin(User component)

// Represents the entire pathcard
const PathCard = (props) => {
  const [display, setDisplay] = useState(false)
  const [subtasks, setSubtasks] = useState(props.subtasks)
  const lastCard = useRef(null)
  let progress = progressCalc(subtasks)

  // Used when path-completed button is clicked
  const onSubtaskComplete = async (index, subtaskId) => {
    try {
      const curSubtasks = [...subtasks]
      curSubtasks[index].isCompleted = !curSubtasks[index].isCompleted
      setSubtasks(curSubtasks)
      await axios.post('/api/update-subtask-status', {
        pathId: props.path._id,
        subtaskId,
      })
    } catch (e) {
      console.log(e.response)
    }
  }

  // Used to render more paths
  const onScroll = () => {
    if (props.index === props.length - 1) {
      props.onScroll()
    }
  }

  useEffect(() => {
    const options = {
      threshold: 1.0,
    }
    // Observes last card and triggers onScroll when in threshold
    let observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onScroll()
          observer.unobserve(lastCard.current)
        }
      })
    }, options)
    observer.observe(lastCard.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <article className="bg-white shadow-md rounded-lg p-10 mt-5 hover-card" ref={lastCard}>
      <div className="flex justify-between">
        {/* UPPER AREA */}
        <UpperPathCard
          image={props.image}
          profilePhoto={props.user.image}
          name={props.user.firstName + ' ' + props.user.lastName}
          jobTitle={props.user.jobTitle}
          pathTitle={props.path.pathTitle}
        />
        <div className="flex items-center h-1 mt-3">
          <button onClick={() => setDisplay(!display)} className="hover-underline">
            <i className="fas fa-angle-down text-2xl"></i>
          </button>
          <Link to={`/edit-path?id=${props.path._id}`} className="hover-underline">
            <i className="fas fa-pencil-alt text-sm ml-3"></i>
          </Link>
        </div>
      </div>

      <MetaLine
        category={props.path.category}
        responsible={props.responsible.firstName + ' ' + props.responsible.lastName}
        startDate={props.path.startDate}
        endDate={props.path.endDate}
      />

      <ProgressBar progress={progress} />

      {display && (
        <div>
          <h2 className="mt-5">Goal</h2>
          <p>{props.path.goal}</p>
          <SubtaskList
            subtasks={subtasks}
            pathId={props.path._id}
            onSubtaskComplete={onSubtaskComplete}
          />
        </div>
      )}
    </article>
  )
}

export default PathCard
