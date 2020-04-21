import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import axios from 'axios'
import Container from '../buildingBlocks/Container'
import { InnerContainer } from '../../styledComponents/smallComponents'
import { Button } from '../../utils/Buttons'
import colors from '../../../styles/colors'
import Limitations from '../../utils/Limitations'

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
    showLimitations: true,
  }

  onChangeHandler = (e, input) => {
    this.setState({ [`${input}`]: e.target.value })
  }

  fetchNewPhoto = async (file) => {
    const form = new FormData()
    form.append('image', file)
    const res = await axios.post('api/temp-profile-image', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    this.setState({ image: res.data })
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

  render() {
    return (
      <Container>
        {this.state.showLimitations && (
          <Limitations
            limitations={['Errors are not being displayed properly.']}
            onClick={() => this.setState({ showLimitations: false })}
          />
        )}
        <h1 style={{ marginBottom: '0px', marginTop: '50px' }}>User Profile</h1>
        <InnerContainer>
          <h3>Update profile photo</h3>
          <form onSubmit={this.onSubmit} id="form">
            <div>
              <ImageContainer>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <ProfileImage
                    src={this.state.image && `data:image/png;base64, ${this.state.image}`}
                  />
                  {this.state.image !== this.props.user.image && (
                    <button
                      style={{
                        border: '0px',
                        position: 'absolute',
                        top: '-10px',
                        right: '-10px',
                        backgroundColor: 'transparent',
                        cursor: 'pointer',
                      }}
                      onClick={this.setOriginalPhoto}
                    >
                      <i className="fas fa-times-circle"></i>
                    </button>
                  )}
                </div>

                <ProfileImgInfo>
                  <h4 style={{ margin: '0px' }}>Upload Photo</h4>
                  <p style={{ margin: '0px' }}>.jpg, .jpeg or .png</p>
                  <UploadProfileImgBtn htmlFor="image">Upload photo</UploadProfileImgBtn>
                  <input
                    type="file"
                    style={{
                      display: 'none',
                    }}
                    name="image"
                    id="image"
                    onChange={(e) => this.fetchNewPhoto(e.target.files[0])}
                  />
                </ProfileImgInfo>
              </ImageContainer>
            </div>
            <div style={{ display: 'flex', marginTop: '30px' }}>
              <div style={{ width: '100%', marginRight: '50px' }}>
                <h3>Basic information</h3>
                <UpdatedLabel htmlFor="firstName">First name</UpdatedLabel>
                <UpdatedInput
                  type="text"
                  value={this.state.firstName}
                  id="firstName"
                  onChange={(e) => this.onChangeHandler(e, 'firstName')}
                />

                <UpdatedLabel htmlFor="lastName">Last name</UpdatedLabel>
                <UpdatedInput
                  type="text"
                  value={this.state.lastName}
                  id="lastName"
                  onChange={(e) => this.onChangeHandler(e, 'lastName')}
                />

                <UpdatedLabel htmlFor="jobTitle">Position</UpdatedLabel>
                <UpdatedInput
                  type="text"
                  value={this.state.jobTitle}
                  id="jobTitle"
                  onChange={(e) => this.onChangeHandler(e, 'jobTitle')}
                />

                <UpdatedLabel htmlFor="email">Email</UpdatedLabel>
                <UpdatedInput
                  value={this.state.email}
                  id="email"
                  type="text"
                  onChange={(e) => this.onChangeHandler(e, 'email')}
                />
              </div>
              <div style={{ width: '100%' }}>
                <h3>Change password</h3>
                <UpdatedLabel htmlFor="currentPassword">Current password</UpdatedLabel>
                <UpdatedInput
                  id="currentPassword"
                  type="password"
                  onChange={(e) => this.onChangeHandler(e, 'currentPassword')}
                />

                <UpdatedLabel htmlFor="newPassword">New password</UpdatedLabel>
                <UpdatedInput
                  id="newPassword"
                  type="password"
                  onChange={(e) => this.onChangeHandler(e, 'newPassword')}
                />

                <UpdatedLabel htmlFor="confirmNewPassword">Confirm new password</UpdatedLabel>
                <UpdatedInput
                  id="confirmNewPassword"
                  type="password"
                  onChange={(e) => this.onChangeHandler(e, 'confirmNewPassword')}
                />
                <Button style={{ width: 'unset', marginTop: '0px' }}>Submit updates</Button>
              </div>
            </div>
          </form>
          <div style={{ marginBottom: '50px' }}>
            <h3 style={{ marginBottom: '5px' }}>Profile connections</h3>
            <div style={{ display: 'flex' }}>
              <div style={{ marginRight: '50px' }}>
                <p style={{ fontWeight: '700' }}>Company</p>
                <p>{this.props.company && this.props.company['companyName']}</p>
              </div>
              <div>
                <p style={{ fontWeight: '700' }}>Role</p>
                <p>{this.props.user.isAdmin ? 'Admin' : 'Employee'}</p>
              </div>
            </div>
          </div>
        </InnerContainer>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    company: state.user.company,
  }
}

export default connect(mapStateToProps, null)(Profile)

const ImageContainer = styled.div`
  display: flex;
  min-height: 130px;
  margin-top: 30px;
`
const ProfileImage = styled.img`
  border-radius: 50%;
  height: 100px;
  width: 100px;
  align-self: center;
`
const ProfileImgInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  margin-left: 30px;
`
const UploadProfileImgBtn = styled.label`
  z-index: 1;
  background-color: ${colors.green};
  border-radius: 5px;
  padding: 10px 30px;
  color: ${colors.white};
  font-weight: 700;
  align-self: flex-start;
  cursor: pointer;
`

const UpdatedInput = styled.input`
  display: block;
  width: 100%;
  border: 1px solid #a9a9a9;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 15px;
`

const UpdatedLabel = styled.label`
  margin-bottom: 5px;
  font-weight: 700;
  display: block;
`
