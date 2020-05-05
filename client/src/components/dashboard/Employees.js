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
      const { data: employees } = await axios.get('/api/users')
      this.setState({ employees, loading: false })
    } catch (e) {
      console.log(e)
    }
  }

  renderEmployeeList = () => {
    if (this.state.employees.length === 0) return <p>You have no employees yet!</p>
    else return <EmployeeList employees={this.state.employees} />
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
        {(this.state.loading && <BoxLoader />) || this.renderEmployeeList()}
      </Container>
    )
  }
}

export default Employees
