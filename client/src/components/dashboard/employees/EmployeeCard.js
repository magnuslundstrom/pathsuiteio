import React from 'react'
import { Link } from 'react-router-dom'
import { InnerContainer } from '../../styledComponents/smallComponents'

const EmployeeCard = (props) => {
  return (
    <InnerContainer>
      <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
        <img
          src={`data:image/png;base64, ${props.data.image}`}
          style={{ width: '100px', height: 'auto', borderRadius: '50%' }}
          alt="profile"
        />
        <h2 style={{ marginBottom: '0px', textAlign: 'center' }}>
          {props.data.firstName} {props.data.lastName}
        </h2>
        <p style={{ marginTop: '10px' }}>{props.data.jobTitle}</p>
        <p>
          <i className="fas fa-chart-line" style={{ marginRight: '5px' }}></i>{' '}
          {props.data.paths.length} active paths
        </p>
        <Link to={`/user?id=${props.data._id}`} style={{ fontWeight: '700' }}>
          View profile
        </Link>
      </div>
    </InnerContainer>
  )
}

export default EmployeeCard
