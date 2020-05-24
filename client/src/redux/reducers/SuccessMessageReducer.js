import { SET_SUCCESS_MESSAGE, UNSET_SUCCESS_MESSAGE } from '../actions/TYPES'

const successMessageReducer = (state = '', action) => {
  switch (action.type) {
    case SET_SUCCESS_MESSAGE:
      return action.payload
    case UNSET_SUCCESS_MESSAGE:
      return ''
    default:
      return state
  }
}

export default successMessageReducer
