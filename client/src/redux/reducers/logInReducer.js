import { LOG_IN } from '../actions/TYPES'

const logInReducer = (state = false, action) => {
  switch (action.type) {
    case LOG_IN:
      return true
    default:
      return state
  }
}

export default logInReducer
