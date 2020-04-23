import React from 'react'
import styled from 'styled-components'
import colors from '../../styles/colors'

const PasswordReq = () => {
  return (
    <PasswordReqWrapper>
      <div style={{ display: 'inline' }}>
        <i className="fas fa-info-circle"></i>
      </div>
      <div className="infobox">
        <p style={{ fontWeight: '700' }}>Password Requirements</p>
        <p>Min. 7 characters</p>
      </div>
    </PasswordReqWrapper>
  )
}

const PasswordReqWrapper = styled.div`
  position: relative;
  display: inline-block;

  i {
    cursor: pointer;
  }

  .infobox {
    display: none;
    position: absolute;
    top: 100%;
    left: 0px;
    background-color: ${colors.gray};
    color: ${colors.blue};
    border-radius: 5px;
    padding: 30px;
    min-width: 300px;

    p {
      font-weight: 400;
      font-size: 16px;
    }
  }

  &:hover {
    .infobox {
      display: block;
    }
  }
`

export default PasswordReq
