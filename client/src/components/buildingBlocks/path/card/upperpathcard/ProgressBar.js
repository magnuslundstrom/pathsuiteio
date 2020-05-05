import React from 'react'

const ProgressBar = (props) => {
  const progress = props.progress

  return (
    <div className="rounded-lg bg-gray mt-5 h-8 w-full relative">
      {/* is progress 0 then the width is 0px else the width is the progress in % */}
      <div
        className="bg-green absolute top-0 left-0 z-10 h-8 rounded-lg flex justify-center items-center duration-500"
        style={{ width: progress === 0 ? '0px' : progress + '%' }}
      >
        <p
          className={progress > 3 ? 'text-white' : 'text-blue'}
          style={{ fontWeight: '500', marginLeft: progress < 3 ? '40px' : '0px' }}
        >
          {progress}%
        </p>
      </div>
    </div>
  )
}

export default ProgressBar
