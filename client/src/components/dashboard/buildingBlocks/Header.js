import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { HeaderWrapper } from '../../styledComponents/headerComponents'

const Header = (props) => {
  return (
    <HeaderWrapper>
      <Link to="/dashboard">Pathsuite.io</Link>
      <div>
        <Link to="/paths">Paths</Link>
        <Link to="/employees">Employees</Link>
        <Link to="/">Reports</Link>
        <div className="dropdown">{props.name}</div>
      </div>
    </HeaderWrapper>
  )
}

const mapStateToProps = (state) => {
  return {
    name: state.user.firstName,
  }
}

export default connect(mapStateToProps, null)(Header)
