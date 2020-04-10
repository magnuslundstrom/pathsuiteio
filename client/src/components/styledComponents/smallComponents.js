import styled from 'styled-components'
import colors from '../../styles/colors'
import React from 'react'

export const WelcomeMessage = styled.div`
  background-color: ${colors.welcomeBlue};
  padding: 50px;
  font-size: 46px;
  box-shadow: 0 0.175rem 0.25rem rgba(0, 0, 0, 0.075);
  margin-top: 50px;
  h1 {
    color: ${colors.purple};
  }
`
const ErrorMessageStyles = styled.p`
  color: ${colors.red};
  font-weight: 700;
  margin-bottom: 0px;
  font-size: 14px;
  display: flex;

  i {
    color: ${colors.red};
    font-size: 12px;
    margin-right: 5px;
    margin-top: 4px;
  }
`
export const ErrorMessage = (props) => {
  return (
    <ErrorMessageStyles>
      <i className="fas fa-exclamation-triangle"></i> {props.children}
    </ErrorMessageStyles>
  )
}
