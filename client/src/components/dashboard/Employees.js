import React from 'react'
import axios from 'axios'
import Container from '../buildingBlocks/Container'
import EmployeeList from '../buildingBlocks/employee/EmployeeList'
import BoxLoader from '../buildingBlocks/utils/ScreenLoader'
import InviteOverlay from '../buildingBlocks/employee/InviteOverlay'

// Represents "/employees"
class Employees extends React.Component {
  state = {
    loading: true,
    employees: [],
    displayInvite: false,
  }
  // fetch employees on load
  async componentDidMount() {
    try {
      const { data: employees } = await axios.get('/api/users')
      this.setState({ employees, loading: false })
    } catch (e) {
      console.log(e)
    }
  }

  // returns employee list if length of state.employees is bigger than 0
  renderEmployeeList = () => {
    if (this.state.employees.length === 0)
      return <p className="mt-10">You have no employees yet!</p>
    else return <EmployeeList employees={this.state.employees} />
  }

  render() {
    return (
      <Container>
        <section className="flex justify-between items-center">
          <h1>Employees</h1>
          <button onClick={() => this.setState({ displayInvite: true })}>
            <i className="fas fa-plus text-2xl font-semibold hover-spin"></i>
          </button>
        </section>
        {(this.state.loading && <BoxLoader />) || (
          <section>
            {this.state.displayInvite && (
              <InviteOverlay onClose={() => this.setState({ displayInvite: false })} />
            )}
            {this.renderEmployeeList()}
          </section>
        )}
      </Container>
    )
  }
}

export default Employees
