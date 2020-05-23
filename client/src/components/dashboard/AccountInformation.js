import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import Container from '../buildingBlocks/Container'
import AccountMenu from '../buildingBlocks/account/AccountMenu'

class Profile extends React.Component {
  state = {
    companyName: '',
    companyEmail: '',
    companyAddress: '',
    companyPhone: '',
  }

  onSubmit = async (e) => {}

  onChangeHandler = (e, input) => {
    this.setState({ [`${input}`]: e.target.value })
  }

  async componentDidMount() {
    const { data: res } = await axios.get('/api/account-information')
    this.setState({ ...res })
  }

  render() {
    return (
      <Container>
        <h1>Account information</h1>
        <AccountMenu />
        <div className="bg-white shadow-md rounded-lg p-10 mt-10">
          <form onSubmit={this.onSubmit} id="form">
            <div className="grid grid-cols-2 gap-10">
              {/* BASIC INFORMATION */}
              <div className="flex flex-col">
                <h3 className="mb-5">Basic information</h3>

                <label htmlFor="companyName" className="font-semibold">
                  Company
                </label>
                <input
                  type="text"
                  className="auth-input"
                  value={this.state.companyName}
                  id="companyName"
                  onChange={(e) => this.onChangeHandler(e, 'companyName')}
                />

                <label htmlFor="companyAddress" className="font-semibold">
                  Address
                </label>
                <input
                  type="text"
                  className="auth-input"
                  value={this.state.jobTitle}
                  id="companyAddress"
                  onChange={(e) => this.onChangeHandler(e, 'companyAddress')}
                />

                <label htmlFor="email" className="font-semibold">
                  Email
                </label>
                <input
                  className="auth-input"
                  value={this.state.email}
                  id="email"
                  type="text"
                  onChange={(e) => this.onChangeHandler(e, 'email')}
                />
                <label htmlFor="email" className="font-semibold">
                  Phone
                </label>
                <input
                  className="auth-input"
                  value={this.state.email}
                  id="email"
                  type="text"
                  onChange={(e) => this.onChangeHandler(e, 'email')}
                />
              </div>
              {/* BASIC INFORMATION END */}

              {/* DETAILS */}
              <div className="flex flex-col">
                <h3 className="mb-5">Details</h3>
                <label htmlFor="timezone" className="font-semibold">
                  Timezone
                </label>
                <select id="timezone" className="auth-input">
                  <option>GMT +1</option>
                  <option>GMT +2</option>
                  <option>GMT +3</option>
                  <option>GMT +4</option>
                </select>

                <label htmlFor="timezone" className="font-semibold">
                  Date/time format
                </label>
                <select id="timezone" className="auth-input">
                  <option>Mm/dd/yyyy 24 hours</option>
                  <option>Mm/dd/yyyy 12 hours</option>
                  <option>Mm/yyyy 24 hours</option>
                  <option>Mm/yyyy 12 hours</option>
                </select>

                <button className="btn btn-green px-5 py-2 self-start">Submit updates</button>
              </div>
              {/* DETAILS END END */}
            </div>
          </form>
        </div>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps, null)(Profile)
