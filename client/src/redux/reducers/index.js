import { combineReducers } from 'redux'
import fetchUserReducer from './fetchUserReducer'
import logInReducer from './logInReducer'

export default combineReducers({
  user: fetchUserReducer,
  loggedIn: logInReducer,
})
