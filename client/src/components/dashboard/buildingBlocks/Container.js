import React from 'react'
import styled from 'styled-components'

import Header from '../buildingBlocks/Header'

const ContainerStyles = styled.div`
  max-width: 1300px;
  margin: 0 auto;
`

const Container = (props) => {
  return (
    <div>
      <Header />
      <ContainerStyles>{props.children}</ContainerStyles>
    </div>
  )
}

export default Container
