import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import Container from '../buildingBlocks/Container'

class Profile extends React.Component {
  state = {
    image: this.props.user.image,
    firstName: this.props.user.firstName,
    lastName: this.props.user.lastName,
    jobTitle: this.props.user.jobTitle,
    email: this.props.user.email,
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  }

  fetchNewPhoto = async (file) => {
    const form = new FormData()
    form.append('image', file)
    const { data: image } = await axios.post('api/temp-profile-image', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    this.setState({ image })
  }
  setOriginalPhoto = () => {
    document.querySelector('#image').value = ''
    this.setState({ image: this.props.user.image })
  }

  onSubmit = async (e) => {
    e.preventDefault()
    const form = new FormData()
    form.set('firstName', this.state.firstName)
    form.set('lastName', this.state.lastName)
    form.set('jobTitle', this.state.jobTitle)
    form.set('email', this.state.email)
    if (this.state.image !== this.props.user.image) {
      form.append('image', document.querySelector('#image').files[0])
    }
    if (this.state.currentPassword) form.set('currentPassword', this.state.currentPassword)
    if (this.state.newPassword) form.set('newPassword', this.state.newPassword)
    if (this.state.confirmNewPassword) form.set('confirmNewPassword', this.state.confirmNewPassword)

    const res = await axios.post('api/update-profile', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    if (res) {
      window.location.reload()
    }
  }

  onChangeHandler = (e, input) => {
    this.setState({ [`${input}`]: e.target.value })
  }

  render() {
    return (
      <Container>
        <h1>User profile</h1>
        <div className="bg-white shadow-md rounded-lg p-10 mt-10">
          <h3>Update profile photo</h3>
          <form onSubmit={this.onSubmit} id="form">
            <div className="flex items-between">
              <div className="relative">
                <img
                  src={`data:image/png;base64, ${this.state.image}`}
                  className="w-24 h-24 rounded-full mt-5"
                  alt="profile"
                />
                {this.state.image !== this.props.user.image && (
                  <button
                    className="absolute top-0 right-0 mt-2 ml-2"
                    onClick={this.setOriginalPhoto}
                  >
                    <i className="fas fa-times-circle"></i>
                  </button>
                )}
              </div>
              <div className="mt-5 ml-5 relative">
                <p className="font-semibold">Upload photo</p>
                <p>.jpg, .jpeg, .png</p>
                <div className="relative mt-4">
                  <label
                    htmlFor="image"
                    className="bg-green font-semibold text-white px-4 py-2 rounded-lg cursor-pointer"
                  >
                    Upload photo
                  </label>
                  <input
                    type="file"
                    className="hidden"
                    name="image"
                    id="image"
                    onChange={(e) => this.fetchNewPhoto(e.target.files[0])}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-10 mt-10">
              {/* BASIC INFORMATION */}
              <div className="flex flex-col">
                <h3 className="mb-5">Basic information</h3>
                <label htmlFor="firstName" className="font-semibold">
                  First name
                </label>
                <input
                  className="input-border-gray"
                  type="text"
                  value={this.state.firstName}
                  id="firstName"
                  onChange={(e) => this.onChangeHandler(e, 'firstName')}
                />

                <label htmlFor="lastName" className="font-semibold">
                  Last name
                </label>
                <input
                  type="text"
                  className="input-border-gray"
                  value={this.state.lastName}
                  id="lastName"
                  onChange={(e) => this.onChangeHandler(e, 'lastName')}
                />

                <label htmlFor="jobTitle" className="font-semibold">
                  Position
                </label>
                <input
                  type="text"
                  className="input-border-gray"
                  value={this.state.jobTitle}
                  id="jobTitle"
                  onChange={(e) => this.onChangeHandler(e, 'jobTitle')}
                />

                <label htmlFor="email" className="font-semibold">
                  Email
                </label>
                <input
                  className="input-border-gray"
                  value={this.state.email}
                  id="email"
                  type="text"
                  onChange={(e) => this.onChangeHandler(e, 'email')}
                />
              </div>
              {/* BASIC INFORMATION END */}

              {/* PASSWORD */}
              <div className="flex flex-col">
                <h3 className="mb-5">Change password</h3>
                <label htmlFor="currentPassword" className="font-semibold">
                  Current password
                </label>
                <input
                  className="input-border-gray"
                  id="currentPassword"
                  type="password"
                  onChange={(e) => this.onChangeHandler(e, 'currentPassword')}
                  autoComplete="off"
                />

                <label htmlFor="newPassword" className="font-semibold">
                  New password
                </label>
                <input
                  className="input-border-gray"
                  id="newPassword"
                  type="password"
                  onChange={(e) => this.onChangeHandler(e, 'newPassword')}
                  autoComplete="off"
                />

                <label htmlFor="confirmNewPassword" className="font-semibold">
                  Confirm new password
                </label>
                <input
                  className="input-border-gray"
                  id="confirmNewPassword"
                  type="password"
                  onChange={(e) => this.onChangeHandler(e, 'confirmNewPassword')}
                  autoComplete="off"
                />
                <button className="btn self-start">Submit updates</button>
              </div>
              {/* PASSWORD END */}
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
