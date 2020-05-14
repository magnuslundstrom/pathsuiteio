import React from 'react'

const CreateSubtask = (props) => {
  return (
    <div className="flex justify-between">
      {/* left */}
      <div className="w-64 mb-3">
        <div className="flex items-center">
          <p className="text-xl font-semibold w-4 mr-2">{props.index + 1}.</p>
          <input
            placeholder="Subtask title"
            className="input-border-gray"
            type="text"
            value={props.subtask.subtaskTitle}
            onChange={(e) => props.onChange(props.index, 'subtaskTitle', e.target.value)}
          />
        </div>
        <div className="flex items-center">
          <i className="far fa-question-circle w-4 mr-2"></i>
          <input
            placeholder="Subtask type"
            className="input-border-gray"
            type="text"
            value={props.subtask.subtaskType}
            onChange={(e) => props.onChange(props.index, 'subtaskType', e.target.value)}
          />
        </div>

        <div className="flex items-center">
          <i className="fas fa-link w-4 mr-2"></i>
          <input
            placeholder="Subtask link"
            className="input-border-gray"
            type="text"
            value={props.subtask.subtaskLink}
            onChange={(e) => props.onChange(props.index, 'subtaskLink', e.target.value)}
          />
        </div>
        <div className="flex items-center">
          <i className="far fa-sticky-note w-4 mr-2"></i>
          <input
            placeholder="Subtask note"
            className="input-border-gray"
            type="text"
            value={props.subtask.subtaskNote}
            onChange={(e) => props.onChange(props.index, 'subtaskNote', e.target.value)}
          />
        </div>
      </div>
      {/* right */}
      <div className="flex justify-end items-start">
        <button onClick={() => props.onDelete(props.index)}>
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  )
}

export default CreateSubtask
