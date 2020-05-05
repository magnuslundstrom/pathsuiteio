import React from 'react'

import EmployeeCard from './EmployeeCard'

// Receives a fetched array of employees from Employees main component and returns a card for each

const EmployeeList = (props) => {
  const renderEmployees = () => {
    return props.employees.map((employee, index) => {
      return <EmployeeCard key={index} employee={employee} />
    })
  }

  return <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-10">{renderEmployees()}</div>
}

export default EmployeeList
