import React from 'react'

import { Link } from 'react-router-dom'

import axios from 'axios'

import Container from '../buildingBlocks/Container'
import BoxLoader from '../buildingBlocks/utils/ScreenLoader'

class AccountUsers extends React.Component {
  state = {
    loading: true,
    users: [],
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
            <td className="pt-2">{user.fullName}</td>
            <td className="pt-2">{user.email}</td>
            <td className="pt-2">{user.jobTitle}</td>
            <td className="pt-2">{user.isAdmin ? 'Admin' : 'Employee'}</td>
            <td className="pt-2">
              <button className="text-green" onClick={() => this.removeAccess(user._id, index)}>
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
        {!this.state.loading && (
          <div className="bg-white rounded-lg shadow-md p-10 mt-10">
            <div className="flex justify-between items-center">
              <h2>Manage users</h2>
              <Link to="/create-user">
                <i className="fas fa-plus text-xl font-semibold"></i>
              </Link>
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
          </div>
        )}
      </Container>
    )
  }
}

export default AccountUsers
