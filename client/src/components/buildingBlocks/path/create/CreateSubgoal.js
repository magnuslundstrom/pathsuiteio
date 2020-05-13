import React from 'react'

const CreateGoal = (props) => {
  return (
    <div className='w-64'>
      <input placeholder='Subgoal title' className='input-border-gray' type='text'></input>
      <input placeholder='Subgoal type' className='input-border-gray' type='text'></input>
      <input placeholder='Subgoal link' className='input-border-gray' type='text'></input>
      <input placeholder='Subgoal note' className='input-border-gray' type='text'></input>
    </div>
  )
}

export default CreateGoal
