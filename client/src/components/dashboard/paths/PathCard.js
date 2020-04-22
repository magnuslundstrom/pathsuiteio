import React from 'react'
import { InnerContainer } from '../../styledComponents/smallComponents'
import userImg from '../../../images/anonym-user.jpg'
import ProgressBar from '../../utils/ProgressBar'
import { TransparentButton } from '../../utils/Buttons'
import progressCalc from '../../../utilFns/progressCalc'
import styled from 'styled-components'

class PathCard extends React.Component {
  state = {
    display: true,
  }
  render() {
    return (
      <InnerContainer>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex' }}>
            <div>
              <img
                src={userImg}
                style={{ width: '100px', height: 'auto', borderRadius: '50%', marginRight: '15px' }}
                alt="profile"
              />
            </div>

            <div>
              <h2 style={{ marginBottom: '10px', marginTop: '0px', fontSize: '26px' }}>
                {this.props.path.user.firstName} {this.props.path.user.lastName}
              </h2>
              <p style={{ marginTop: '0px' }}>{this.props.path.user.jobTitle}</p>
              <p>{this.props.path.title}</p>
            </div>
          </div>
          <div>
            <TransparentButton onClick={() => this.setState({ display: !this.state.display })}>
              <i className="fas fa-chevron-down"></i>
            </TransparentButton>
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <p style={{ marginRight: '20px' }}>
            <i className="fas fa-sticky-note"></i> {this.props.path.category}
          </p>
          <p>
            <i className="fas fa-user"></i> {this.props.path.responsible.firstName}{' '}
            {this.props.path.responsible.lastName}
          </p>
        </div>
        <ProgressBar progress={progressCalc(this.props.path.steps)}></ProgressBar>

        <ul style={{ paddingLeft: '0px' }}>
          {this.state.display &&
            this.props.path.steps.map((path, index) => {
              return (
                <div key={index} style={{ display: 'flex' }}>
                  <CompletedWrapper>
                    {(path.isCompleted && <i className="fas fa-check-circle"></i>) || (
                      <i className="far fa-circle"></i>
                    )}
                  </CompletedWrapper>
                  <IndividualStep>
                    <li>
                      <i className="far fa-bookmark"></i>
                      {path.goalTitle}
                    </li>
                    <li>{path.goalType}</li>
                    <li>{path.goalLink}</li>
                    <li>{path.goalNote}</li>
                  </IndividualStep>
                </div>
              )
            })}
        </ul>
      </InnerContainer>
    )
  }
}
const CompletedWrapper = styled.div`
  i {
    font-size: 36px;
  }
`

const IndividualStep = styled.ul`
  padding: 0px;
  margin-left: 15px;
  li {
    list-style-type: none;
  }
`

export default PathCard
