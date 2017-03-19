import {
AUTH_USER,
UNAUTH_USER,
AUTH_ERROR,
FETCH_TASKS,
TOGGLE_EDIT_TASK
} from '../actions/types'

const task = (state, action) => {
  switch (action.type) {
    case TOGGLE_EDIT_TASK:
      if (state.id !== action.payload) {
        return state
      }
      return {
        ...state,
        editing: !state.editing
      }
  }

  return state
}

export default function (state = {}, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, error: '', authenticated: true }
    case UNAUTH_USER:
      return { ...state, authenticated: false }
    case AUTH_ERROR:
      return { ...state, error: action.payload }
    case FETCH_TASKS:
      return { ...state, tasks: action.payload }
    case TOGGLE_EDIT_TASK:
      return { ...state, tasks: state.tasks.map(t => task(t, action)) }
  }

  return state
}
