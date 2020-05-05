import React from 'react'

import PathCard from './card/PathCard'

/*
Expects 2 props: [paths], isAdmin


every path should contain:
root: 'category', 'company', {responsible}, [goals], 'title', {user}, '_id' <- path ID
responsible: {firstName, lastName, fullName }
goals: [{isCompleted, goalLink, goalNote, goalTitle, goalType}]
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
            title: path.title,
            _id: path._id,
          }}
          responsible={path.responsible}
          user={path.user}
          goals={path.goals}
          isAdmin={props.isAdmin}
          image={props.image}
        />
      )
    })
  }

  return <div className="mt-10">{renderPaths()}</div>
}

export default PathList
