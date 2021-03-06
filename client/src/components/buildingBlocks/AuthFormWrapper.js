import React from 'react'
import logo from '../../images/logo.png'
import { Link } from 'react-router-dom'

// Wraps the forms @authorization steps before dashboard
// Returns logo + dont have account or already have depending on props passed from components in /components/auth

const AuthFormWrapper = (props) => {
  return (
    <div className="min-h-screen flex flex-col items-center pt-24 pb-20">
      <Link to="/">
        <img src={logo} alt="logo" className="w-48 mb-10"></img>
      </Link>
      <div className="text-center bg-white shadow-md rounded-lg p-12 w-96">
        <h1 className="mb-6">{props.header}</h1>
        {props.children}
      </div>
      {props.logIn && (
        <p className="mt-4">
          Dont have an account yet?{' '}
          <Link to="/sign-up" className="hover-green">
            Sign up!
          </Link>
        </p>
      )}
      {props.signUp && (
        <p className="mt-4">
          Already have an account?{' '}
          <Link to="/" className="hover-green">
            Sign in!
          </Link>
        </p>
      )}
    </div>
  )
}

export default AuthFormWrapper
