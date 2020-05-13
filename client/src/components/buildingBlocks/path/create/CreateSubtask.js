import React from 'react'

const CreateSubtask = (props) => {
  return (
    <div className="flex justify-between">
      {/* left */}
      <div className="w-64 mb-5">
        <div className="flex items-center">
          <p className="text-xl font-semibold w-4 mr-2">{props.index + 1}.</p>
          <input placeholder="Subtask title" className="input-border-gray" type="text"></input>
        </div>
        <div className="flex items-center">
          <i className="far fa-question-circle w-4 mr-2"></i>
          <input placeholder="Subtask type" className="input-border-gray" type="text"></input>
        </div>

        <div className="flex items-center">
          <i className="fas fa-link w-4 mr-2"></i>
          <input placeholder="Subtask link" className="input-border-gray" type="text"></input>
        </div>
        <div className="flex items-center">
          <i className="far fa-sticky-note w-4 mr-2"></i>
          <input placeholder="Subtask note" className="input-border-gray" type="text"></input>
        </div>
      </div>
      {/* right */}
      <div className="flex justify-end items-start">
        <button>
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  )
}

export default CreateSubtask
