import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { setSuccessMessage } from '../../../redux/actions/successMessage'

// Represents the overlay thats pops when you want to invite a new user to the app
class InviteOverlay extends React.Component {
  state = {
    email: '',
    isAdmin: false,
  }

  handleCheckboxChange = (target) => {
    this.setState({ isAdmin: target })
  }

  // Reaches to API endpoint that sends email
  onInviteClick = async () => {
    try {
      await axios.post('/api/invite-user', {
        ...this.state,
      })
      this.props.onClose()
      this.props.setSuccessMessage('User was successfully invited!')
    } catch (e) {
      console.log(e)
    }
  }

  // Mark up
  render() {
    return (
      <div className="absolute top-0 left-0 w-full min-h-screen bg-transparent-gray flex justify-center items-center">
        <div className="bg-white rounded-lg shadow-md p-10 w-1/3">
          <div className="flex justify-between">
            <div>
              <h2 className="mb-3">Add new user</h2>
              <p className="mb-3">
                The invited user will receive an e-mail with a sign-up link. The employee
                information will be entered by the employee.
              </p>
            </div>
            <div>
              <button onClick={this.props.onClose}>
                <i className="fas fa-times hover-spin"></i>
              </button>
            </div>
          </div>

          <label htmlFor="email" className="font-semibold mb-2 block">
            E-mail
          </label>
          <input
            id="email"
            placeholder="Users email"
            className="auth-input w-full"
            onChange={(e) => this.setState({ email: e.target.value })}
          ></input>
          <div className="flex items-center">
            <label htmlFor="admin" className="cursor-pointer mr-2">
              Admin
            </label>
            <input
              type="checkbox"
              id="admin"
              checked={this.state.isAdmin}
              onChange={(e) => this.handleCheckboxChange(e.target.checked)}
            />
          </div>
          <button className="btn-green btn py-2 px-10 block mt-5" onClick={this.onInviteClick}>
            Send invitation
          </button>
        </div>
      </div>
    )
  }
}

export default connect(null, { setSuccessMessage })(InviteOverlay)
