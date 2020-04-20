import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import OutsideClickHandler from 'react-outside-click-handler'
import colors from '../../../styles/colors'
import general from '../../../styles/general'

const DropdownWrapper = styled.div`
  background-color: ${colors.white};
  box-shadow: ${general.boxShadow};
  position: absolute;
  top: 130%;
  left: -200px;
  padding: 30px;
  font-size: 14px;
  width: 240px;

  a {
    margin-left: 0px !important;
    font-weight: 400 !important;
    margin-bottom: 5px;
  }
  a:first-of-type {
    margin-top: 10px;
  }
`

const Dropdown = (props) => {
  const renderProfileImage = () => {
    return props.image ? `data:image/png;base64, ${props.image}` : ''
  }

  return (
    <OutsideClickHandler onOutsideClick={props.onOutsideClick}>
      <div
        style={{ position: 'relative', marginLeft: '25px', display: 'flex', alignItems: 'center' }}
        className="dropdown"
      >
        {props.image && (
          <img
            src={renderProfileImage()}
            onClick={props.onClick}
            style={{
              width: '40px',
              height: 'auto',
              cursor: 'pointer',
              borderRadius: '50%',
            }}
            alt="profile"
          />
        )}
        {props.dropdown && (
          <DropdownWrapper>
            <div style={{ borderBottom: `1px solid ${colors.gray}` }}>
              <p style={{ marginBottom: '5px', fontWeight: '700' }}>{props.fullName}</p>
              <p style={{ fontSize: '14px', color: '#a9a9a9', marginTop: '5px' }}>{props.email}</p>
            </div>
            <div style={{ borderBottom: `1px solid ${colors.gray}` }}>
              <Link to="/profile">User profile</Link>
              <Link to="/account" style={{ marginBottom: '10px' }}>
                Account
              </Link>
              <Link to="/account-users" style={{ marginBottom: '10px' }}>
                Account Users
              </Link>
            </div>
            <button
              onClick={props.onLogOut}
              style={{
                backgroundColor: colors.white,
                border: '0px',
                marginTop: '10px',
                padding: '0px',
                cursor: 'pointer',
              }}
            >
              Log out
            </button>
          </DropdownWrapper>
        )}
      </div>
    </OutsideClickHandler>
  )
}

export default Dropdown
