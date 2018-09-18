import * as actionTypes from '../actions/actionTypes'

const initialState = {
  uid: '',
  username: '',
  first: '',
  last: '',
  loading: false,
  error: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNUP_INIT:
    case actionTypes.SIGNIN_INIT:
    case actionTypes.SIGNOUT_INIT:
      return {
        ...state,
        loading: true
      }
    case actionTypes.SIGNUP_SUCCESS:
    case actionTypes.SIGNIN_SUCCESS:
    case actionTypes.SIGNOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        uid: action.payload.uid,
        username: action.payload.username,
        first: action.payload.first,
        last: action.payload.last
      }
    case actionTypes.SIGNUP_FAIL:
    case actionTypes.SIGNIN_FAIL:
    case actionTypes.SIGNOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case actionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: ''
      }
    default:
      return state
  }
}

export default reducer
