import { SET_SUCCESS_MESSAGE, UNSET_SUCCESS_MESSAGE } from './TYPES'

export const setSuccessMessage = (message) => {
  return {
    type: SET_SUCCESS_MESSAGE,
    payload: message,
  }
}

export const unsetSuccessMessage = () => {
  return {
    type: UNSET_SUCCESS_MESSAGE,
  }
}
