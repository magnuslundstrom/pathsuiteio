import React from 'react'
import CreateSubtask from './CreateSubtask'

// Renders a list of CreateSubtask components based on props.subtasks
const CreateSubtaskList = (props) => {
  const renderSubtasks = () => {
    return props.subtasks.map((subtask, index) => (
      <CreateSubtask index={index} subtask={subtask} key={index} onDelete={props.onDelete} onChange={props.onChange} />
    ))
  }

  return <div>{renderSubtasks()}</div>
}

export default CreateSubtaskList
