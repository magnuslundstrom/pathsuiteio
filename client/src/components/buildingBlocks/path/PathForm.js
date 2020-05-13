import React from 'react'

import CreateSubtaskList from './create/CreateSubtaskList'
import Calender from './create/Calender'
import { insertNewSubtask, removeSubtask } from './create/fns/helpers'
import Editor from './create/Editor'

class PathForm extends React.Component {
  constructor(props) {
    super(props)
    this.startDateRef = React.createRef()
    this.endDateRef = React.createRef()

    this.state = {
      pathTitle: '',
      user: '',
      userSearch: '',
      userSearchResult: [],
      responsible: '',
      responsibleSearch: '',
      responsibleSearchResult: [],
      category: '',
      startDate: null,
      endDate: null,
      goal: '',
      subtasks: [
        {
          subtaskTitle: '',
          subtaskType: '',
          subtaskLink: '',
          subtaskNote: '',
        },
      ],
    }
  }

  onInputChange = (input, value) => {
    this.setState({ [`${input}`]: value })
  }

  updateDate = (date, input) => {
    this.setState({ [`${input}`]: date })
  }

  addSubtask = () => {
    this.setState({ subtasks: [...this.state.subtasks, insertNewSubtask()] })
  }

  deleteSubtask = (index) => {
    this.setState({ subtasks: removeSubtask([...this.state.subtasks], index) })
  }

  onSubmit = (e) => {
    e.preventDefault()
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="bg-white rounded-lg shadow-md p-10">
            {/* Title */}
            <input
              placeholder="Add a title"
              className="input-border-gray text-xl font-semibold mb-5"
              type="text"
              onChange={(e) => this.onInputChange('pathTitle', e.target.value)}
              value={this.state.pathTitle}
            ></input>
            <div className="grid grid-cols-2 gap-5 mb-5">
              {/* Users */}
              <div className="flex items-center">
                {/* Owner */}
                <i className="far fa-user mr-3"></i>{' '}
                <input
                  placeholder="Who owns this path"
                  className="input-border-gray"
                  type="text"
                ></input>
              </div>
              <div className="flex items-center">
                {/* Responsible */}
                <i className="far fa-user mr-3"></i>{' '}
                <input
                  placeholder="Who is responsible for this path"
                  className="input-border-gray"
                  type="text"
                ></input>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-5 mb-5">
              {/* category, dates */}
              <div className="flex items-center">
                {/* category */}
                <i className="far fa-sticky-note mr-2"></i>{' '}
                <input
                  placeholder="Give the path a category"
                  className="input-border-gray"
                  type="text"
                ></input>
              </div>
              {/* startDate ÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ*/}
              <Calender
                buttonText="Pick start date"
                date={this.state.startDate}
                onClick={() => this.setState({ startDate: Date.now() })}
                updateDate={(date) => this.updateDate(date, 'startDate')}
              />
              {/* endDate */}
              <Calender
                buttonText="Pick end date"
                date={this.state.endDate}
                onClick={() =>
                  this.setState({
                    endDate: this.state.startDate ? this.state.startDate : Date.now(),
                  })
                }
                updateDate={(date) => this.updateDate(date, 'endDate')}
              />
            </div>
            <h2 className="mb-2">Goal</h2>
            <input
              placeholder="Goal description: e.g. Become familiar with new software"
              className="input-border-gray mb-5"
              type="text"
            ></input>
            <Editor />
            <h2 className="mb-2">Subtasks</h2>
            <CreateSubtaskList
              subtasks={[...this.state.subtasks]}
              onDelete={(index) => this.deleteSubtask(index)}
            />
            <button className="font-semibold text-base mt-5" onClick={this.addSubtask}>
              <i className="fas fa-plus mr-2"></i> Add new subtask
            </button>
          </div>
          <div className="text-right">
            <button className="btn-green btn px-10 py-2 mt-5">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

export default PathForm
