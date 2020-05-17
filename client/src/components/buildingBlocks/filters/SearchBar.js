import React from 'react'

const SearchBar = (props) => {
  return (
    <div className="bg-white rounded-md shadow-md">
      <i className="fas fa-search text-secGray p-2 text-sm"></i>{' '}
      <input type="text" placeholder="Search path title" className="outline-none"></input>
    </div>
  )
}

export default SearchBar
