import React from 'react'
import { Bar } from 'react-chartjs-2'
import findHighestNumber from '../../utilsFn/findHighestNumber'

class Chart extends React.Component {
  state = {
    chartData: {
      labels: ['Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.', 'Sun.'],
      datasets: [
        {
          label: 'Completed tasks',
          data: [...this.props.data],
          backgroundColor: '#46cc8c',
          hoverBackgroundColor: '#46cc8c',
        },
      ],
    },
  }

  mySuggestedMax = findHighestNumber(this.state.chartData.datasets[0].data)

  render() {
    return (
      <div className="bg-white h-84">
        <Bar data={this.state.chartData} options={{ ...chartOptions(this.mySuggestedMax) }} />
      </div>
    )
  }
}

// Chart options
const chartOptions = (mySuggestedMax) => {
  return {
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          barThickness: 50,
          ticks: {
            fontColor: '#2f3756',
            fontFamily: 'Inter',
            fontSize: 13,
            fontStyle: 600,
          },
          gridLines: {
            color: '#edf1f4',
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            fontColor: '#a9a9a9',
            fontFamily: 'Inter',
            beginAtZero: true,
            suggestedMax: mySuggestedMax + 10,
          },
          gridLines: {
            color: '#edf1f4',
          },
        },
      ],
    },
    legend: {
      display: false,
    },
  }
}

export default Chart
