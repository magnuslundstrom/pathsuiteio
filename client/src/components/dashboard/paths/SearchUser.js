import React from 'react'
import { Input } from '../../utils/Inputs'
import styled from 'styled-components'
import colors from '../../../styles/colors'

const SearchUser = (props) => {
  const state = props.state
  let userType
  props.isAdmin ? (userType = 'responsible') : (userType = 'user')

  /* This component consist of the input and the list of users
  Depending on the props.isAdmin we know which users to search within */

  /* Component gets passed parent components state as a prop 
      This is among other used to render out the search results */

  /* Our usertype is based on our prop.isAdmin. It is then used to set the state of our parent component
  and also render the correct results */

  // @ renders the list of users
  const renderSearchResults = () => {
    return state[`${userType}SearchResult`].map((result, index) => {
      return (
        <DropdownButton onClick={() => props.onClick(result, props.isAdmin)} key={index}>
          {result.firstName} {result.lastName}
        </DropdownButton>
      )
    })
  }
  let display
  state[`${userType}SearchResult`].length > 0 ? (display = 'block') : (display = 'none')

  return (
    <div>
      {/* This is the input field */}
      <Input
        type="text"
        placeholder={props.isAdmin ? 'Responsible' : 'Employee'}
        icon={<i className="fas fa-user"></i>}
        onChange={(e) => props.onChange(e, props.isAdmin)}
        value={state[`${userType}Search`]}
      />
      {/* This is the search results */}
      <div
        style={{
          position: 'absolute',
          top: '100%',
          left: '0px',
          boxShadow: '0 0.175rem 0.25rem rgba(0, 0, 0, 0.075)',
          zIndex: '100',
          backgroundColor: '#fff',
          display: display,
        }}
      >
        {/* @@ If the search array length > 0 -> 
              and the usertype Search is not an empty string
              and userType doesnt exist then we want to render search Results
        */}

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

const DropdownButton = styled.button`
  border: 0px;
  background-color: #fff;
  padding: 10px;
  &:hover,
  &:focus {
    background-color: ${colors.gray};
  }
`
