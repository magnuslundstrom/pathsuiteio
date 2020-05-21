import React, { useState } from 'react'
import OutsideClickHandler from 'react-outside-click-handler'

const DropdownFilter = (props) => {
  // used only for styling purposes
  const [display, setDisplay] = useState(false)
  const [highLightItem, setHighLightItem] = useState(-1)

  let onButtonClick
  // if boolean inputs //// CHANGE THIS
  if (props.boolean) {
    onButtonClick = (value, index) => {
      if (value === props.list[0]) value = true
      if (value === props.list[1]) value = false
      if (value === props.data.current) value = ''
      props.onClick(value)
      if (index === highLightItem) setHighLightItem(-1)
      else setHighLightItem(index)
    }
  } else {
    // if standard inputs
    onButtonClick = (value, index) => {
      if (value === props.data.current) value = ''
      props.onClick(value)
      if (index === highLightItem) setHighLightItem(-1)
      else setHighLightItem(index)
    }
  }

  const renderList = () =>
    props.list.map((item, index) => (
      <button
        onClick={() => onButtonClick(item, index)}
        className={`focus:outline-none hover:font-semibold ${
          index === highLightItem ? 'font-semibold' : ''
        }`}
        key={index}
      >
        {item} {index === highLightItem && <i className="fas fa-check ml-1 text-sm"></i>}
      </button>
    ))

  return (
    <OutsideClickHandler onOutsideClick={() => setDisplay(false)}>
      <div className="relative mr-10">
        <button className="font-semibold hover-underline" onClick={() => setDisplay(!display)}>
          {props.title}
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
