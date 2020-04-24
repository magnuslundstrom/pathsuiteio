import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logOut } from '../../../redux/actions/logInOut'
import { unFetchUser } from '../../../redux/actions/fetchUser'
import Dropdown from './Dropdown'
import styled from 'styled-components'
import axios from 'axios'
import colors from '../../../styles/colors'
import general from '../../../styles/general'

import Logo from '../../utils/Logo'

const HeaderWrapper = styled.div`
  background-color: ${colors.white};
  padding: 30px 0px;
  box-shadow: ${general.headerBoxShadow};
  .headerWidth {
    max-width: 1300px;
    margin: 0px auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .navigation a {
    margin-left: 50px;
    color: ${colors.blue};
    display: flex;
    align-items: center;
    font-weight: 700;
  }
  .navigation a i {
    margin-right: 7.5px;
  }
`

class Header extends React.Component {
  state = {
    dropdown: false,
  }

  onImageClick = () => {
    this.setState({ dropdown: !this.state.dropdown })
  }
  outSideClick = () => {
    this.setState({ dropdown: false })
  }
  onLogOut = async () => {
    const res = await axios.get('api/logout')
    console.log(res.data.success)
    this.props.logOut()
    this.props.unFetchUser()
  }

  render() {
    return (
      <HeaderWrapper>
        <div className="headerWidth">
          <Logo dashboard />
          <div className="navigation" style={{ display: 'inline-flex', alignItems: 'center' }}>
            <Link to="/paths">
              <i className="fas fa-chart-line"></i> Paths
            </Link>
            {this.props.isAdmin && (
              <div style={{ display: 'flex' }}>
                <Link to="/employees">
                  <i className="fas fa-users"></i> Employees
                </Link>
                <Link to="/reports">
                  <i className="fas fa-chart-pie"></i> Reports
                </Link>
                <Link
                  to="/upgrade"
                  style={{
                    backgroundColor: colors.green,
                    padding: '10px 30px',
                    borderRadius: '5px',
                    color: colors.white,
                    fontWeight: 400,
                  }}
                >
                  Upgrade now
                </Link>
              </div>
            )}

            <Dropdown
              image={this.props.image}
              dropdown={this.state.dropdown}
              fullName={this.props.fullName}
              email={this.props.email}
              onClick={this.onImageClick}
              onOutsideClick={this.outSideClick}
              onLogOut={this.onLogOut}
              isAdmin={this.props.isAdmin}
            />
          </div>
        </div>
      </HeaderWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    image: state.user.image,
    fullName: state.user.firstName + ' ' + state.user.lastName,
    email: state.user.email,
    isAdmin: state.user.isAdmin,
  }
}

export default connect(mapStateToProps, { logOut, unFetchUser })(Header)
