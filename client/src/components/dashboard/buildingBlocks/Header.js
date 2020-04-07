import React from 'react'
import { Link } from 'react-router-dom'
import { HeaderWrapper } from '../../styledComponents/headerComponents'

const Header = () => {
  return (
    <HeaderWrapper>
      <Link to="/dashboard">Pathsuite.io</Link>
      <div>
        <Link to="/paths">Paths</Link>
        <Link to="/employees">Employees</Link>
        <Link to="/">Reports</Link>
        <div className="dropdown">Username</div>
      </div>
    </HeaderWrapper>
  )
}

export default Header
