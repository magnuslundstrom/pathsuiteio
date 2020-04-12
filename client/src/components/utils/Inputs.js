import React from 'react'
import styled from 'styled-components'
import colors from '../../styles/colors'

export const InputTitle = (props) => {
  return (
    <InputTitleStyles
      placeholder={props.placeholder}
      type="text"
      onChange={props.onChange}
      value={props.value}
    />
  )
}

export const Input = (props) => {
  return (
    <InputWrapper>
      <p
        style={{
          width: '20px',
          fontSize: '20px',
          fontWeight: '700',
          marginBottom: '0px',
          marginTop: '0px',
          marginRight: '5px',
          color: colors.blue,
        }}
      >
        {props.icon}
      </p>
      <InputStyles
        placeholder={props.placeholder}
        type="text"
        onChange={props.onChange}
        value={props.value}
      />
    </InputWrapper>
  )
}

const InputStyles = styled.input`
  border: 0px;
  ::placeholder {
    color: #a9a9a9;
  }
  :focus {
    outline: ${colors.gray} solid 0px;
    border-radius: 5px;
  }
`

const InputTitleStyles = styled.input`
  border: 0px;
  margin-bottom: 20px;
  font-size: 26px;
  ::placeholder {
    color: #a9a9a9;
    font-size: 26px;
  }
  :focus {
    outline: ${colors.gray} solid 0px;
    border-radius: 5px;
  }
`

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`
