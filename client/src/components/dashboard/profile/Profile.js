import React from 'react'
import Container from '../buildingBlocks/Container'
import { InnerContainer } from '../../styledComponents/smallComponents'

class Profile extends React.Component {
  render() {
    return (
      <Container>
        <h1 style={{ marginBottom: '0px', marginTop: '50px' }}>User Profile</h1>
        <InnerContainer>
          <h3>Update profile photo</h3>
          <form>
            <div style={{ position: 'relative' }}>
              <label style={{ zIndex: '1' }} htmlFor="image">
                Upload photo
              </label>
              <input
                type="file"
                style={{
                  opacity: '0',
                  width: '60px',
                  height: '20px',
                  cursor: 'pointer',
                  zIndex: 100,
                  position: 'absolute',
                  left: '0px',
                  top: '0px',
                }}
                name="image"
                id="image"
              />
            </div>
          </form>
        </InnerContainer>
      </Container>
    )
  }
}

export default Profile
