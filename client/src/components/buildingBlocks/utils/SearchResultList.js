import React from 'react'

const SearchResultList = (props) => {
  const renderSearchList = () => {
    return props.searchList.map((result, index) => {
      return (
        <button key={index} onClick={() => props.onClick(result, result.isAdmin)}>
          {result.fullName}
        </button>
      )
    })
  }

  return (
    <div className="bg-gray shadow-md rounded-lg w-56 p-5 absolute top-0 mt-8 left-0 z-10">
      <ul>{renderSearchList()}</ul>
    </div>
  )
}

export default SearchResultList
