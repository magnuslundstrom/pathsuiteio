import { FETCH_USER } from './TYPES'

const fetchUser = (user) => {
  return {
    type: FETCH_USER,
    payload: user,
  }
}

export default fetchUser
