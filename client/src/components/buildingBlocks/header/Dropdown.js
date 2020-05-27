import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

import OutsideClickHandler from 'react-outside-click-handler'

// The dropdown menu in the header that pops when profile image is clicked
// Uses props.isAdmin to determine what content to show in the menu
const Dropdown = (props) => {
  // Used to set and unset display of dropdown
  const [dropdown, setDropdown] = useState(false)

  return (
    <OutsideClickHandler onOutsideClick={() => setDropdown(false)}>
      <div className="relative z-20">
        {/* Profile image + click for dropdown */}
        <img
          src={`data:image/png;base64, ${props.image}`}
          alt="profile"
          className={`rounded-full w-12 h-12 cursor-pointer ${!props.isAdmin ? 'ml-10' : ''}`}
          onClick={() => setDropdown(!dropdown)}
        />
        {/* Dropdown component */}
        {dropdown && (
          <div className="absolute top-0 left-0 mt-16 bg-white shadow-md p-5 w-72 rounded-md -ml-48 xl:ml-0">
            <p className="font-semibold">{props.fullName}</p>
            <p className="text-secGray border-b border-secGray pb-2">{props.email}</p>
            <div className="flex flex-col border-b border-secGray pb-2">
              <NavLink
                to="/profile"
                className="mt-2 inline-block hover:font-semibold self-start"
                activeClassName="font-semibold"
              >
                Profile
              </NavLink>

              {/* Extra menu items if isAdmin */}
              {props.isAdmin && (
                <div className="flex flex-col">
                  <NavLink
                    to="/account-information"
                    className="mt-1 inline-block hover:font-semibold self-start"
                    activeClassName="font-semibold"
                  >
                    Company
                  </NavLink>

                  <a
                    href="https://pathsuite.webflow.io/support"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block hover:font-semibold self-start"
                  >
                    Support
                  </a>
                </div>
              )}
            </div>
            {/* Logout button */}
            <button
              className="bg-white hover:font-semibold mt-2 border-0 cursor-pointer"
              onClick={() => props.onLogOut()}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </OutsideClickHandler>
  )
}

export default Dropdown
