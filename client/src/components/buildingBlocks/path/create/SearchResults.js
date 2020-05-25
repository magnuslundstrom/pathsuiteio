import React from 'react'

// props.list should include array of users fetched

// This represents the searchresults of the users found in SearchField.js
const SearchResults = (props) => {
  const renderUsers = () => {
    return props.list.map((user, index) => {
      return (
        <li className='my-2' key={index}>
          <button className='hover:font-semibold' onClick={() => props.onClick(user)}>
            {user.firstName} {user.lastName}
          </button>
        </li>
      )
    })
  }

  return (
    <ul className='absolute top-0 left-0 mt-10 bg-gray rounded-lg shadow-md p-5 w-64 overflow-x-hidden z-10 ml-6'>
      {props.loading ? (
        <p>
          Loading <i className='fas fa-spinner own-spinner ml-2'></i>
        </p>
      ) : props.list.length === 0 ? (
        <p>No users was found</p>
      ) : (
        renderUsers()
      )}
    </ul>
  )
}

export default SearchResults
