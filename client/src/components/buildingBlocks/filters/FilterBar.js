import React from 'react'

const FilterBar = (props) => {
  return (
    <div className="flex justify-between mt-5 items-center">
      <div>{props.left}</div>
      <div>{props.right}</div>
    </div>
  )
}

export default FilterBar
