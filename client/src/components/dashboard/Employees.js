import React from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'

import Container from '../buildingBlocks/Container'
import EmployeeCard from '../buildingBlocks/utils/EmployeeCard'
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

  renderEmployees = () => {
    if (this.state.employees.length === 0) {
      return <p>You have no employees yet!</p>
    } else {
      return this.state.employees.map((employee, index) => {
        return <EmployeeCard key={index} employee={employee} />
      })
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
        {(this.state.loading && <BoxLoader />) || (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
            {this.renderEmployees()}
          </div>
        )}
      </Container>
    )
  }
}

export default Employees
