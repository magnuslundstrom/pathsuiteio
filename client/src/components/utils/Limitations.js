import React from 'react'
import styled from 'styled-components'
import colors from '../../styles/colors'
import { TransparentButton } from './Buttons'

const Limitations = (props) => {
  const renderLimitations = (arr) => {
    return arr.map((limit, index) => {
      return <li key={index}>{limit}</li>
    })
  }

  return (
    <LimitsWrapper>
      <TransparentButton
        style={{ position: 'absolute', top: '50px', right: '50px' }}
        onClick={props.onClick}
      >
        <i className="fas fa-times"></i>
      </TransparentButton>
      <p style={{ fontWeight: '700' }}>Current limits:</p>
      <ul>{renderLimitations(props.limitations)}</ul>
    </LimitsWrapper>
  )
}

const LimitsWrapper = styled.div`
  background-color: ${colors.secOrange};
  color: ${colors.white};
  padding: 50px;
  margin-top: 50px;
  margin-bottom: 50px;
  position: relative;
`

export default Limitations
