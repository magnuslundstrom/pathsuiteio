import React from 'react'

import CreateSubgoalList from './create/CreateSubgoalList'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

class PathForm extends React.Component {
  constructor(props) {
    super(props)
    this.startDateRef = React.createRef()
    this.endDateRef = React.createRef()
    this.state = {
      pathTitle: '',
      user: '',
      responsible: '',
      category: '',
      startDate: Date.now(),
      endDate: Date.now(),
      goal: '',
      subgoals: [
        {
          subgoalTitle: '',
          subGoalType: '',
          subGoalLink: '',
          subgoalNote: '',
        },
      ],
    }
  }

  onInputChange = (input, value) => {
    this.setState({ [`${input}`]: value })
  }
  render() {
    return (
      <div>
        <form>
          <div className='bg-white rounded-lg shadow-md p-10'>
            <input
              placeholder='Add a title'
              className='input-border-gray text-xl font-semibold'
              type='text'
              onChange={(e) => this.onInputChange('pathTitle', e.target.value)}
              value={this.state.pathTitle}
            ></input>
            <div className='grid grid-cols-2 gap-5'>
              <input placeholder='Who owns this path' className='input-border-gray' type='text'></input>
              <input placeholder='Who is responsible for this path' className='input-border-gray' type='text'></input>
            </div>
            <div className='grid grid-cols-3 gap-5'>
              <input placeholder='Give the path a category' className='input-border-gray' type='text'></input>
              <p className='input-border-gray'>Pick start date</p>
              <p className='input-border-gray'>Pick end date</p>
            </div>
            <h2 className='mb-2'>Goal</h2>
            <input
              placeholder='Goal description: e.g. Become familiar with new software'
              className='input-border-gray'
              type='text'
            ></input>
            <h2 className='mb-2'>Subgoals</h2>
            <CreateSubgoalList subgoals={[...this.state.subgoals]} />
          </div>
          <div className='text-right'>
            <button className='btn-green btn px-10 py-2 mt-5'>Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

export default PathForm
