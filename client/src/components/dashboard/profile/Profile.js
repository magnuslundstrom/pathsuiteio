import React from 'react'
import { connect } from 'react-redux'
import Container from '../buildingBlocks/Container'
import { InnerContainer } from '../../styledComponents/smallComponents'
import colors from '../../../styles/colors'

class Profile extends React.Component {
  state = {
    ...this.props.user,
  }
  render() {
    return (
      <Container>
        <h1 style={{ marginBottom: '0px', marginTop: '50px' }}>User Profile</h1>
        <InnerContainer>
          <h3>Update profile photo</h3>
          <form>
            <div>
              <div style={{ display: 'flex', minHeight: '130px', marginTop: '30px' }}>
                <img
                  src={(this.state.image && `data:image/png;base64, ${this.state.image}`) || ''}
                  style={{
                    borderRadius: '50%',
                    height: '100px',
                    width: '100px',
                    alignSelf: 'center',
                  }}
                />
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    marginLeft: '30px',
                  }}
                >
                  <h4 style={{ margin: '0px' }}>Upload Photo</h4>
                  <p style={{ margin: '0px' }}>Must be jpg, jpeg or png file</p>
                  <label
                    style={{
                      zIndex: '1',
                      backgroundColor: colors.green,
                      borderRadius: '5px',
                      padding: '10px 30px',
                      color: colors.white,
                      fontWeight: '700',
                      alignSelf: 'flex-start',
                      cursor: 'pointer',
                    }}
                    htmlFor="image"
                  >
                    Upload photo
                  </label>
                  <input
                    type="file"
                    style={{
                      display: 'none',
                    }}
                    name="image"
                    id="image"
                  />
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', marginTop: '30px' }}>
              <div>
                <label htmlFor="firstName" style={{ display: 'block' }}>
                  First name
                </label>
                <input
                  type="text"
                  value={this.state.firstName}
                  style={{ display: 'block' }}
                  id="firstName"
                ></input>

                <label htmlFor="lastName" style={{ display: 'block' }}>
                  Last name
                </label>
                <input
                  type="text"
                  value={this.state.lastName}
                  style={{ display: 'block' }}
                  id="lastName"
                ></input>

                <label htmlFor="jobTitle" style={{ display: 'block' }}>
                  Position
                </label>
                <input
                  type="text"
                  value={this.state.jobTitle}
                  style={{ display: 'block' }}
                  id="jobTitle"
                ></input>

                <label htmlFor="email" style={{ display: 'block' }}>
                  Email
                </label>
                <input
                  value={this.state.email}
                  style={{ display: 'block' }}
                  id="email"
                  type="text"
                ></input>
              </div>
              <div>
                <label htmlFor="currentPassword" style={{ display: 'block' }}>
                  Current password
                </label>
                <input style={{ display: 'block' }} id="currentPassword" type="password"></input>

                <label htmlFor="newPassword" style={{ display: 'block' }}>
                  New password
                </label>
                <input style={{ display: 'block' }} id="newPassword" type="password"></input>

                <label htmlFor="confirmNewPassword" style={{ display: 'block' }}>
                  Current password
                </label>
                <input style={{ display: 'block' }} id="confirmNewPassword" type="password"></input>
                <button>Submit update</button>
              </div>
            </div>
          </form>
        </InnerContainer>
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
