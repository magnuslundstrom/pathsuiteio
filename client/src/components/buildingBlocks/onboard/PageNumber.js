import React from 'react'

// recieves numbers (numberOfSlides), currentpage, onClick to set slidepage to index
// Represents the pageNumber bar on onboard component
const PageNumber = (props) => {
  const pages = []
  for (var i = 0; i < props.numbers; i++) {
    pages.push(i)
  }

  const buttons = pages.map((page) => {
    return (
      <button
        key={page}
        className={`mr-1 ml-1 w-3 h-3 rounded-full focus:outline-none ${
          page === props.currentPage ? 'bg-green' : 'bg-gray'
        }`}
        onClick={() => props.onClick(page)}
      ></button>
    )
  })
  return <div className="flex mt-6 mb-1">{buttons}</div>
}

export default PageNumber
