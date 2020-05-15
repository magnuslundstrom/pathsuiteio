import React from 'react'

// RECEIVES: onSubtaskComplete() {subtask}

const Subtask = (props) => {
  return (
    <div className="flex mt-5">
      <div className="mt-1 mr-5 text-3xl">
        <button onClick={() => props.onSubtaskComplete(props.index, props.subtask._id)}>
          {(props.subtask.isCompleted && <i className="fas fa-check-circle text-green"></i>) || (
            <i className="far fa-circle"></i>
          )}
        </button>
      </div>
      <div>
        <h3 className="mb-1">
          {props.index + 1}. {props.subtask.subtaskTitle}
        </h3>
        <p>
          <i className="far fa-question-circle mr-2 text-sm"></i> {props.subtask.subtaskType}
        </p>
        <i className="fas fa-link text-sm mr-2"></i>{' '}
        <a
          href={`${props.subtask.subtaskLink}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green"
        >
          {props.subtask.subtaskLink}
        </a>
        <p>
          <i className="fas fa-sticky-note text-sm mr-2"></i> {props.subtask.subtaskNote}
        </p>
      </div>
    </div>
  )
}

export default Subtask
