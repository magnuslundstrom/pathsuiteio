import { combineReducers } from 'redux'
import fetchUserReducer from './fetchUserReducer'
import logInReducer from './logInReducer'
import successMessageReducer from './SuccessMessageReducer'

export default combineReducers({
  user: fetchUserReducer,
  loggedIn: logInReducer,
  successMessage: successMessageReducer,
})
