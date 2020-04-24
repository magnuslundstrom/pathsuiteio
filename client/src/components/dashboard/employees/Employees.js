import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Container from '../buildingBlocks/Container'
import EmployeeCard from './EmployeeCard'

class Employees extends React.Component {
  state = {
    isLoaded: false,
    loading: true,
    employees: [],
  }

  async componentDidMount() {
    this.setState({ isLoaded: true })
    const users = await axios.get('api/users')
    if (this.state.isLoaded) {
      this.setState({ employees: users.data, loading: false })
    }
  }

  renderEmployees = () => {
    return this.state.employees.map((el, index) => {
      return (
        <div key={index}>
          <div>
            <EmployeeCard data={this.state.employees[index]} />
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <Container>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '50px',
            alignItems: 'center',
          }}
        >
          <h1 style={{ marginBottom: '0px' }}>Employees</h1>
          <Link to="/create-user">
            <i className="fas fa-plus" style={{ fontSize: '20px' }}></i>
          </Link>
        </div>

        {this.state.loading ? (
          <p>Loading...</p>
        ) : (
          (this.state.employees.length > 0 && (
            <div
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gridGap: '30px' }}
            >
              {this.renderEmployees()}
            </div>
          )) || <p>You have no employees yet</p>
        )}
      </Container>
    )
  }
}

export default Employees
