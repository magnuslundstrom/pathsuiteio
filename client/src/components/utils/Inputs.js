import React from 'react'
import styled from 'styled-components'
import colors from '../../styles/colors'

const InputStyles = styled.input`
  border: 0px;
  margin-bottom: 20px;
  height: ${(props) => (props.title ? '26px' : '16px')};
  font-size: ${(props) => (props.title ? '26px' : '16px')};
  ::placeholder {
    color: #a9a9a9;
    font-size: ${(props) => (props.title ? '26px' : '16px')};
  }
  :focus {
    outline: ${colors.gray} solid 0px;
    border-radius: 5px;
  }
`

const InputWrapper = styled.div`
  display: flex;
`

const Input = (props) => {
  if (props.title) {
    return (
      <InputWrapper>
        <div style={{ marginRight: '8px' }}>{props.icon}</div>
        <InputStyles
          placeholder={props.placeholder}
          title={props.title}
          value={props.value}
          onChange={props.onChange}
        />
      </InputWrapper>
    )
  } else {
    return (
      <InputWrapper>
        <div style={{ marginRight: '8px' }}>{props.icon}</div>
        <InputStyles
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
        />
      </InputWrapper>
    )
  }
}

export default Input
