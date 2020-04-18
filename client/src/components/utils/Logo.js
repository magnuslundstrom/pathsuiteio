import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import logoImg from '../../images/logo.png'

const LogoStyles = styled.img`
  height: 30px;
  margin-bottom: ${(props) => (props.header ? '0px' : '30px')};
`

const Logo = (props) => {
  if (props.dashboard) {
    return (
      <Link to="/dashboard">
        <LogoStyles src={logoImg} header />
      </Link>
    )
  } else {
    return (
      <Link to="/">
        <LogoStyles src={logoImg} />
      </Link>
    )
  }
}

export default Logo
