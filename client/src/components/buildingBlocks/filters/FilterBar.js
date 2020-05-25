import React from 'react'

// Represents the bar where filters dropdownfilter / searchbar lives
const FilterBar = (props) => {
  return (
    <div className="flex justify-between mt-5 items-center -mb-5">
      <div>{props.left}</div>
      <div>{props.right}</div>
    </div>
  )
}

export default FilterBar
