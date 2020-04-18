import { FETCH_USER, UNFETCH_USER } from './TYPES'

export const fetchUser = (user) => {
  return {
    type: FETCH_USER,
    payload: user,
  }
}

export const unFetchUser = () => {
  return {
    type: UNFETCH_USER,
  }
}
