import React from 'react'

import CreateSubtaskList from './create/CreateSubtaskList'
import Calender from './create/Calender'
import { insertNewSubtask, removeSubtask } from './create/fns/helpers'
import SearchField from './create/SearchField'

// PROPS: edit=true/false onSubmit recieves form obj
// Pathform is ment to be used on /create-path /edit-path
// Here it collects all the data and jsx relevant to the form with the big goal og make CreatePath component smaller
// must have edit props, if edit show progress bar & fetch the path data

class PathForm extends React.Component {
  constructor(props) {
    super(props)
    this.startDateRef = React.createRef()
    this.endDateRef = React.createRef()
    this.state = { ...this.props.state }
  }

  onInputChange = (value, input) => {
    this.setState({ form: { ...this.state.form, [`${input}`]: value } })
  }

  addSubtask = () => {
    this.setState({
      form: { ...this.state.form, subtasks: [...this.state.form.subtasks, insertNewSubtask()] },
    })
  }

  deleteSubtask = (index) => {
    this.setState({
      form: { ...this.state.form, subtasks: removeSubtask(this.state.form.subtasks, index) },
    })
  }

  onSubtaskChange = (index, property, target) => {
    const currentState = [...this.state.form.subtasks]
    currentState[index][property] = target
    this.setState({ form: { ...this.state.form, subtasks: currentState } })
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.onSubmit(this.state.form)
  }

  render() {
    return (
      <div>
        {this.state.loading ? (
          <p>Loading</p>
        ) : (
          <form onSubmit={this.onSubmit}>
            <div className="bg-white rounded-lg shadow-md p-10 hover-card">
              {/* Title */}
              <input
                placeholder="Add a title"
                className="input-border-gray text-xl font-semibold mb-5"
                onChange={(e) => this.onInputChange(e.target.value, 'pathTitle')}
                value={this.state.form.pathTitle}
              ></input>
              {/* Owner, responsible */}
              <div className="grid grid-cols-2 gap-5 mb-5">
                <div className="flex items-center">
                  <SearchField
                    placeholder="Who owns this path"
                    isAdmin={false}
                    onClick={(id) => this.onInputChange(id, 'user')}
                    name={this.state.userName ? this.state.userName : ''}
                    id={this.state.form.user ? this.state.form.user : ''}
                  />
                </div>
                <SearchField
                  placeholder="Who is responsible for this path"
                  isAdmin={true}
                  onClick={(id) => this.onInputChange(id, 'responsible')}
                  name={this.state.responsibleName ? this.state.responsibleName : ''}
                  id={this.state.form.responsible ? this.state.form.responsible : ''}
                />
              </div>
              {/* Category, startDate, endDate*/}
              <div className="grid grid-cols-3 gap-5 mb-5">
                <div className="flex items-center">
                  <i className="far fa-sticky-note mr-2"></i>{' '}
                  <input
                    placeholder="Give the path a category"
                    className="input-border-gray"
                    onChange={(e) => this.onInputChange(e.target.value, 'category')}
                    value={this.state.form.category}
                  />
                </div>
                <Calender
                  buttonText="Pick start date"
                  date={this.state.form.startDate}
                  onClick={() =>
                    this.setState({ form: { ...this.state.form, startDate: Date.now() } })
                  }
                  updateDate={(date) => this.onInputChange(date, 'startDate')}
                />
                <Calender
                  buttonText="Pick end date"
                  date={this.state.form.endDate}
                  onClick={() =>
                    this.setState({
                      form: {
                        ...this.state.form,
                        endDate: this.state.form.startDate ? this.state.form.startDate : Date.now(),
                      },
                    })
                  }
                  updateDate={(date) => this.onInputChange(date, 'endDate')}
                />
              </div>
              <h2 className="mb-2">Goal</h2>
              <input
                placeholder="Goal description: e.g. Become familiar with new software"
                className="input-border-gray mb-5"
                onChange={(e) => this.onInputChange(e.target.value, 'goal')}
                value={this.state.form.goal}
              />
              <h2 className="mb-2">Subtasks</h2>
              <CreateSubtaskList
                subtasks={this.state.form.subtasks}
                onDelete={this.deleteSubtask}
                onChange={this.onSubtaskChange}
              />
              <button className="font-semibold text-base mt-5" onClick={this.addSubtask}>
                <i className="fas fa-plus mr-2"></i> Add new subtask
              </button>
            </div>
            <div className="text-right">
              <button className="btn-green btn px-10 py-2 mt-5">Submit</button>
            </div>
          </form>
        )}
      </div>
    )
  }
}

export default PathForm
