import { FETCH_USER, UNFETCH_USER } from '../actions/TYPES'

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_USER:
      return action.payload
    case UNFETCH_USER:
      return {}
    default:
      return state
  }
}

export default userReducer
