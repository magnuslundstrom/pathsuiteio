import { FETCH_USER } from './TYPES'
export const fetchUser = (user) => {
  return {
    type: FETCH_USER,
    payload: user,
  }
}
