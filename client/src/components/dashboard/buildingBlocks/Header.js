import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../../styles/colors'

import Logo from '../../utils/Logo'

const HeaderWrapper = styled.div`
  background-color: ${colors.white};
  padding: 30px 0px;
  -webkit-box-shadow: 0px 5px 5px 0px rgba(230, 230, 230, 1);
  -moz-box-shadow: 0px 5px 5px 0px rgba(230, 230, 230, 1);
  box-shadow: 0px 5px 5px 0px rgba(230, 230, 230, 1);

  .headerWidth {
    max-width: 1300px;
    margin: 0px auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .navigation a {
    margin-left: 30px;
  }

  .dropdown {
    display: inline;
    margin-left: 30px;
  }
`

const Header = (props) => {
  return (
    <HeaderWrapper>
      <div className="headerWidth">
        <Logo dashboard />
        <div className="navigation">
          <Link to="/paths">Paths</Link>
          <Link to="/employees">Employees</Link>
          <Link to="/">Reports</Link>
          <div className="dropdown">{props.name}</div>
        </div>
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
