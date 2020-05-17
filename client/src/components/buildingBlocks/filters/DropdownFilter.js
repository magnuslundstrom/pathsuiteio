import React, { useState } from 'react'
import OutsideClickHandler from 'react-outside-click-handler'

const DropdownFilter = (props) => {
  const [display, setDisplay] = useState(false)
  const [selectedItem, setSelectedItem] = useState('Selected')
  const [list, setList] = useState(props.list)

  const renderList = () =>
    list.map((item, index) => (
      <button
        onClick={() => setSelectedItem(item !== selectedItem ? item : '')}
        className={`focus:outline-none ${item === selectedItem ? 'font-semibold' : ''}`}
        key={index}
      >
        {item} {item === selectedItem && <i className="fas fa-check ml-1 text-sm"></i>}
      </button>
    ))

  return (
    <OutsideClickHandler onOutsideClick={() => setDisplay(false)}>
      <div className="relative mr-10">
        <button className="font-semibold focus:outline-none" onClick={() => setDisplay(!display)}>
          {props.sortProp}
          <i className="fas fa-angle-down ml-2"></i>
        </button>
        {display && (
          <div className="bg-white shadow-md rounded-md w-48 absolute top-0 mt-10 left-0">
            <div className="flex flex-col p-4 items-start">{renderList()}</div>
          </div>
        )}
      </div>
    </OutsideClickHandler>
  )
}

export default DropdownFilter
