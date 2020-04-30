import React from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'

import Container from '../buildingBlocks/Container'
import EmployeeList from '../buildingBlocks/employee/EmployeeList'
import BoxLoader from '../buildingBlocks/utils/ScreenLoader'

class Employees extends React.Component {
  state = {
    loading: true,
    employees: [],
  }

  async componentDidMount() {
    try {
      const users = await axios.get('/api/users')
      this.setState({ employees: users.data, loading: false })
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    return (
      <Container>
        <div className="flex justify-between items-center">
          <h1>Employees</h1>
          <Link to="/create-user">
            <i className="fas fa-plus text-2xl font-semibold"></i>
          </Link>
        </div>
        {(this.state.loading && <BoxLoader />) || <EmployeeList employees={this.state.employees} />}
      </Container>
    )
  }
}

export default Employees
