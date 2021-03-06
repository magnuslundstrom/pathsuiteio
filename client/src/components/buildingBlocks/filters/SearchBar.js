import React from 'react'

// Represents the searchbar component
const SearchBar = (props) => {
  return (
    <div className="bg-white rounded-md shadow-md hover:shadow-lg duration-300">
      <i className="fas fa-search text-secGray p-2 text-sm"></i>{' '}
      <input
        type="text"
        placeholder="Search path title"
        className="outline-none"
        onChange={(e) => props.onChange(e.target.value)}
        value={props.value}
      ></input>
    </div>
  )
}

export default SearchBar
