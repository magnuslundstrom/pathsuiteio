import React, { useState } from 'react'
import progressCalc from '../../utilsFn/progressCalc'
import UpperPathCard from './utils/UpperPathCard'

const PathCard = (props) => {
  const [display, setDisplay] = useState(false)
  const [confetti, setConfetti] = useState(false)
  let progress = progressCalc(props.path.steps)

  const onProgressClick = (goalIndex, index) => {
    props.onComplete(goalIndex, index)
    progress = progressCalc(props.path.steps)
    if (progress === 100) props.success()
  }

  const renderGoals = () => {
    return props.path.steps.map((path, index) => {
      return (
        <div key={index} className="flex">
          <div className="mt-1 mr-5 text-3xl">
            {(!props.isAdmin && (
              <button onClick={() => onProgressClick(props.goalIndex, index)}>
                {(path.isCompleted && <i className="fas fa-check-circle text-green"></i>) || (
                  <i className="far fa-circle"></i>
                )}
              </button>
            )) ||
              (path.isCompleted && <i className="fas fa-check-circle text-green"></i>) || (
                <i className="far fa-circle"></i>
              )}
          </div>
          <div>
            <h3 className="mb-1">
              {index + 1}. {path.goalTitle}
            </h3>
            <i className="fas fa-link text-sm mr-2"></i>{' '}
            <a
              href={`${path.goalLink}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green"
            >
              {path.goalLink}
            </a>
            <p>
              <i className="fas fa-sticky-note text-sm mr-2"></i> {path.goalNote}
            </p>
          </div>
        </div>
      )
    })
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-10 mt-10">
      <div className="flex justify-between">
        <UpperPathCard path={props.path} position={props.position} />
        <div>
          <button onClick={() => setDisplay(!display)}>
            <i className="fas fa-angle-down text-xl"></i>
          </button>
        </div>
      </div>
      <div className="mt-5 flex">
        <p>
          <i className="fas fa-sticky-note"></i> {props.path.category}
        </p>
        <p className="ml-10">
          <i className="fas fa-user"></i> {props.path.responsible.firstName}{' '}
          {props.path.responsible.lastName}
        </p>
      </div>
      <div className="rounded-lg bg-gray mt-5 h-8 w-full relative">
        <div
          className="bg-green absolute top-0 left-0 z-10 h-8 rounded-lg flex justify-center items-center duration-500"
          style={{ width: progress === 0 ? '0px' : progress + '%' }}
        >
          <p
            className={progress > 3 ? 'text-white' : 'text-blue'}
            style={{ fontWeight: '500', marginLeft: progress < 3 ? '30px' : '0px' }}
          >
            {progress}%
          </p>
        </div>
      </div>
      {display && (
        <div className="mt-6">
          <h3 className="mb-2">Goals</h3>
          {renderGoals()}
        </div>
      )}
    </div>
  )
}

export default PathCard
