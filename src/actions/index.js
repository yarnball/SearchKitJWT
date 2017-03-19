import axios from 'axios'
import { browserHistory } from 'react-router'
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_TASKS,
  TOGGLE_EDIT_TASK
} from './types'
import { reset } from 'redux-form'

const BASE_URL = "test.com"
let ROOT_URL

if (process.env.NODE_ENV !== 'production') {
  ROOT_URL = BASE_URL
} else {
  ROOT_URL = BASE_URL
}

export function signinUser ({ username, password }) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/2042watkin/obtain-auth-token/`, { username, password })
    .then(response => {
      dispatch({ type: AUTH_USER })
      localStorage.setItem('token', response.data.token)
      browserHistory.push('/tasks')
      console.log('this is login' + JSON.stringify(response))
    })
    .catch(() => {
      dispatch(authError('Bad Login Info'))
    })
  }
}

export function signupUser ({ username, password }) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/2042watkin/usercreate/`, { username, password })

    .then(response => {
      console.log('Returned when user created' + JSON.stringify(response.data))
      axios.post(`${ROOT_URL}/2042watkin/obtain-auth-token/`, { username, password })
              .then(response => {
            console.log('Secondtime' + JSON.stringify(response.data.token))
            localStorage.setItem('token', response.data.token)
            dispatch({ type: AUTH_USER })
            browserHistory.push('/tasks')
          })
    })
    .catch(response => dispatch(authError(response.data)))

  }
}

export function authError (error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function signoutUser () {
  localStorage.removeItem('token')

  return { type: UNAUTH_USER }
}
