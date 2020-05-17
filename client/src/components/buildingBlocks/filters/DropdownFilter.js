import React, { useState } from 'react'
import OutsideClickHandler from 'react-outside-click-handler'

// title='Category'
// list={['Programming', 'Design', 'Gardening']}
// current={this.state.filters.category}
// onClick={this.onFilterChange}
// data={{name: 'category', current: this.state.filters.category}}

const DropdownFilter = (props) => {
  const [display, setDisplay] = useState(false)

  let onButtonClick
  // if boolean inputs //// CHANGE THIS
  if (props.boolean) {
    onButtonClick = (value) => {
      if (value === props.data.list[0]) value = false
      if (value === props.data.list[0] && value === props.data.current) value = ''

      props.onClick(value)
    }
  } else {
    // if standard inputs
    onButtonClick = (value) => {
      if (value === props.data.current) value = ''
      props.onClick(value)
    }
  }

  const renderList = () =>
    props.list.map((item, index) => (
      <button
        onClick={() => onButtonClick(item)}
        className={`focus:outline-none ${item === props.data.current ? 'font-semibold' : ''}`}
        key={index}
      >
        {item} {item === props.data.current && <i className='fas fa-check ml-1 text-sm'></i>}
      </button>
    ))

  return (
    <OutsideClickHandler onOutsideClick={() => setDisplay(false)}>
      <div className='relative mr-10'>
        <button className='font-semibold focus:outline-none' onClick={() => setDisplay(!display)}>
          {props.title}
          <i className='fas fa-angle-down ml-2'></i>
        </button>
        {display && (
          <div className='bg-white shadow-md rounded-md w-48 absolute top-0 mt-10 left-0'>
            <div className='flex flex-col p-4 items-start'>{renderList()}</div>
          </div>
        )}
      </div>
    </OutsideClickHandler>
  )
}

export default DropdownFilter
