import React from 'react'

// RECEIVES: onGoalComplete() {goal}

const Goal = (props) => {
  return (
    <div className="flex mt-5">
      <div className="mt-1 mr-5 text-3xl">
        <button onClick={() => props.onGoalComplete(props.index)}>
          {(props.goal.isCompleted && <i className="fas fa-check-circle text-green"></i>) || (
            <i className="far fa-circle"></i>
          )}
        </button>
      </div>
      <div>
        <h3 className="mb-1">
          {props.index + 1}. {props.goal.goalTitle}
        </h3>
        <i className="fas fa-link text-sm mr-2"></i>{' '}
        <a
          href={`${props.goal.goalLink}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green"
        >
          {props.goal.goalLink}
        </a>
        <p>
          <i className="fas fa-sticky-note text-sm mr-2"></i> {props.goal.goalNote}
        </p>
      </div>
    </div>
  )
}

export default Goal
