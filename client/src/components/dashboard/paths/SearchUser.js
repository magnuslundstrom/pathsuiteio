import React from 'react'
import { Input } from '../../utils/Inputs'

const SearchUser = (props) => {
  const state = props.state
  let userType
  props.isAdmin ? (userType = 'responsible') : (userType = 'user')

  // @ renders the list of users
  const renderSearchResults = () => {
    return state[`${userType}SearchResult`].map((result, index) => {
      return (
        <div key={index}>
          <button onClick={() => props.onClick(result, props.isAdmin)}>
            {result.firstName} {result.lastName}
          </button>
        </div>
      )
    })
  }

  return (
    <div>
      {/* @@ USERTYPE */}
      <Input
        type="text"
        placeholder={props.isAdmin ? 'Responsible' : 'Employee'}
        icon={<i className="fas fa-user"></i>}
        onChange={(e) => props.onChange(e, props.isAdmin)}
        value={state[`${userType}Search`]}
      />
      <div
        style={{
          position: 'absolute',
          top: '100%',
          left: '0px',
          boxShadow: '0 0.175rem 0.25rem rgba(0, 0, 0, 0.075)',
          minHeight: '50px',
          zIndex: '100',
          backgroundColor: '#fff',
        }}
      >
        {state[`${userType}SearchResult`].length > 0 &&
        state[`${userType}Search`] &&
        !state[userType]
          ? renderSearchResults()
          : ''}
      </div>
    </div>
  )
}

export default SearchUser
