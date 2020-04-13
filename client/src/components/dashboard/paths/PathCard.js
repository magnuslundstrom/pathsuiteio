import React from 'react'
import { InnerContainer } from '../../styledComponents/smallComponents'
import userImg from '../../../images/anonym-user.jpg'
import ProgressBar from '../../utils/ProgressBar'

const PathCard = (props) => {
  return (
    <InnerContainer>
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
            {props.path.user.firstName} {props.path.user.lastName}
          </h2>
          <p style={{ marginTop: '0px' }}>{props.path.user.jobTitle}</p>
          <p>{props.path.title}</p>
        </div>
      </div>
      <ProgressBar progress={66}></ProgressBar>

      <ul>
        {props.path.steps.map((path, index) => {
          return (
            <div key={index}>
              {path.isCompleted}
              <li>{path.goalTitle}</li>
              <li>{path.goalType}</li>
              <li>{path.goalLink}</li>
              <li>{path.goalNote}</li>
            </div>
          )
        })}
      </ul>
    </InnerContainer>
  )
}

export default PathCard
