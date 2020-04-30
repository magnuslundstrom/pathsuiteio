import React from 'react'

import EmployeeCard from './EmployeeCard'

// Receives a fetched array of employees from Employees main component

const EmployeeList = (props) => {
  const renderEmployees = () => {
    if (props.employees.length === 0) {
      return <p>You have no employees yet!</p>
    } else {
      return props.employees.map((employee, index) => {
        return <EmployeeCard key={index} employee={employee} />
      })
    }
  }

  return <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-10">{renderEmployees()}</div>
}

export default EmployeeList
