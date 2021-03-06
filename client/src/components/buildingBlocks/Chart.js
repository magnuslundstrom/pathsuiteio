import React from 'react'
import { Bar } from 'react-chartjs-2'

// Represents Chart Component used on "/dashboard"
class Chart extends React.Component {
  days = ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.']
  months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.']

  render() {
    return (
      <div className='bg-white h-84'>
        <Bar
          data={{
            labels: this.props.period === 'week' ? [...this.days] : [...this.months],
            datasets: [
              {
                label: 'Completed goals',
                data: this.props.data,
                backgroundColor: '#46cc8c',
                hoverBackgroundColor: '#46cc8c',
                barThickness: 50,
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            scales: {
              xAxes: [
                {
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
                    suggestedMax: this.props.suggestedMax,
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
          }}
        />
      </div>
    )
  }
}

export default Chart
