import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import OutsideClickHandler from 'react-outside-click-handler'

const Dropdown = (props) => {
  const [dropdown, setDropdown] = useState(false)

  // Uses props.isAdmin to determine what content to show in the menu

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
          <div className="absolute top-0 left-0 mt-16 bg-white shadow-md p-5 w-72 rounded-md">
            <p className="font-semibold">{props.fullName}</p>
            <p className="text-secGray border-b border-secGray pb-2">{props.email}</p>
            <div className="flex flex-col border-b border-secGray pb-2">
              <Link to="/profile" className="mt-2 inline-block hover:font-semibold self-start">
                Profile
              </Link>

              {/* Extra menu items if isAdmin */}
              {props.isAdmin && (
                <div className="flex flex-col">
                  <Link
                    to="/account"
                    className="mt-1 inline-block hover:font-semibold self-start text-red"
                  >
                    Account
                  </Link>
                  <Link
                    to="/account-users"
                    className="mt-1 inline-block hover:font-semibold self-start"
                  >
                    Account users
                  </Link>
                  <Link
                    to="/subscription"
                    className="mt-1 inline-block hover:font-semibold self-start text-red"
                  >
                    Subscription
                  </Link>
                  <Link
                    to="/billing"
                    className="mt-1 inline-block hover:font-semibold self-start text-red"
                  >
                    Billing info
                  </Link>
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
