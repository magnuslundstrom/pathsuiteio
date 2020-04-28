import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import axios from 'axios'

import { logOut } from '../../../redux/actions/logInOut'
import { unsetUser } from '../../../redux/actions/unsetUser'

import OutsideClickHandler from 'react-outside-click-handler'
import logo from '../../../images/logo.png'

class Header extends React.Component {
  state = {
    dropdown: false,
  }

  logOut = async () => {
    await axios.get('/api/logout')
    this.props.unsetUser()
    this.props.logOut()
  }

  render() {
    return (
      <div className="shadow-md bg-white py-6 px-5">
        <div className="w-8/12 m-auto flex justify-between items-center">
          <Link to="/">
            <img src={logo} className="w-40" alt="logo" />
          </Link>
          <div className="flex items-center">
            <Link to="/paths" className="mr-8 hover-blue font-semibold">
              <i className="fas fa-chart-line"></i> Paths
            </Link>
            <Link to="/employees" className="mr-8 hover-blue font-semibold">
              <i className="fas fa-users"></i> Employees
            </Link>
            <Link to="/reports" className="mr-16 hover-blue font-semibold">
              <i className="fas fa-chart-pie"></i> Reports
            </Link>
            <Link to="#" className="btn btn-upgrade mr-8">
              Upgrade now
            </Link>
            {/* Dropdown */}
            <OutsideClickHandler onOutsideClick={() => this.setState({ dropdown: false })}>
              <div className="relative">
                <img
                  src={`data:image/png;base64, ${this.props.image}`}
                  alt="profile"
                  className="rounded-full w-12 h-12 cursor-pointer"
                  onClick={() => this.setState({ dropdown: !this.state.dropdown })}
                />
                {this.state.dropdown && (
                  <div className="absolute top-0 left-0 mt-16 bg-white shadow-md p-5 w-56 rounded-md">
                    <p className="font-semibold">{this.props.fullname}</p>
                    <p className="text-secGray border-b border-secGray pb-2">{this.props.email}</p>
                    <div className="flex flex-col border-b border-secGray pb-2">
                      <Link to="/profile" className="mt-2 inline-block hover-blue self-start">
                        User profile
                      </Link>
                      <Link to="/account" className="mt-1 inline-block hover-blue self-start">
                        Account
                      </Link>
                      <Link to="/account-users" className="mt-1 inline-block hover-blue self-start">
                        Account users
                      </Link>
                      <Link to="/subscription" className="mt-1 inline-block hover-blue self-start">
                        Subscription
                      </Link>
                      <Link to="/billing" className="mt-1 inline-block hover-blue self-start">
                        Billing info
                      </Link>
                    </div>
                    <button
                      className="bg-white hover-blue mt-2 border-0 cursor-pointer"
                      onClick={this.logOut}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </OutsideClickHandler>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    image: state.user.image,
    fullname: state.user.firstName + ' ' + state.user.lastName,
    email: state.user.email,
  }
}

export default connect(mapStateToProps, { logOut, unsetUser })(Header)
