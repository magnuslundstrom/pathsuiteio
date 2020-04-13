import React from 'react'
import styled from 'styled-components'
import colors from '../../styles/colors'

const ProgressBarWrapper = styled.div`
  background-color: ${colors.gray};
  width:100%;
  height: 40px;
  position: relative;
  }
`

const ProgressBar = styled.div`
  background-color: ${colors.green};
  width: ${(props) => props.progress}%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ProgressText = styled.p`
  text-align: center;
  margin-top: 0px;
  margin-bottom: 0px;
  margin-left: ${(props) => (props.progress < 3 ? '50px' : '0px')};
  z-index: 100;
  color: ${(props) => (props.progress < 3 ? 'black' : colors.white)};
  fontweight: 700;
`

export default (props) => {
  return (
    <ProgressBarWrapper>
      <ProgressBar progress={props.progress}>
        <ProgressText progress={props.progress}>{props.progress}%</ProgressText>
      </ProgressBar>
    </ProgressBarWrapper>
  )
}
