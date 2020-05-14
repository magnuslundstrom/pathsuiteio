import React from 'react'

// Used in CreatePath component
// DEPRECIATED <----------------------------
const CreateGoals = (props) => {
  const renderGoals = () => {
    return props.goals.map((goal, index) => {
      return (
        <div className="mb-3" key={index}>
          <div className="flex">
            {props.edit && (
              <div>
                <button className="mt-1 mr-5 text-3xl" onClick={() => props.onComplete(index)}>
                  {(goal.isCompleted && <i className="fas fa-check-circle text-green"></i>) || (
                    <i className="far fa-circle"></i>
                  )}
                </button>
              </div>
            )}

            <div className="w-full">
              <div className="flex justify-between w-full">
                <div>
                  <span className="text-xl font-semibold mr-2">{index + 1}.</span>{' '}
                  <input
                    type="text"
                    className="input-border-trans text-xl"
                    placeholder="Add a title for this goal"
                    value={goal.goalTitle}
                    onChange={(e) => props.onChange(index, 'goalTitle', e)}
                  />
                </div>
                <button onClick={() => props.onDelete(index)} className="bg-transparent border-0">
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <div>
                <i className="fas fa-info-circle mr-2"></i>
                <input
                  type="text"
                  className="input-border-trans"
                  placeholder="Add type"
                  value={goal.goalType}
                  onChange={(e) => props.onChange(index, 'goalType', e)}
                />
              </div>
              <div>
                <i className="fas fa-link mr-2"></i>
                <input
                  type="text"
                  className="input-border-trans"
                  placeholder="Add link"
                  value={goal.goalLink}
                  onChange={(e) => props.onChange(index, 'goalLink', e)}
                />
              </div>
              <div>
                <i className="fas fa-sticky-note mr-2"></i>
                <input
                  type="text"
                  className="input-border-trans"
                  placeholder="Add note"
                  value={goal.goalNote}
                  onChange={(e) => props.onChange(index, 'goalNote', e)}
                />
              </div>
            </div>
          </div>
        </div>
      )
    })
  }
  return <div>{renderGoals()}</div>
}

export default CreateGoals
