import React from 'react'
import Subtask from './Subtask'

// RECIEVES: [subtasks], pathId
// represents the last of subtasks

const SubtaskList = (props) => {
  const renderSubtasks = () => {
    return props.subtasks.map((subtask, index) => {
      return <Subtask subtask={subtask} index={index} key={index} onSubtaskComplete={props.onSubtaskComplete} />
    })
  }

  return (
    <div className='mt-6'>
      <h3 className='mb-2'>Subtasks</h3>
      {renderSubtasks()}
    </div>
  )
}

export default SubtaskList
