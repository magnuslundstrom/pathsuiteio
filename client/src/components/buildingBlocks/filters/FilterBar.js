import React from 'react'

const FilterBar = (props) => {
  return (
    <div className="flex justify-between mt-5 items-center -mb-5">
      <div>{props.left}</div>
      <div>{props.right}</div>
    </div>
  )
}

export default FilterBar
