import React, { useState } from 'react'

import OutsideClickHandler from 'react-outside-click-handler'

const Dropdown = (props) => {
  const [displayedItem, setDisplayedItem] = useState('This week')
  const [displayDropdown, setDisplayDropdown] = useState(false)

  const update = (input, period, when) => {
    setDisplayedItem(input)
    setDisplayDropdown(false)
    props.onClick(period, when)
  }

  return (
    <OutsideClickHandler onOutsideClick={() => setDisplayDropdown(false)}>
      <div className="relative w-32 flex justify-end">
        <button className="font-semibold" onClick={() => setDisplayDropdown(!displayDropdown)}>
          {displayedItem} <i className="fas fa-chevron-down ml-1 text-sm"></i>
        </button>
        {displayDropdown && (
          <div className="absolute rounded-lg shadow-md bg-white w-32 flex flex-col items-start p-4 top-0 left-0 mt-8">
            <button onClick={() => update('This week', 'week', 'this-week')}>This Week</button>
            <button onClick={() => update('Last week', 'week', 'last-week')}>Last week</button>
            <button onClick={() => update('This year', 'year', 'this-year')}>This year</button>
            <button onClick={() => update('Last year', 'year', 'last-year')}>Last year</button>
          </div>
        )}
      </div>
    </OutsideClickHandler>
  )
}

export default Dropdown
