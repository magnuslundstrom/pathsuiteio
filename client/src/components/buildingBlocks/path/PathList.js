import React from 'react'

import PathCard from './card/PathCard'

/*
Expects 2 props: [paths], isAdmin


every path should contain:
root: 'category', 'company', {responsible}, [subtasks], 'title', {user}, '_id' <- path ID
responsible: {firstName, lastName, fullName }
subtasks: [{isCompleted, subtaskLink, subtaskNote, subtaskTitle, subtaskType}]
optional: image
*/

// Represents a list of PathCards from an array passed from parent
const PathList = (props) => {
  const renderPaths = () => {
    return props.paths.map((path, index) => {
      return (
        <PathCard
          key={index}
          path={path}
          responsible={path.responsible}
          user={path.user}
          subtasks={path.subtasks}
          isAdmin={props.isAdmin}
          image={props.image}
          length={props.paths.length}
          index={index}
          onScroll={props.onScroll}
        />
      )
    })
  }

  return <div className='mt-10'>{renderPaths()}</div>
}

export default PathList
