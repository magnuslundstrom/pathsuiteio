import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import OutsideClickHandler from 'react-outside-click-handler'

const AccountMenu = () => {
  const [displayAccount, setDisplayAccount] = useState(false)
  const [displaySubscription, setDisplaySubscription] = useState(false)
  return (
    <div className="flex mt-6 -mb-6">
      <NavLink to="/profile" className="mr-10 hover-underline" activeClassName="font-semibold">
        Profile
      </NavLink>
      <OutsideClickHandler onOutsideClick={() => setDisplayAccount(false)}>
        <div className="relative">
          <button
            className="mr-10 hover-underline"
            onClick={() => setDisplayAccount(!displayAccount)}
          >
            Account <i className="fas fa-angle-down ml-1"></i>
          </button>

          {displayAccount && (
            <div className="flex flex-col p-5 w-56 bg-white shadow-md rounded-lg absolute z-30 top-0 mt-8 left-0">
              <NavLink
                to="/account-information"
                className="hover:font-semibold"
                activeClassName="font-semibold"
              >
                Company information
              </NavLink>
              <NavLink
                to="/account-users"
                className="hover:font-semibold"
                activeClassName="font-semibold"
              >
                Account users
              </NavLink>
            </div>
          )}
        </div>
      </OutsideClickHandler>
      <OutsideClickHandler onOutsideClick={() => setDisplaySubscription(false)}>
        <div className="relative">
          <button
            className="hover-underline mr-10"
            onClick={() => setDisplaySubscription(!displaySubscription)}
          >
            Subscription <i className="fas fa-angle-down ml-1"></i>
          </button>
          {displaySubscription && (
            <div className="flex flex-col p-5 w-56 bg-white shadow-md rounded-lg absolute z-30 top-0 mt-8 left-0">
              <NavLink
                to="/dwqdwqdwq"
                className="hover:font-semibold text-red"
                activeClassName="font-semibold"
              >
                Subscription information
              </NavLink>
              <NavLink
                to="/account-users"
                className="hover:font-semibold text-red"
                activeClassName="font-semibold"
              >
                Billing information
              </NavLink>
            </div>
          )}
        </div>
      </OutsideClickHandler>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isAdmin: state.user.isAdmin,
  }
}

export default connect(mapStateToProps, null)(AccountMenu)
