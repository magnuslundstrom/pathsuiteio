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

const PathList = (props) => {
  const renderPaths = () => {
    return props.paths.map((path, index) => {
      return (
        <PathCard
          key={index}
          path={{
            category: path.category,
            company: path.company,
            pathTitle: path.pathTitle,
            _id: path._id,
            startDate: path.startDate,
            endDate: path.endDate,
          }}
          responsible={path.responsible}
          user={path.user}
          subtasks={path.subtasks}
          isAdmin={props.isAdmin}
          image={props.image}
          onScroll={props.onScroll}
          length={props.paths.length}
          index={index}
        />
      )
    })
  }

  return <div className="mt-10">{renderPaths()}</div>
}

export default PathList
