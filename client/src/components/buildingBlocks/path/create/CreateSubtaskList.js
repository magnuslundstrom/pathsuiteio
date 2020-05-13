import React from 'react'
import CreateSubtask from './CreateSubtask'

const CreateSubtaskList = (props) => {
  const renderSubtasks = () => {
    return props.subtasks.map((goal, index) => (
      <CreateSubtask index={index} subtask={goal} key={index} />
    ))
  }

  return <div>{renderSubtasks()}</div>
}

export default CreateSubtaskList
