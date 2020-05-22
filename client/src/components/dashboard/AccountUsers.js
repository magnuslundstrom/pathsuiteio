import React from 'react'

import AccountMenu from '../buildingBlocks/account/AccountMenu'

import axios from 'axios'

import Container from '../buildingBlocks/Container'
import BoxLoader from '../buildingBlocks/utils/ScreenLoader'
import InviteOverlay from '../buildingBlocks/employee/InviteOverlay'

class AccountUsers extends React.Component {
  state = {
    loading: true,
    users: [],
    displayInvite: false,
  }

  async componentDidMount() {
    try {
      const { data: users } = await axios.get('/api/all-users')
      this.setState({ users, loading: false })
    } catch (e) {
      console.log(e)
    }
  }

  removeAccess = async (id, index) => {
    const res = await axios.post(`/api/delete-user`, {
      userId: id,
    })
    if (res) {
      const newUserArr = [...this.state.users]
      newUserArr.splice(index, 1)
      this.setState({ users: newUserArr })
    }
  }

  renderUsers = () => {
    if (!this.state.loading) {
      return this.state.users.map((user, index) => {
        return (
          <tr key={index}>
            <td className="pt-2">
              {user.firstName} {user.lastName}
            </td>
            <td className="pt-2">{user.email}</td>
            <td className="pt-2">{user.jobTitle}</td>
            <td className="pt-2">{user.isAdmin ? 'Admin' : 'Employee'}</td>
            <td className="pt-2">
              <button
                className="text-green hover:font-semibold"
                onClick={() => this.removeAccess(user._id, index)}
              >
                Remove access
              </button>
            </td>
          </tr>
        )
      })
    }
  }

  render() {
    return (
      <Container>
        <h1>Account users</h1>
        <AccountMenu />
        {!this.state.loading && (
          <div className="bg-white rounded-lg shadow-md p-10 mt-10">
            <div className="flex justify-between items-center">
              <h2>Manage users</h2>
              <button onClick={() => this.setState({ displayInvite: true })}>
                <i className="fas fa-plus text-xl font-semibold hover-spin"></i>
              </button>
            </div>
            {this.state.loading && <BoxLoader />}

            <table className="w-full mt-8">
              <thead className="border-b-2 border-gray pb-2 text-left">
                <tr>
                  <th className="font-semibold w-1/5 pb-2">Name</th>
                  <th className="font-semibold w-1/5 pb-2">E-mail</th>
                  <th className="font-semibold w-1/5 pb-2">Position</th>
                  <th className="font-semibold w-1/5 pb-2">Role</th>
                  <th className="font-semibold w-1/5 pb-2">Remove</th>
                </tr>
              </thead>
              <tbody>{this.renderUsers()}</tbody>
            </table>
            {this.state.displayInvite && (
              <InviteOverlay onClose={() => this.setState({ displayInvite: false })} />
            )}
          </div>
        )}
      </Container>
    )
  }
}

export default AccountUsers
