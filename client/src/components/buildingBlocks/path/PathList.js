import React from 'react'

import PathCard from './card/PathCard'

/*
Expects 2 props: paths, isAdmin
props.paths represents an array of all fetched paths

every path should contain:
root: 'category', 'company', {responsible}, [goals], 'title', {user}, '_id' <- path ID
responsible: {firstName, lastName, fullName }
goals: [{isCompleted, goalLink, goalNote, goalTitle, goalType}]
*/

const PathList = (props) => {
  const renderPaths = () => {
    if (props.paths.length === 0) {
      return <p>You have no paths yet!</p>
    } else {
      return props.paths.map((path, index) => {
        return (
          <PathCard
            key={index}
            path={{
              category: path.category,
              company: path.company,
              title: path.title,
              _id: path._id,
              index,
            }}
            responsible={path.responsible}
            user={path.user}
            goals={path.goals}
            isAdmin={props.isAdmin}
          />
        )
      })
    }
  }

  return <div className="mt-10">{renderPaths()}</div>
}

export default PathList
