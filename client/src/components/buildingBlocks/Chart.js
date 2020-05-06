import React from 'react'
import { Bar } from 'react-chartjs-2'

class Chart extends React.Component {
  state = {
    chartData: {
      labels: ['Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.', 'Sun.'],
      datasets: [{ label: 'Completed tasks', data: [25, 23, 4, 0, 3, 5, 1] }],
    },
  }

  render() {
    return (
      <div className="bg-white p-10 h-84">
        <Bar data={this.state.chartData} options={{ maintainAspectRatio: false }} />
      </div>
    )
  }
}

export default Chart
